# Motion Web

Public marketing site + mock-data app shells for [Motion](https://github.com/tinashe-x/motion) — real-time nightlife discovery for Johannesburg.

**Live site:** [https://tinashe-x.github.io/motion/motion.web/](https://tinashe-x.github.io/motion/motion.web/)

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Local mock state (no backend yet)

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/motion/motion.web/](http://localhost:5173/motion/motion.web/) (matches the GitHub Pages base path).

For local dev at the root path instead:

```bash
VITE_BASE=/ npm run dev
```

## Build for GitHub Pages

The app is hosted as a **project site** under the monorepo at `/motion/motion.web/`:

```bash
npm run build:pages
```

This builds with `base: '/motion/motion.web/'` and copies `index.html` → `404.html` so client-side routes work on GitHub Pages.

Deploy the **contents of `dist/`** to that folder on the `main` branch (or point GitHub Pages at a workflow that publishes `dist/`).

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
