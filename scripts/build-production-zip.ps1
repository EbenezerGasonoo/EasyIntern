# Build frontend + Prisma, then zip API + static site for cPanel upload (no node_modules, no .env).
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host "=== Prisma generate ===" -ForegroundColor Cyan
Push-Location (Join-Path $repoRoot "backend")
npm run build
Pop-Location

Write-Host "=== Vite build (production) ===" -ForegroundColor Cyan
Push-Location (Join-Path $repoRoot "frontend")
npm run build
Pop-Location

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$stagingName = "easyintern-production-$stamp"
$staging = Join-Path $repoRoot "_deploy_staging\$stagingName"
if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging -Force | Out-Null
$stagingBackend = Join-Path $staging "backend"
New-Item -ItemType Directory -Path $stagingBackend -Force | Out-Null

$be = Join-Path $repoRoot "backend"
Copy-Item (Join-Path $be "package.json") $stagingBackend -Force
if (Test-Path (Join-Path $be "package-lock.json")) {
  Copy-Item (Join-Path $be "package-lock.json") $stagingBackend -Force
}
Copy-Item (Join-Path $be "prisma") (Join-Path $stagingBackend "prisma") -Recurse -Force
Copy-Item (Join-Path $be "src") (Join-Path $stagingBackend "src") -Recurse -Force
if (Test-Path (Join-Path $be "scripts")) {
  Copy-Item (Join-Path $be "scripts") (Join-Path $stagingBackend "scripts") -Recurse -Force
}

$feDist = Join-Path $repoRoot "frontend\dist"
Copy-Item $feDist (Join-Path $staging "frontend-dist") -Recurse -Force

$deployTxt = @"
Easy Intern — production bundle ($stamp)

Folders
- backend/          API: copy contents into your Node app root (e.g. .../api.easyintern.app/).
- frontend-dist/    Static files: upload into web root (easyintern.app public_html).

Do not commit .env. On the server, keep your existing .env with DATABASE_URL, JWT_SECRET, SMTP_*, FRONTEND_URL, PORT.

After uploading backend files:
  cd /path/to/api
  npm ci --omit=dev
  touch tmp/restart.txt
(or Restart Application in cPanel)

Frontend: replace old dist assets with everything inside frontend-dist/.
API URL is baked at build time from frontend/.env.production (VITE_API_URL).
"@
Set-Content -Path (Join-Path $staging "DEPLOY.txt") -Value $deployTxt -Encoding UTF8

$zipPath = Join-Path $repoRoot "$stagingName.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
# tar avoids Compress-Archive file-lock issues with frontend/dist on some systems
$deployRoot = Join-Path $repoRoot "_deploy_staging"
Push-Location $deployRoot
try {
  tar -a -cf $zipPath $stagingName
} finally {
  Pop-Location
}

Remove-Item $deployRoot -Recurse -Force

Write-Host "Created: $zipPath" -ForegroundColor Green
