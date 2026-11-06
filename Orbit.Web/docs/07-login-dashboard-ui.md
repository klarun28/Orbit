# Orbit 2.0 — Step 7: Login & Dashboard UI

**Goal of this step:** Build the initial **Login** and **Dashboard** pages with a professional, modern UI themed for Orbit — an **international logistics portal** (shipment bookings). **Frontend only — no backend connection.**

Pages created/updated:

| Page | Location | Notes |
|---|---|---|
| `Login` | `features/auth/pages/` | Split-screen logistics design |
| `ForgotPassword` | `features/auth/pages/` | UI-only reset form |
| `Dashboard` | `features/dashboard/pages/` | Logistics summary + bookings table |

---

## Login page

A modern **split-screen** layout, which is the current standard for professional SaaS/enterprise sign-in:

- **Left panel (branding):** a gradient logistics-themed panel with the Orbit 2.0 logo, a headline ("Move the world, one shipment at a time."), and three feature bullets (book shipments, real-time tracking, secure platform). It's decorative and only shows on large screens.
- **Right panel (form):** the actual sign-in form, centered and clean.

**Required fields implemented:**
- **Username** — text field with a person icon.
- **Password** — with a **show/hide toggle** (eye icon flips the input between `password` and `text`).
- **Remember me** — a checkbox (UI state only).
- **Login button** — full-width primary button.
- **Forgot password link** — navigates to the `/forgot-password` route.

**Behavior:** this is **frontend only**. "Sign in" stores a **placeholder token** and routes to the dashboard. It does **not** call a backend or assume any JWT/API response shape — matching the project rule to wait for the real API contract.

**Responsive:** on screens below `lg`, the branding panel hides and a compact Orbit logo appears above the form, so it works cleanly on mobile.

---

## Forgot Password page

A simple, UI-only page shown inside the centered `AuthLayout`:
- An email field and "Send reset link" button.
- On submit it shows a **success confirmation** ("Check your email") — no backend call.
- A "Back to sign in" link.

---

## Dashboard page

A logistics-focused dashboard inside `MainLayout`, using **dummy data only**:

- **Welcome message:** "Welcome back, Guest" with a supporting subtitle, via the reusable `PageHeader`.
- **Header actions:** a "New Booking" button and a "Logout" button (logout clears the placeholder token and returns to login).
- **Summary cards (4):** Active Shipments, In Transit, Delivered (30d), and Delayed — each with an icon, a value, and an up/down trend indicator. Colors use Bootstrap's subtle tones for a clean enterprise look.
- **Recent Bookings table:** dummy shipment rows (Booking ID, Route like "Shanghai → Rotterdam", Mode with an air/sea icon, and a colored Status badge).

All data is hardcoded placeholder content; real figures come once the backend API is connected.

---

## Routing changes

- Added a **`forgotPassword`** path to `routeConfig.ts`.
- **Login** now renders as a **standalone full-screen route** (it has its own split-screen layout, so it doesn't use the centered `AuthLayout`).
- **ForgotPassword** uses the centered `AuthLayout`.
- Dashboard remains a protected route inside `MainLayout`.

---

## Styling added

A reusable **split-screen auth layout** was added to `styles/layout.css`:
- `.orbit-auth-split` (flex container), `.orbit-auth-split__brand` (gradient panel with a subtle dotted overlay), and `.orbit-auth-split__form` (form side).
- The brand panel only appears at `≥992px`, keeping mobile clean.

As always, styling is centralized — the pages apply classes rather than defining one-off styles.

---

## Verification

- `npm run build` → **succeeded, zero TypeScript errors**; no diagnostics on any page.
- Dev server confirmed rendering at `http://localhost:5174/`.

**Try the flow:** open `/login` → toggle show/hide password, tick remember me → Sign in → land on the logistics dashboard → Logout returns to login. "Forgot password?" opens the reset page.

---

## What this step delivered

- A **professional, modern Login** with username, password + show/hide, remember me, login button, and forgot-password link — themed for an international logistics portal.
- A **Forgot Password** UI page.
- A **logistics Dashboard** with a welcome message, four summary cards, and a recent-bookings table — all dummy data.
- **No backend connection**, no JWT assumptions — purely frontend UI.

**Next step:** build the centralized Axios API client and environment configuration (base URL, interceptors, 401 handling), still without assuming the backend contract.
