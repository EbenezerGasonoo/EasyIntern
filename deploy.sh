#!/bin/bash
# EasyIntern deploy script – run this AFTER you've done the 3 browser steps in DO_FIRST.md

set -e
cd "$(dirname "$0")"

echo "=== EasyIntern Deploy Script ==="
echo ""

# 1. Backend: ensure Prisma client is generated
echo "[1/3] Backend: Prisma generate..."
cd backend
npm run build 2>/dev/null || npm run prisma:generate
cd ..
echo "    Done."
echo ""

# 2. Frontend: build (use env var if set)
echo "[2/3] Frontend: Build..."
cd frontend
if [ -n "$VITE_API_URL" ]; then
  echo "    Using VITE_API_URL=$VITE_API_URL"
  export VITE_API_URL
fi
npm run build
cd ..
echo "    Done. Output: frontend/dist"
echo ""

# 3. Git push (if remote exists)
if git remote get-url origin 2>/dev/null; then
  echo "[3/3] Pushing to GitHub..."
  git push origin master 2>/dev/null || git push origin main 2>/dev/null || true
  echo "    Done. If you use GitHub Pages, the workflow will deploy from here."
else
  echo "[3/3] No git remote. Add one with:"
  echo "    git remote add origin https://github.com/YOUR_USERNAME/Easy-Intern.git"
  echo "    Then push: git push -u origin main"
fi

echo ""
echo "=== Next steps ==="
echo "1. Backend: Deploy the 'backend' folder to Vercel (see DO_FIRST.md)."
echo "2. Frontend: Deploy the 'frontend' folder to Vercel, or use GitHub Pages (see DO_FIRST.md)."
echo "3. Set VITE_API_URL to your backend URL + /api (e.g. https://your-api.vercel.app/api)."
echo ""
