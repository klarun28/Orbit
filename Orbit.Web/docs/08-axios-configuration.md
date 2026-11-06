# Orbit 2.0 — Step 8: Axios Configuration

**Goal of this step:** Set up **centralized** Axios API communication — one configured client used by the whole app — with environment-driven base URL, interceptors, a configurable timeout, centralized error handling, JWT Bearer support, and 401 handling. **No real endpoints are invented and no actual authentication is connected yet.**

Files created/updated:

| File | Role |
|---|---|
| `.env.development` | Dev environment variables |
| `.env.production` | Production environment variables |
| `.env.example` | Template for other developers |
| `config/appConfig.ts` | Reads env vars + timeout (single source) |
| `services/tokenService.ts` | Centralized token storage |
| `services/apiEndpoints.ts` | Centralized endpoint paths (placeholders) |
| `services/apiClient.ts` | The configured Axios instance |

---

## 1. Environment files

Vite exposes variables prefixed with `VITE_` to the frontend via `import.meta.env`.

**`.env.development`**
```env
VITE_APP_NAME=Orbit 2.0
VITE_API_BASE_URL=https://localhost:7001/api
```
**`.env.production`** — same keys, base URL left empty to be filled at deploy time.
**`.env.example`** — a committed template so any developer knows which variables to set (with comments), without needing the real values.

**Why:** the API URL is **never hardcoded** in components. Change the environment file, not the code. The placeholder URL/port will be replaced with the real one from the backend team.

## 2. `config/appConfig.ts` — the one place env is read

```ts
export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Orbit 2.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  apiTimeout: DEFAULT_REQUEST_TIMEOUT, // 15000ms
} as const
```
All environment access funnels through here, so nothing else touches `import.meta.env` directly.

## 3. `services/tokenService.ts` — centralized token storage

A small service with `getToken`, `setToken`, `clearToken`, `hasToken`. It wraps `localStorage` in one place, so:
- the storage mechanism can change later (e.g. to cookies) without touching the rest of the app, and
- the Axios client, the auth guard, and the login/logout flow all share the same token logic.

> The earlier ad-hoc `localStorage` calls in `useAuth`, `Login`, and `Dashboard` were refactored to use this service.

## 4. `services/apiEndpoints.ts` — endpoint paths (placeholders)

A single object grouping endpoint paths by feature. **No real endpoints are defined** — the file contains the intended shape and commented examples only. Actual paths get filled in here once the backend contract is provided, so feature services never hardcode URL strings.

## 5. `services/apiClient.ts` — the configured Axios instance

This is the heart of the step. One `axios.create(...)` with:

**Base configuration**
- `baseURL` from `appConfig.apiBaseUrl`.
- `timeout` from `appConfig.apiTimeout` (configurable).
- Default JSON headers (`Content-Type` / `Accept`).

**Request interceptor — JWT Bearer**
- Reads the token via `tokenService` and, if present, adds `Authorization: Bearer <token>` to every request automatically. No feature code has to attach the token manually.

**Response interceptor — centralized error handling + 401**
- Successful responses pass straight through.
- On **HTTP 401 Unauthorized**: clears the token and redirects to the login route (guarding against redirect loops if already on login).
- Every error is **normalized** into a consistent `ApiError` shape `{ status, message }` (with friendly messages for timeouts and network failures), so callers always get predictable errors instead of raw Axios objects.

---

## How feature services will use this client

Each feature keeps its own small service file that imports the shared `apiClient` and the endpoint paths — it never configures Axios itself. Once the backend contract is known, a service looks like this:

```ts
// features/employees/employeeService.ts  (illustrative — not created yet)
import { apiClient } from '../../services/apiClient'
import { API_ENDPOINTS } from '../../services/apiEndpoints'
import type { Employee } from './employeeTypes'

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const { data } = await apiClient.get<Employee[]>(API_ENDPOINTS.employees.list)
    return data
  },

  async getById(id: string): Promise<Employee> {
    const { data } = await apiClient.get<Employee>(API_ENDPOINTS.employees.byId(id))
    return data
  },
}
```

**What the feature service gets for free:**
- Base URL, timeout, and JSON headers — already set.
- The JWT token — attached automatically by the request interceptor.
- 401 handling and error normalization — handled by the response interceptor.

So each service only describes **what** it fetches and the **types** it returns — all the cross-cutting HTTP concerns live in the one client. This prevents duplicated Axios setup across modules.

---

## Verification

- `npm run build` → **succeeded, zero TypeScript errors**; no diagnostics on any new/changed file.
- Nothing calls the API yet (by design) — the client, token service, and endpoint structure are ready for the real contract.

---

## What this step delivered

- Environment-driven configuration via `.env` files and `appConfig`.
- A single **centralized Axios client** with request/response interceptors, configurable timeout, JSON headers, **JWT Bearer** injection, **401 handling**, and **normalized errors**.
- A **tokenService** as the single owner of token storage.
- A placeholder **endpoint registry** — no invented endpoints, no real auth connected.
- A clear pattern for how feature services reuse the shared client.

**Next step:** create the application-wide `AuthContext` and wire the real protected-route structure to it (still without assuming the backend contract).
