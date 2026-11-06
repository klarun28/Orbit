# Orbit 2.0 — Step 2: Folder Structure (Feature-Based Architecture)

**Goal of this step:** Create a clean, scalable folder structure for `Orbit.Web` using a **feature-based architecture**, and explain what each folder is for and how developers should use it.

No real API integration or business logic was added — only the foundation.

---

## What "feature-based architecture" means

Instead of grouping files by *type* (all pages in one folder, all services in another), we group them by **business feature** (auth, dashboard, employees).

**Why this is better for a growing app:**
- Everything related to one feature (its pages, components, API service, and types) lives **together**, so it's easy to find and change.
- Features stay **independent**, which keeps the app easy to scale and maintain.
- Shared/reusable code lives in clearly separated top-level folders (`components`, `hooks`, `utils`, etc.).

---

## The structure created

```text
src/
├── assets/                 # Static files: images, icons, fonts
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/             # Reusable UI shared across features
│   ├── common/             # Buttons, inputs, modals, loaders
│   └── tables/             # Reusable table components
│
├── layouts/                # App shell (page frame)
│   └── components/         # Header, Sidebar, Footer, PageHeader
│
├── features/               # Business modules (feature-based)
│   ├── auth/
│   │   ├── pages/          # Login, ForgotPassword screens
│   │   └── components/     # Auth-only UI pieces
│   └── dashboard/
│       └── pages/          # Dashboard screen
│
├── routes/                 # Centralized routing + protected routes
├── services/               # Axios client + API communication
├── context/                # App-wide state (React Context)
│
├── hooks/                  # Reusable React hooks
│   └── useDebounce.ts
│
├── types/                  # Shared TypeScript types
│   ├── api.ts
│   └── common.ts
│
├── utils/                  # Helper functions & constants
│   ├── constants.ts
│   ├── helpers.ts
│   └── validation.ts
│
├── config/                 # App configuration
│   └── appConfig.ts
│
├── styles/                 # Global CSS, theme variables, responsive
│   ├── variables.css
│   ├── global.css
│   ├── layout.css
│   └── responsive.css
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

> **File naming rule:** `.tsx` for React components (anything with JSX), `.ts` for plain logic (services, hooks, types, utils, config).

> **About `.gitkeep` files:** Git cannot track empty folders. A `.gitkeep` is an empty marker file that keeps a folder in version control until it gets real files in a later step. They are placeholders, not code.

---

## Folder responsibilities and how to use them

### `assets/`
Static resources that are imported or referenced by the UI.
- **images/** — logos, illustrations, pictures.
- **icons/** — custom SVG/icon files (Bootstrap Icons already comes as a font).
- **fonts/** — custom font files, if any.
- **Use it for:** importing an image like `import logo from '@/assets/images/logo.png'`.

### `components/`
UI pieces that are **shared across multiple features**. If a component is used by only one feature, it belongs in that feature instead.
- **common/** — generic building blocks: `Button`, `Input`, `Modal`, `Loader`, `ConfirmDialog`.
- **tables/** — reusable table components like `DataTable`.
- **Use it for:** anything visual you want to reuse app-wide. Keep each component small and focused.

### `layouts/`
The **frame** that wraps pages — the consistent structure around your content.
- **components/** — the layout parts: `Header`, `Sidebar`, `Footer`, `PageHeader`.
- **Use it for:** `MainLayout` (app shell with sidebar/header) and `AuthLayout` (simple centered layout for login). Added in a later step.

### `features/`
The heart of the feature-based architecture. Each feature is **self-contained**.
A typical feature folder holds:
- **pages/** — full screens for that feature (e.g. `Login.tsx`, `Dashboard.tsx`).
- **components/** — UI used only within that feature.
- **`<feature>Service.ts`** — API calls for that feature (added later).
- **`<feature>Types.ts`** — TypeScript models for that feature (added later).
- **Use it for:** adding a new module (e.g. `employees`) by creating a new folder with the same shape.

### `routes/`
Centralized navigation setup, so routes are defined in one place instead of scattered.
- **Use it for:** `AppRoutes.tsx` (the route map), `ProtectedRoute.tsx` (guards private pages), `routeConfig.ts` (route path constants). Added in the routing step.

### `services/`
Shared API communication layer.
- **Use it for:** `apiClient.ts` (one configured Axios instance), `apiEndpoints.ts` (endpoint paths), `tokenService.ts` (read/store the auth token). This keeps Axios configured **once** and reused everywhere. Added in the Axios step.

### `context/`
Application-wide state using React Context API.
- **Use it for:** `AuthContext.tsx` to share the logged-in user/token across the whole app without passing props down manually. Added in the auth-context step.

### `hooks/`
Reusable custom React hooks (logic you reuse across components).
- **`useDebounce.ts`** — delays a value update (great for search boxes to avoid firing on every keystroke). **Created now** because it is fully generic and safe.
- **`useAuth.ts`** — will be added alongside `AuthContext` so it isn't a broken/empty hook.
- **Use it for:** extracting repeated stateful logic into one reusable place.

### `types/`
Shared TypeScript interfaces used across features.
- **`common.ts`** — generic helper types (`Nullable`, `SelectOption`, `RequestState`).
- **`api.ts`** — generic API wrappers (`ApiResponse`, `PaginatedResponse`, `ApiError`). These are **placeholders**; real response shapes come once the backend contract is known.
- **Use it for:** types needed by more than one feature. Feature-specific types stay inside the feature.

### `utils/`
Small, pure helper functions and constants.
- **`constants.ts`** — fixed values (e.g. token storage key, request timeout) defined once.
- **`helpers.ts`** — generic helpers (`isBlank`, `capitalize`).
- **`validation.ts`** — form validation helpers (`isValidEmail`, `hasMinLength`). These are **UI-side checks only**; the backend stays the source of truth.
- **Use it for:** reusable logic that has no UI and no side effects.

### `config/`
Central configuration access.
- **`appConfig.ts`** — the **only** place that reads `import.meta.env`. Exposes `appName` and `apiBaseUrl`. This prevents environment variables from being hardcoded or duplicated across components.
- **Use it for:** reading any environment-driven setting.

### `styles/`
Global styling that complements Bootstrap.
- **`variables.css`** — theme variables (brand colors, sidebar width, header height) as CSS custom properties.
- **`global.css`** — base styles (page background, accessible focus outlines).
- **`layout.css`** — structure styles for the sidebar/header/footer shell.
- **`responsive.css`** — mobile breakpoints (e.g. full-width sidebar on small screens).
- **Loaded in `main.tsx` after Bootstrap** so our variables can override Bootstrap defaults.

---

## Supporting files created

| File | Purpose |
|---|---|
| `src/vite-env.d.ts` | Adds **type safety** to `import.meta.env` so `VITE_APP_NAME` and `VITE_API_BASE_URL` are typed strings (avoids `any`). |
| `src/config/appConfig.ts` | Single source for environment config. |
| `src/types/common.ts`, `src/types/api.ts` | Shared, generic types. |
| `src/utils/constants.ts`, `helpers.ts`, `validation.ts` | Reusable logic. |
| `src/hooks/useDebounce.ts` | A complete, generic hook. |
| `src/styles/*.css` | Theme and layout styling. |

---

## Verification

```bash
npm run build
```
Result: **build succeeded, zero TypeScript errors.** No unused-code or broken-import warnings.

---

## What this step delivered

- A complete **feature-based folder structure** matching the project plan.
- Clear separation: shared code vs. feature code vs. config vs. styling.
- Minimal, purposeful starter files — **no invented API logic, no excessive nesting**.
- Correct file conventions: `.tsx` for components, `.ts` for logic.

**Next step:** configure global styles and CSS variables in more detail, then build the reusable common components (Button, Input, Loader, Modal).
