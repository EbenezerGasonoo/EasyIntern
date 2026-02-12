# Deploy EasyIntern on Vercel (recommended)

The frontend is set up to deploy on **Vercel** instead of GitHub Pages. Do this once and it will auto-deploy on every push.

---

## 1. Backend (if not already deployed)

1. Go to **[vercel.com](https://vercel.com)** → sign in with GitHub.
2. **Add New** → **Project** → import your **EasyIntern** repo.
3. **Root Directory:** click **Edit** → type `backend` → **Continue**.
4. **Environment Variables** – add:

   | Name           | Value |
   |----------------|-------|
   | `DATABASE_URL` | Your Supabase connection string (from `backend/.env`), with `?pgbouncer=true` if using pooler |
   | `JWT_SECRET`   | A long random string (e.g. 32+ characters) |
   | `NODE_ENV`     | `production` |

5. **Deploy**. When it finishes, copy the backend URL (e.g. `https://easyintern-backend.vercel.app`).

---

## 2. Frontend

1. In Vercel: **Add New** → **Project** again → import the **same** EasyIntern repo.
2. **Root Directory:** click **Edit** → type `frontend` → **Continue**.
3. **Environment Variables** – add **one**:

   | Name            | Value |
   |-----------------|-------|
   | `VITE_API_URL`  | Your backend URL + `/api` (e.g. `https://easyintern-backend.vercel.app/api`) |

4. **Deploy**.
5. Open the URL Vercel gives you (e.g. `https://easyintern.vercel.app`) – that’s your live app.

---

## Summary

| Part      | Vercel Root | Env vars |
|-----------|-------------|----------|
| Backend   | `backend`   | `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV` |
| Frontend  | `frontend`  | `VITE_API_URL` = `https://YOUR-BACKEND-URL.vercel.app/api` |

After this, every push to your main branch will redeploy both. No GitHub Actions needed.

---

## 3. Seed the database (so sample data shows)

The app shows interns and jobs from the database. If you see “No interns” / “No jobs” or an empty home page, the **production** database needs to be seeded.

1. Use the **same** `DATABASE_URL` that your backend on Vercel uses (Supabase project, with `?pgbouncer=true` if it’s the pooler URL).
2. In `backend/.env` set that URL (or run the command below with it).
3. From your Mac, in the project folder, run:

```bash
cd backend
npm install
npx prisma db push
npx prisma db seed
```

- `db push` syncs the schema to the DB (if you didn’t run migrations).
- `db seed` inserts the sample companies and interns (e.g. MTN, Vodafone, students from KNUST, UG, etc.; password for all: `password123`).

4. Redeploy or refresh the frontend – the home page should now show the sample data.
