#Requires -Version 5.1
<#
  Deploy EasyIntern to production over SSH (OpenSSH client required: scp, ssh).

  1. Copy scripts/deploy-ssh.example.env to repo root as .deploy.env
  2. Fill EASYINTERN_SSH_TARGET, EASYINTERN_REMOTE_API_ROOT, EASYINTERN_REMOTE_WEB_ROOT
  3. Run: powershell -ExecutionPolicy Bypass -File scripts/deploy-ssh.ps1

  Optional in .deploy.env:
    EASYINTERN_SSH_KEY=C:\path\to\id_rsa
    EASYINTERN_SSH_PORT=22
    EASYINTERN_SSH_POST=cd /path && touch tmp/restart.txt   (extra shell line on server after migrate)
    EASYINTERN_SSH_PATH_PREPEND=/opt/alt/alt-nodejs22/root/usr/bin   (if ssh has no npm — cPanel Alt Node)
    EASYINTERN_USE_DB_PUSH=1   (use prisma db push instead of migrate deploy — non-empty prod DBs)
    EASYINTERN_DB_PUSH_ACCEPT_DATA_LOSS=1   (append --accept-data-loss; only if you accept Prisma warnings)
    EASYINTERN_SKIP_PRISMA_SCHEMA=1   (skip db push/migrate; only generate client — UI-only deploys)
#>
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$envFile = Join-Path $repoRoot ".deploy.env"
if (-not (Test-Path $envFile)) {
  Write-Host "Missing .deploy.env in repo root." -ForegroundColor Red
  Write-Host "Copy scripts/deploy-ssh.example.env to .deploy.env and set your SSH target and remote paths." -ForegroundColor Yellow
  exit 1
}

Get-Content $envFile | ForEach-Object {
  $line = $_.Trim()
  if ($line.StartsWith("#") -or $line -eq "") { return }
  $eq = $line.IndexOf("=")
  if ($eq -lt 1) { return }
  $name = $line.Substring(0, $eq).Trim()
  $val = $line.Substring($eq + 1).Trim()
  if (($val.StartsWith('"') -and $val.EndsWith('"')) -or ($val.StartsWith("'") -and $val.EndsWith("'"))) {
    $val = $val.Substring(1, $val.Length - 2)
  }
  [System.Environment]::SetEnvironmentVariable($name, $val, "Process")
}

$target = $env:EASYINTERN_SSH_TARGET
$apiRoot = $env:EASYINTERN_REMOTE_API_ROOT
$webRoot = $env:EASYINTERN_REMOTE_WEB_ROOT
if ([string]::IsNullOrWhiteSpace($target) -or [string]::IsNullOrWhiteSpace($apiRoot) -or [string]::IsNullOrWhiteSpace($webRoot)) {
  Write-Error "Set EASYINTERN_SSH_TARGET, EASYINTERN_REMOTE_API_ROOT, and EASYINTERN_REMOTE_WEB_ROOT in .deploy.env"
}

$sshBase = @()
$scpBase = @()
if (-not [string]::IsNullOrWhiteSpace($env:EASYINTERN_SSH_KEY)) {
  $sshBase += "-i", $env:EASYINTERN_SSH_KEY
  $scpBase += "-i", $env:EASYINTERN_SSH_KEY
}
$port = if ($env:EASYINTERN_SSH_PORT) { $env:EASYINTERN_SSH_PORT } else { "22" }
if ($port -ne "22") {
  $sshBase += "-p", $port
  $scpBase += "-P", $port
}

Write-Host "=== Backend: prisma generate ===" -ForegroundColor Cyan
Push-Location (Join-Path $repoRoot "backend")
npm run build
Pop-Location

Write-Host "=== Frontend: production build ===" -ForegroundColor Cyan
Push-Location (Join-Path $repoRoot "frontend")
npm run build
Pop-Location

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$staging = Join-Path $repoRoot "_deploy_staging\ssh-$stamp"
if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
$stagingBackend = Join-Path $staging "backend"
New-Item -ItemType Directory -Path $stagingBackend -Force | Out-Null
$be = Join-Path $repoRoot "backend"
Copy-Item (Join-Path $be "package.json") $stagingBackend -Force
if (Test-Path (Join-Path $be "package-lock.json")) {
  Copy-Item (Join-Path $be "package-lock.json") $stagingBackend -Force
}
Copy-Item (Join-Path $be "prisma") (Join-Path $stagingBackend "prisma") -Recurse -Force
Copy-Item (Join-Path $be "src") (Join-Path $stagingBackend "src") -Recurse -Force
# Omit Prisma client output: query-engine binaries are often locked in-place by the
# running API on the server; regenerate on Linux with `npx prisma generate` over SSH.
$genClient = Join-Path $stagingBackend "src\generated"
if (Test-Path $genClient) { Remove-Item $genClient -Recurse -Force }
if (Test-Path (Join-Path $be "scripts")) {
  Copy-Item (Join-Path $be "scripts") (Join-Path $stagingBackend "scripts") -Recurse -Force
}

Write-Host "=== SCP backend -> ${target}:$apiRoot ===" -ForegroundColor Cyan
$scpBackendArgs = $scpBase + @(
  "-r",
  (Join-Path $stagingBackend "*"),
  "${target}:$apiRoot/"
)
& scp.exe @scpBackendArgs
if ($LASTEXITCODE -ne 0) { throw "scp backend failed with exit $LASTEXITCODE" }

Write-Host "=== SCP frontend dist -> ${target}:$webRoot ===" -ForegroundColor Cyan
$dist = Join-Path $repoRoot "frontend\dist\*"
$scpWebArgs = $scpBase + @(
  "-r",
  $dist,
  "${target}:$webRoot/"
)
& scp.exe @scpWebArgs
if ($LASTEXITCODE -ne 0) { throw "scp frontend failed with exit $LASTEXITCODE" }

$cdPath = if ($apiRoot.Contains(" ")) { "`"$apiRoot`"" } else { $apiRoot }
$pathPre = $env:EASYINTERN_SSH_PATH_PREPEND
$prismaCmd = if ($env:EASYINTERN_SKIP_PRISMA_SCHEMA -eq "1" -or $env:EASYINTERN_SKIP_PRISMA_SCHEMA -eq "true") {
  "true"
} elseif ($env:EASYINTERN_USE_DB_PUSH -eq "1" -or $env:EASYINTERN_USE_DB_PUSH -eq "true") {
  if ($env:EASYINTERN_DB_PUSH_ACCEPT_DATA_LOSS -eq "1" -or $env:EASYINTERN_DB_PUSH_ACCEPT_DATA_LOSS -eq "true") {
    "npx prisma db push --accept-data-loss"
  } else {
    "npx prisma db push"
  }
} else {
  "npx prisma migrate deploy"
}
if (-not [string]::IsNullOrWhiteSpace($pathPre)) {
  $remoteScript = "export PATH=${pathPre}:`$PATH && cd $cdPath && npm ci --omit=dev && npx prisma generate && $prismaCmd"
} else {
  $remoteScript = "cd $cdPath && npm ci --omit=dev && npx prisma generate && $prismaCmd"
}
if (-not [string]::IsNullOrWhiteSpace($env:EASYINTERN_SSH_POST)) {
  $remoteScript += " && $($env:EASYINTERN_SSH_POST)"
}

Write-Host "=== SSH: install deps + prisma generate + migrate ===" -ForegroundColor Cyan
$sshArgs = @()
$sshArgs += $sshBase
$sshArgs += $target
$sshArgs += $remoteScript
Write-Host ("ssh " + ($sshArgs -join " ")) -ForegroundColor DarkGray
& ssh.exe @sshArgs
if ($LASTEXITCODE -ne 0) { throw "ssh post-deploy failed with exit $LASTEXITCODE" }

Remove-Item $staging -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "=== Deploy finished ===" -ForegroundColor Green
