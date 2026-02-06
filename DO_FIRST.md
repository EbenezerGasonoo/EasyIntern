# Do these 3 things to host EasyIntern

Everything else is already set up in the repo. You only need to do these **3 steps in your browser** (about 10 minutes).

---

## 1. Create the GitHub repo and push

1. Open: **https://github.com/new**
2. Repository name: `Easy-Intern`
3. Leave “Add a README” **unchecked** → **Create repository**
4. In your project folder, run (replace `YOUR_GITHUB_USERNAME` with your username):

```bash
cd "/Users/macbook/Documents/Easy Intern"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Easy-Intern.git
git branch -M main
git push -u origin main
```

---

## 2. Create the database and get the URL

1. Open: **https://supabase.com** → Sign up / Log in
2. **New project** → name it (e.g. `easyintern`) → set a database password → **Create project**
3. Wait for the project to be ready, then go to **Settings** (left) → **Database**
4. Under **Connection string** choose **URI** and **Copy** the URI
5. It looks like:  
   `postgresql://postgres.xxxx:PASSWORD@aws-0-xx.pooler.supabase.com:6543/postgres`  
   Replace the `PASSWORD` part with your real database password and keep this string for the next step.

---

## 3. Deploy backend and frontend on Vercel

1. Open: **https://vercel.com** → Sign up / Log in (use **GitHub**)
2. **Add New** → **Project** → import the **Easy-Intern** repository

### Deploy the backend first

3. **Root Directory:** click **Edit** → type `backend` → **Continue**
4. **Environment Variables** → Add:
   - `DATABASE_URL` = (paste the Supabase URI from step 2)
   - `JWT_SECRET` = (any long random string, e.g. 32 characters)
   - `NODE_ENV` = `production`
5. **Deploy**
6. When it’s done, open the backend URL (e.g. `https://easy-intern-xxx.vercel.app`) and copy it. You’ll need:  
   **Backend URL** = `https://easy-intern-xxx.vercel.app`  
   **API URL for frontend** = `https://easy-intern-xxx.vercel.app/api`

### Run migrations once (on your Mac)

In the project folder, with the same `DATABASE_URL` in `backend/.env` (or paste it inline):

```bash
cd "/Users/macbook/Documents/Easy Intern/backend"
npx prisma migrate deploy
npx prisma db seed
```

### Deploy the frontend

7. On Vercel: **Add New** → **Project** again → same **Easy-Intern** repo
8. **Root Directory:** set to `frontend`
9. **Environment Variables** → Add:
   - `VITE_API_URL` = `https://easy-intern-xxx.vercel.app/api` (use your real backend URL from step 6)
10. **Deploy**
11. Your app is live at the URL Vercel gives you for this frontend project.

---

## Optional: use GitHub Pages instead of Vercel for the frontend

1. In your GitHub repo: **Settings** → **Pages** → **Source:** **GitHub Actions**
2. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.vercel.app/api`
3. Push a new commit (or re-run the “Deploy frontend to GitHub Pages” workflow).  
   Your site will be at: `https://YOUR_USERNAME.github.io/Easy-Intern/`

---

## Summary

| Step | What you do |
|------|-------------|
| 1 | Create repo on GitHub and push this project |
| 2 | Create Supabase project and copy database URI |
| 3 | Deploy `backend` on Vercel (with `DATABASE_URL`, `JWT_SECRET`), then run migrations, then deploy `frontend` (with `VITE_API_URL`) |

After that, the app is hosted. For more detail, see **HOSTING.md**.
