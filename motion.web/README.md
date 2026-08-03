# Motion Web

Public marketing site + mock-data app shells for Motion.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Local mock state (no backend yet)

## Develop

```bash
npm install
npm run dev
```

## Build / GitHub Pages

```bash
npm run build
```

For a GitHub Pages **project** site, set `base` in `vite.config.ts` to `'/your-repo-name/'` before building. Deploy the `dist/` folder.

## App entry

- Marketing: `/`
- Web app: `/app` (onboarding → signup/login → bottom-nav shells)
