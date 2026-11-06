# Orbit 2.0 — Step 10: Foundation Review

**Goal of this step:** A complete review of the `Orbit.Web` frontend foundation — folder structure, broken imports, TypeScript errors, unused dependencies, routing, layout responsiveness, environment config, Axios config, `npm run dev`, and `npm run build` — fixing every issue found. No new modules or backend integration.

---

## Review results

| Area | Result | Action taken |
|---|---|---|
| Folder structure | ✅ Matches plan | No change needed |
| Broken imports | ✅ None | Verified via build + lint |
| TypeScript errors | ✅ None | `tsc -b` clean |
| Unused dependencies | ✅ None | All 6 runtime deps are used |
| Unused files | ⚠️ Found | Deleted Vite demo assets + merged `index.css` |
| Routing | ✅ Correct | Verified route tree |
| Layout responsiveness | ⚠️ Edge case | Hardened desktop↔mobile transition |
| Environment config | ✅ Correct | `.env.*` + `appConfig` verified |
| Axios config | ✅ Correct | Interceptors/401/timeout verified |
| `npm run dev` | ✅ Runs | Confirmed on :5174 |
| `npm run build` | ✅ Succeeds | Zero errors |
| `npm run preview` | ✅ Serves build | Confirmed on :4173 |
| ESLint | ✅ Clean | Zero warnings/errors |

---

## Issues found and fixed

### 1. Unused Vite demo assets
`src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and `public/icons.svg` were leftovers from the Vite template and referenced nowhere.
**Fix:** deleted all four. (`public/favicon.svg` is kept — it's referenced by `index.html`.)

### 2. Redundant `index.css`
`src/index.css` overlapped with `styles/global.css` (base reset) and `styles/variables.css` (`color-scheme`).
**Fix:** merged the baseline reset into `global.css`, moved `color-scheme: light` into `variables.css` `:root`, removed the `index.css` import from `main.tsx`, and deleted the file. Styling is now fully centralized under `src/styles/`.

### 3. Responsive sidebar edge case
If a user collapsed the sidebar on desktop and then resized down to mobile, the collapsed (icon-only) state could carry into the mobile drawer, making it narrow with hidden labels.
**Fix:**
- `MainLayout` now listens for the mobile breakpoint via `matchMedia` and resets `isCollapsed` on mobile / closes the drawer on desktop, so the two modes never conflict.
- `responsive.css` also forces the drawer to full width and restores label alignment as a CSS safety net.

---

## Verification evidence

**ESLint**
```
> eslint .
(no output = zero issues)
```

**Build**
```
> tsc -b && vite build
✓ 114 modules transformed.
dist/index.html              0.50 kB
dist/assets/index-*.css    317.93 kB │ gzip: 46.68 kB
dist/assets/index-*.js     413.58 kB │ gzip: 130.82 kB
✓ built in ~1s
```

**Dev server:** `npm run dev` → ready on `http://localhost:5174/` (5173 was in use), HMR working.
**Preview:** `npm run preview` → serves the production build on `http://localhost:4173/`.

---

## Area-by-area confirmation

- **Folder structure:** feature-based layout intact; every folder has a clear purpose. Empty future folders (`components/tables`, `assets/*`, `features/auth/components`) retain `.gitkeep` markers.
- **Imports:** no broken or circular imports (build + lint confirm). Relative paths are consistent.
- **Dependencies used:** `react`, `react-dom`, `react-router-dom`, `axios`, `bootstrap`, `bootstrap-icons` — all imported and used. `useDebounce` and the `utils/*` helpers are intentional reusable foundation utilities kept for upcoming modules.
- **Routing:** public (`/login`, `/forgot-password`), protected (`/dashboard` behind `ProtectedRoute` + `MainLayout`), `/` → dashboard redirect, and `*` → 404. All driven by `ROUTES` constants.
- **Environment:** `.env.development` (placeholder API URL), `.env.production` (empty for deploy), `.env.example` (template). Read only through `config/appConfig.ts`; `vite-env.d.ts` types the vars.
- **Axios:** one `apiClient` with base URL + timeout from config, JSON headers, JWT request interceptor, and a response interceptor that handles 401 and normalizes errors.

---

## Final project structure

```text
Orbit.Web/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/            (images/ icons/ fonts/ — .gitkeep)
│   ├── components/
│   │   ├── common/        Button, Input, Loader, Modal, ConfirmDialog, NotFound, index.ts
│   │   └── tables/        (.gitkeep)
│   ├── config/            appConfig.ts
│   ├── context/           AuthContext.tsx, AuthProvider.tsx
│   ├── features/
│   │   ├── auth/          authService.ts, authTypes.ts
│   │   │   ├── components/ (.gitkeep)
│   │   │   └── pages/     Login.tsx, ForgotPassword.tsx
│   │   └── dashboard/
│   │       └── pages/     Dashboard.tsx
│   ├── hooks/             useAuth.ts, useDebounce.ts
│   ├── layouts/           MainLayout.tsx, AuthLayout.tsx
│   │   └── components/    Header.tsx, Sidebar.tsx, Footer.tsx, PageHeader.tsx
│   ├── routes/            AppRoutes.tsx, ProtectedRoute.tsx, routeConfig.ts
│   ├── services/          apiClient.ts, apiEndpoints.ts, tokenService.ts
│   ├── styles/            variables.css, global.css, layout.css, responsive.css
│   ├── types/             api.ts, common.ts
│   ├── utils/             constants.ts, helpers.ts, validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.development
├── .env.production
├── .env.example
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

---

## Summary

The Orbit 2.0 frontend foundation is **clean, consistent, and verified**:
- No broken imports, no TypeScript errors, no unused dependencies, no lint issues.
- Removed leftover demo files and centralized all styling.
- Hardened responsive sidebar behavior across breakpoints.
- `dev`, `build`, and `preview` all confirmed working.

The foundation is ready. **No additional modules or backend integration were started** — awaiting the backend API contract.
