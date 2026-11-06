# Orbit 2.0 — Step 9: Authentication Foundation

**Goal of this step:** Prepare the React authentication foundation — context, hook, service, and types — structured for **login, logout, auth state, current user, and protected routes**. The implementation is **integration-ready** but does **not** invent the backend JWT request/response shape and does **not** assume `localStorage` is a secure token store.

Files created/updated:

| File | Location | Role |
|---|---|---|
| `authTypes.ts` | `features/auth/` | Auth-related TypeScript types (placeholders) |
| `authService.ts` | `features/auth/` | The backend integration seam (stubbed) |
| `AuthContext.tsx` | `context/` | The context object + value type |
| `AuthProvider.tsx` | `context/` | Holds state + login/logout logic |
| `useAuth.ts` | `hooks/` | Hook to consume the context |

---

## How the pieces connect

```
AuthProvider (state + actions)
   │  provides
   ▼
AuthContext ──consumed by──▶ useAuth() ──used by──▶ ProtectedRoute, pages
   │
   └── calls authService (login / logout / getCurrentUser)
                 │
                 └── uses apiClient + tokenService
```

- **`authTypes.ts`** defines the data shapes.
- **`authService.ts`** is the only place that will talk to the backend auth API.
- **`AuthProvider`** owns the auth state and exposes actions.
- **`useAuth`** is how any component reads state or triggers login/logout.

---

## 1. `authTypes.ts` — placeholder types

Defines `LoginCredentials`, `AuthUser`, `AuthResult`, and an `AuthStatus` union (`unknown | authenticated | unauthenticated`).

**Key point:** these are **generic placeholders** with a clear comment saying so. They do **not** represent the real ASP.NET Core JWT payloads. Once the backend contract is reviewed, these interfaces are updated to match — and because everything depends on them, the change flows through cleanly.

## 2. `authService.ts` — the integration seam

A service with `login`, `logout`, and `getCurrentUser`. It imports the shared `apiClient` (so JWT headers, timeout, and 401 handling apply automatically) and `tokenService`.

**Key point:** the real API calls are **intentionally not implemented** — `login` and `getCurrentUser` throw a clear "not implemented — pending backend API contract" error, with `TODO` comments showing exactly where the real endpoint calls go. Wiring up auth later is a **small, localized change inside this one file**. `logout` already clears the local token.

## 3. `AuthContext.tsx` + `AuthProvider.tsx`

Split into two files (a common React pattern that keeps hot-reload working):
- **`AuthContext.tsx`** — the context object and its value type (`status`, `isAuthenticated`, `isLoading`, `user`, `login`, `logout`). Created with `undefined` default so using it without a provider throws a clear error.
- **`AuthProvider.tsx`** — the component that:
  - Holds `status`, `user`, and `isLoading` state.
  - On startup, **restores the session**: if a token exists it asks `authService.getCurrentUser()` for the user.
  - Exposes `login` (calls the service, stores the token, sets the user) and `logout` (clears everything).
  - Memoizes the context value to avoid unnecessary re-renders.

`AuthProvider` wraps the whole app in `App.tsx`, above the router.

## 4. `useAuth.ts` — the consumer hook

Upgraded from the earlier temporary placeholder to read the real context. It throws if used outside `<AuthProvider>`, which catches wiring mistakes early. Every component (and `ProtectedRoute`) now uses this single hook for auth.

## 5. `ProtectedRoute` update

The guard now:
- Shows a **full-screen loader** while the session is being restored (`isLoading`), so it never redirects before auth state is known.
- Redirects to login when unauthenticated.
- Otherwise renders the nested routes.

(The security note remains: frontend route-hiding is UX, not security — the backend enforces authorization.)

---

## Security note: token storage

The task explicitly says **don't assume `localStorage` is secure**. `tokenService` (from Step 8) is the **single owner** of token storage, precisely so the mechanism can be swapped later (e.g. to HTTP-only cookies handled by the backend, or in-memory storage) **without touching any other code**. No component reads storage directly — they all go through the service.

---

## Temporary demo behavior (clearly marked)

So the app still runs end-to-end before the backend exists:
- **Login** stores a placeholder token and does a full navigation so the provider re-runs its restore and marks the session authenticated. A `TODO` shows the real `login({...})` call to use later.
- **AuthProvider** falls back to a placeholder "Guest User" when `getCurrentUser` is unimplemented, with a `TODO` to remove the fallback (and clear the token on failure) once wired.
- **Dashboard** now reads the current user from `useAuth()` for its welcome message and uses the context `logout()`.

All three are explicitly commented as temporary and point to the exact lines to change after the contract review.

---

## Verification

- `npm run build` → **succeeded, zero TypeScript errors** (after removing a leftover import); no diagnostics on any auth file.
- Flow still works: login → dashboard shows the user and protected content → logout → back to login.

---

## What this step delivered

- A clean, typed **authentication foundation**: context, provider, hook, service, and types.
- Structure ready for **login, logout, auth state, current user, and protected routes**.
- **No invented backend contract** — `authService` is a stubbed seam with clear TODOs.
- **No assumption that localStorage is secure** — storage is isolated in `tokenService` for easy swapping.
- Integration later is a small, localized change inside `authService.ts` (plus updating `authTypes.ts` to the real shapes).

**This completes the frontend foundation.** Awaiting the backend API contract before implementing real authentication and business modules.
