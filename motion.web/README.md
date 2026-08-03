# Motion Web

Public marketing site + mock-data app shells for [Motion](https://github.com/tinashe-x/motion) — real-time nightlife discovery for Johannesburg.

**Live site:** [https://tinashe-x.github.io/motion/](https://tinashe-x.github.io/motion/)

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Local mock state (no backend yet)

## Develop locally

```bash
npm install
VITE_BASE=/ npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

To preview the GitHub Pages base path locally:

```bash
npm run dev
# → http://localhost:5173/motion/
```

## Deploy to GitHub Pages

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**
2. Push to `main` (or run the workflow manually). The workflow builds `motion.web` and publishes `dist/`.

```bash
npm run build:pages
```

Uses `base: '/motion/'` and copies `index.html` → `404.html` for client-side routing.

## Routes

| Area | Path |
|------|------|
| Marketing home | `/` |
| Venues | `/venues` |
| Privacy / Terms | `/privacy-policy`, `/terms` |
| App onboarding | `/app` |
| Login / Sign up | `/app/login`, `/app/signup` |
| App (authenticated) | `/app/home`, `/app/activity`, `/app/map`, … |
| Mock admin | `/admin` (log in with `admin@motion.app`) |

## Notes

- Auth and data are mocked in `localStorage` — any email/password works for demo login.
- Backend (Supabase), real maps, and payments are planned for a later phase.
- Source spec: [`Motion_Lovable_Build_Script.md`](./Motion_Lovable_Build_Script.md)
