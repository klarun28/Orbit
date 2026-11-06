# Orbit 2.0 — Step 3: Global Styling

**Goal of this step:** Set up centralized, reusable global styling for an **enterprise-style** look, with a **light theme by default**, built on **Bootstrap 5** and **Bootstrap Icons** plus our own **CSS variables (design tokens)**.

No dashboard or login functionality was added — styling only.

---

## The idea: a design system driven by tokens

Instead of scattering colors and spacing values across many files, everything is defined **once** as CSS variables (called **design tokens**) in one file. Every other stylesheet and component then references those tokens.

**Why this matters**
- **Consistency:** one color/spacing value used everywhere.
- **Re-theming:** change a token once and the whole app updates.
- **Reusability:** shared helper classes mean components don't re-invent styles.

---

## How the pieces fit together

| Layer | File | Role |
|---|---|---|
| Framework | Bootstrap 5 (imported in `main.tsx`) | Component library + grid |
| Icons | Bootstrap Icons (imported in `main.tsx`) | Icon font (`<i className="bi bi-...">`) |
| Tokens | `styles/variables.css` | All colors, spacing, typography, etc. |
| Base + helpers | `styles/global.css` | Base element styling + reusable classes |
| Shell layout | `styles/layout.css` | Sidebar/header/content/footer structure |
| Responsive | `styles/responsive.css` | Mobile behavior (sidebar drawer) |

They load in this order in `main.tsx` (Bootstrap first, then Orbit styles) **so our styles can override Bootstrap defaults**.

---

## 1. `variables.css` — design tokens (the source of truth)

Defines, as CSS custom properties:
- **Colors:** brand primary (and hover/subtle variants), success/warning/danger/info, surfaces, text, borders.
- **Typography:** font family, base size (15px — comfortable for data-dense enterprise screens), line height.
- **Spacing scale:** `xs → xl` for consistent gaps and padding.
- **Radius & shadows:** soft corners and subtle elevation for a modern, clean feel.
- **Layout sizing:** sidebar width, header/footer heights.
- **Transitions:** a shared timing value for smooth interactions.

**Key technique — theming Bootstrap itself:**
The file also maps Orbit tokens onto Bootstrap's own variables, e.g.:
```css
--bs-primary: var(--orbit-primary);
--bs-body-bg: var(--orbit-bg);
--bs-border-radius: var(--orbit-radius);
```
This means **native Bootstrap components automatically adopt the Orbit theme** — no need to override every component manually.

**Light theme is the default.** A `[data-theme='dark']` block is included as a **forward-looking hook only**; it is not switched on anywhere. This keeps a future dark mode cheap to add without doing it now.

## 2. `global.css` — base styles + reusable helpers

- Applies tokens to base elements: `body`, headings, links.
- Adds an accessible **focus ring** (`:focus-visible`) for keyboard users.
- Provides small, reusable helper classes so components stay consistent:
  - `.orbit-card` — standard card surface (border, radius, soft shadow).
  - `.orbit-text-muted` — subtle secondary text.
  - `.orbit-page-title` — consistent page/section titles.
  - `.btn-orbit-primary` — themed primary button built on Bootstrap's `.btn`.
- Thin, unobtrusive custom **scrollbars** for a cleaner enterprise feel.

## 3. `layout.css` — the application shell

Defines the structural classes the layout components will use later:
- `.orbit-shell` — flex container: sidebar + main column.
- `.orbit-sidebar`, `.orbit-sidebar__brand`, `.orbit-sidebar__nav`, `.orbit-nav-link` — the sidebar and its navigation (with hover and `active` states).
- `.orbit-main`, `.orbit-header`, `.orbit-content`, `.orbit-footer` — the content column with a sticky header and a footer.
- `.orbit-auth` / `.orbit-auth__card` — a centered, no-sidebar layout for the login screen.

Defining these now means the layout components (built in a later step) just apply class names — **all styling stays centralized here.**

## 4. `responsive.css` — mobile behavior

- On tablets, content padding tightens.
- On phones, the sidebar becomes a **slide-in drawer**: hidden by default (`translateX(-100%)`), shown with an `.is-open` class, with a dimmed `.orbit-sidebar-backdrop` behind it, and a hamburger toggle (`.orbit-sidebar-toggle`) appears in the header.
- Uses the same breakpoints as Bootstrap (768px, 576px, etc.) for consistency.

---

## 5. Light theme set as default

In `index.html` the root element declares the theme explicitly:
```html
<html lang="en" data-theme="light" data-bs-theme="light">
```
This guarantees the light theme from the very first paint (no flash) and tells both Orbit and Bootstrap to use light mode.

---

## Temporary showcase in `App.tsx`

`App.tsx` was updated to a small **style showcase** — a centered card with the themed primary button, a secondary button, icons, and status badges. Its only job is to **prove the styling works**. It is not login or dashboard logic and will be replaced by the real layout and routes in later steps.

---

## Verification

```bash
npm run build
```
Result: **build succeeded, zero errors.** The CSS bundle grew to ~316 kB, reflecting Bootstrap plus the Orbit design system.

---

## What this step delivered

- **Bootstrap 5 + Bootstrap Icons** confirmed wired in.
- A centralized **design-token system** in `variables.css`, including Bootstrap variable theming.
- Reusable **base styles and helper classes** in `global.css`.
- A complete, centralized **app-shell layout** in `layout.css`.
- **Responsive** mobile behavior in `responsive.css`.
- **Light theme as default**, with a dark-theme hook ready for the future.
- Clean enterprise look: soft shadows, rounded corners, muted borders, readable typography.

**Next step:** build the reusable common components (`Button`, `Input`, `Loader`, `Modal`, `ConfirmDialog`) on top of this styling.
