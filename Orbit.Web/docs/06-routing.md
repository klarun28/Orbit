# Orbit 2.0 — Step 6: Routing

**Goal of this step:** Configure **React Router DOM** with clean, centralized routing — public vs. protected routes, a login route, a dashboard route, and a 404 page — wired into `MainLayout` and `AuthLayout`. Authentication uses a **placeholder state only** (no backend/JWT assumptions).

Files created:

| File | Location | Role |
|---|---|---|
| `routeConfig.ts` | `routes/` | All route paths as constants |
| `ProtectedRoute.tsx` | `routes/` | Guards private routes |
| `AppRoutes.tsx` | `routes/` | The centralized route tree |
| `useAuth.ts` | `hooks/` | Temporary placeholder auth check |
| `Login.tsx` | `features/auth/pages/` | Placeholder login page |
| `Dashboard.tsx` | `features/dashboard/pages/` | Placeholder dashboard page |
| `NotFound.tsx` | `components/common/` | Shared 404 page |

---

## The structure of the routing

```
AppRoutes (BrowserRouter)
│
├── Public  → AuthLayout
│      └── /login            → Login page
│
├── Protected → ProtectedRoute (guard) → MainLayout
│      └── /dashboard        → Dashboard page
│
├── /                        → redirect to /dashboard
└── *  (anything else)       → NotFound (404)
```

**Why this shape**
- **Public routes** (login) use `AuthLayout` — a clean centered card, no sidebar.
- **Protected routes** are wrapped by `ProtectedRoute`, then by `MainLayout` — so every private page automatically gets the app shell *and* the auth guard.
- **Nested routes** mean the layout and guard are written once and shared by all pages inside them.

---

## 1. `routeConfig.ts` — one source of truth for paths

All paths are constants:
```ts
export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  notFound: '*',
} as const
```
**Why:** no magic strings. If a path changes, it changes in one place, and TypeScript helps catch typos everywhere it's used.

## 2. `useAuth.ts` — placeholder authentication (temporary)

A tiny hook that reports whether a token exists in `localStorage`:
```ts
export function useAuth(): AuthState {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  return { isAuthenticated: Boolean(token) }
}
```
**Important:** this makes **no assumption about any backend JWT response**. It only checks for the presence of a placeholder token. This is the **seam** that the real `AuthContext` will replace in a later step — nothing else has to change because everything depends on `useAuth`, not on storage directly.

## 3. `ProtectedRoute.tsx` — the guard

```tsx
if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />
return <Outlet />
```
- If not authenticated → redirect to login (`replace` keeps the guarded URL out of history).
- If authenticated → render the nested routes via `<Outlet />`.

**Security note (by design):** hiding a route on the frontend is a **UX convenience, not security**. The backend API stays responsible for real authorization. This is documented right in the file.

## 4. `AppRoutes.tsx` — the centralized tree

Holds the single `<BrowserRouter>` and the full `<Routes>` map shown above, using the `ROUTES` constants and both layouts. This is the **only** place routes are defined, so navigation is easy to understand and extend.

## 5. Placeholder pages

- **`Login`** — a UI-only form. "Sign in" stores a **placeholder token** and navigates to the dashboard. No API call, no JWT parsing.
- **`Dashboard`** — static placeholder cards inside `MainLayout`, with a **logout** button that clears the placeholder token and returns to login.
- **`NotFound`** — a friendly 404 with a link back to the dashboard.

---

## How the placeholder auth flow behaves

1. Visit any protected URL (e.g. `/dashboard`) while "logged out" → guard redirects to `/login`.
2. Click **Sign in** → a placeholder token is saved → redirected to `/dashboard` with the full app shell.
3. Click **Logout** → token cleared → back to `/login`.

This lets you fully exercise public/protected routing **before** any real backend exists.

---

## Cleanup

- `App.tsx` is now just `return <AppRoutes />` — all routing lives in `routes/`.
- Removed the temporary preview routing that was in `App.tsx`.
- Deleted the now-obsolete `.gitkeep` markers in `routes/`, `features/auth/pages/`, and `features/dashboard/pages/`.

---

## Verification

- `npm run build` → **succeeded, zero TypeScript errors**; no diagnostics on any routing file.
- The redirect, guard, login, logout, and 404 flows are all wired through the `ROUTES` constants.

---

## What this step delivered

- Clean, **centralized routing** in one file.
- **Public** (AuthLayout) vs. **protected** (guard + MainLayout) route groups.
- **Login**, **Dashboard**, root-redirect, and **404** routes.
- A reusable **`ProtectedRoute`** guard.
- **Placeholder auth** via `useAuth` — no backend/JWT assumptions, ready to be swapped for the real `AuthContext`.

**Next step:** create the centralized Axios API client and environment configuration (base URL, interceptors, 401 handling) — still without assuming the backend contract.
