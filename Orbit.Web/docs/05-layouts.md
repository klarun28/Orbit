# Orbit 2.0 — Step 5: Application Layouts

**Goal of this step:** Build the application layouts and their parts — a professional, responsive, enterprise-style shell with a **collapsible, responsive sidebar**, an **Orbit 2.0 branded header**, a **main content area**, and a **footer**. Light theme, Bootstrap 5, Bootstrap Icons. Placeholder menu items only (no API-driven menus yet).

Components created:

| Component | Location | Role |
|---|---|---|
| `MainLayout` | `layouts/` | App shell for authenticated pages |
| `AuthLayout` | `layouts/` | Centered layout for login/auth pages |
| `Header` | `layouts/components/` | Top bar: toggle, branding, user menu |
| `Sidebar` | `layouts/components/` | Collapsible/responsive navigation |
| `Footer` | `layouts/components/` | Bottom bar |

---

## How a layout works (the key concept)

A **layout** is the fixed frame around your pages. Instead of repeating the sidebar/header on every page, each page renders *inside* a layout.

React Router provides this through **`<Outlet />`** — a placeholder where the current page is injected. So:

```
MainLayout (sidebar + header + footer)
   └── <Outlet />  ← the Dashboard / Employees / etc. page renders here
```

This means the shell is written **once** and every page reuses it.

---

## 1. `Sidebar`

Responsive, collapsible navigation with **placeholder menu items** (Dashboard, Employees, Reports, Settings).

**What it does**
- Uses React Router's `NavLink`, which automatically adds an `active` class to the current route — the styling for `active` was defined in Step 3.
- **Two states controlled by props:**
  - `isCollapsed` (desktop) — shrinks to an **icon-only rail**; labels and the brand text hide, and hovering shows the label via `title`.
  - `isMobileOpen` (mobile) — slides in as a **drawer** (handled by the responsive CSS).
- `onNavigate` closes the mobile drawer after a link is tapped.

> The menu array is static on purpose. Dynamic/API menus are a later concern.

## 2. `Header`

The top bar with:
- A **toggle button** (hamburger) that collapses the sidebar on desktop or opens the drawer on mobile.
- **Orbit 2.0 branding**.
- A **notifications** icon and a **user menu dropdown** (powered by Bootstrap's dropdown JS). The user menu is a **static placeholder** ("Guest User", disabled Profile/Logout) until authentication is implemented.

## 3. `Footer`

A simple, centered footer showing the copyright and current year. Static content.

## 4. `MainLayout`

The shell that ties it all together and holds the **sidebar state**:
- Keeps `isCollapsed` and `isMobileOpen` in React state.
- `handleToggleSidebar` checks screen width: on mobile it opens/closes the **drawer**, on desktop it toggles the **collapsed rail** — one button, context-aware behavior.
- Renders a dimmed **backdrop** behind the mobile drawer (tap it to close).
- Renders the active page through `<Outlet />`.

Structure:
```
orbit-shell
├── Sidebar
├── (mobile backdrop)
└── orbit-main
    ├── Header
    ├── orbit-content → <Outlet />
    └── Footer
```

## 5. `AuthLayout`

A minimal, centered layout for login and forgot-password pages — just the Orbit 2.0 brand and a card, no sidebar or header. The auth page renders through `<Outlet />`.

---

## Supporting CSS added

The collapsed-rail styling (`.orbit-sidebar.is-collapsed`) was added to `styles/layout.css`: it narrows the sidebar to the icon-only width and centers the brand and nav icons. All other shell styling (drawer, backdrop, sticky header) was already defined in Step 3, so the components here just apply class names.

---

## Responsive behavior summary

| Screen | Sidebar behavior |
|---|---|
| Desktop (≥768px) | Full sidebar; toggle collapses it to an icon rail |
| Mobile (<768px) | Sidebar hidden; toggle slides it in as a drawer with a backdrop |

Breakpoints match Bootstrap's for consistency.

---

## Verification

- `App.tsx` was turned into a **temporary layout preview** using `BrowserRouter` with placeholder Dashboard and Login pages, so the shell, collapsing, responsiveness, and `<Outlet />` can be seen working.
- `npm run build` → **succeeded, zero errors** (React Router is now bundled).
- Dev server confirmed rendering at `http://localhost:5174/`.

> The preview routing in `App.tsx` is temporary — it will be replaced by the real, centralized routing in the next step.

---

## What this step delivered

- A professional, enterprise-style **application shell** (`MainLayout`).
- A separate **centered auth layout** (`AuthLayout`).
- **Collapsible** (desktop) and **responsive drawer** (mobile) **sidebar** with placeholder menu items.
- **Header** with Orbit 2.0 branding, toggle, and a placeholder user menu.
- **Footer**.
- Light theme, Bootstrap 5, Bootstrap Icons throughout — no one-off styling.

**Next step:** configure centralized React Router (public/protected routes, 404 page) and wire these layouts into the real route tree.
