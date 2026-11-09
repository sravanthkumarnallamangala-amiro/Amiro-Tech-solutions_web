# Admin console setup

The site now has an admin console at `/admin` (link: **Admin Login** in the footer).

- **Dashboard** – job counts, open vacancies, recent job posts, activity.
- **Jobs** – post / edit / unpublish / close / delete. Published jobs appear on the public **/careers** page automatically.
- **Administrators** – any admin can add another admin login, reset a password or remove an admin (not themselves).

## Run locally
```
npm install
npm run dev
```
Dev login (shown only in development): `admin@amirotech.local` / `Admin@12345`.
Data is saved in `.data/db.json` (git-ignored). To change the login, copy `.env.example` to `.env.local`.

## Deploy on Vercel (required for jobs to be visible to everyone)
1. Vercel dashboard → your project → **Storage** → add **Upstash Redis** (Marketplace). This sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
2. Project → **Settings → Environment Variables**, add:
   - `ADMIN_EMAIL` – first admin's email
   - `ADMIN_PASSWORD` – first admin's password (10+ characters)
   - `SESSION_SECRET` – a long random string (16+ characters)
3. Redeploy. Sign in at `/admin/login`, then add more admins from **Administrators**.

Without a database the site still works: Careers shows the three built-in roles and the admin login shows "not configured".

## Notes
- `ADMIN_EMAIL`/`ADMIN_PASSWORD` only create the *first* admin. After that, passwords live in the database; changing the env vars does not change them.
- Lost access? Delete the `amiro:admins` key in the Redis console; the next login recreates the env-var admin.
- Passwords are scrypt-hashed; sessions are signed HttpOnly cookies (8 h); writes require a same-origin CSRF header.
- Login throttling (6 failures / 15 min / IP) is in-memory per serverless instance, so it is best-effort.
- Concurrent edits are last-write-wins; fine for a small team.
