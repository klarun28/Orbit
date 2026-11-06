# Orbit 2.0 — Step 1: Frontend Project Setup

**Goal of this step:** Create the `Orbit.Web` frontend project using **React + TypeScript + Vite**, add **Bootstrap 5** and **Bootstrap Icons**, and confirm that `npm run dev` and `npm run build` both work.

This document explains **what was done, why it was done, and what each piece is for**, in simple language.

---

## 1. Verify the development environment

Before creating anything, we checked that the machine has the right tools.

```bash
node -v    # v22.20.0
npm -v     # 10.9.3
```

**Why we do this first**
- **Node.js** is the engine that runs JavaScript tooling outside the browser. Vite, the dev server, and the build all run on Node.
- **npm** is the package manager that downloads and manages libraries (React, Axios, Bootstrap, etc.).
- Vite needs **Node.js 18 or newer**. Our version is **22.20.0 (LTS)**, which is current and fully supported.

**Result:** Environment is compatible. No installation or upgrade needed.

> If Node.js had been missing or too old, the fix would be: download the **LTS** version from [nodejs.org](https://nodejs.org), install it, and restart the terminal. `npm` comes bundled with Node, so no separate install is required.

---

## 2. Create the project with Vite

```bash
npm create vite@latest Orbit.Web -- --template react-ts
```

**What this command does**
- `npm create vite@latest` runs Vite's official project generator.
- `Orbit.Web` is the folder/project name.
- `--template react-ts` tells Vite to scaffold a **React** project pre-wired for **TypeScript** (`.tsx` files).

**Why Vite (and not Create React App)**
- **Fast:** Vite starts the dev server almost instantly and updates the browser in milliseconds using Hot Module Replacement (HMR).
- **Modern:** It is the current recommended tool for React projects. Create React App is no longer maintained.
- **Lean build:** It produces small, optimized production bundles out of the box.

**Why TypeScript (not plain JavaScript)**
- TypeScript adds **types**, which catch mistakes while you write code instead of at runtime.
- It gives better editor autocomplete and makes the code easier to maintain as the app grows.
- The project requirement is a type-safe, scalable, enterprise-ready frontend.

---

## 3. Install the required libraries

```bash
npm install react-router-dom axios bootstrap bootstrap-icons
```

Each package has a specific job:

| Package | Version | What it is for |
|---|---|---|
| **react-router-dom** | 7.18.5 | Handles navigation between pages (Login, Dashboard, etc.) without reloading the whole page. |
| **axios** | 1.21.0 | A clean HTTP client used to talk to the backend API (GET/POST/etc.). Easier to configure than the built-in `fetch`. |
| **bootstrap** | 5.3.8 | A ready-made CSS framework for layout, buttons, cards, grids, and responsive design. Saves writing styling from scratch. |
| **bootstrap-icons** | 1.13.2 | An icon set (rockets, arrows, check marks, etc.) that pairs with Bootstrap. |

> React and React DOM (v19.3.1) were already included by the Vite template, so they didn't need separate installation.

**Why these exact tools:** they are the standard, well-supported choices for a professional React app and were listed in the project's required technology stack. We installed **only what is needed** — no extra packages.

---

## 4. Wire Bootstrap into the app

We added the Bootstrap and icon imports in **`src/main.tsx`** (the app's entry point — the first file that runs):

```tsx
// Bootstrap 5 styles, interactive JS bundle, and icon font
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
```

**Why each import matters**
- `bootstrap.min.css` — the styles (colors, spacing, grid, components).
- `bootstrap.bundle.min.js` — the JavaScript that powers **interactive** components like modals, dropdowns, and tooltips we'll use later.
- `bootstrap-icons.css` — makes icons available via simple classes like `<i className="bi bi-rocket">`.

**Why in `main.tsx`:** importing it here loads Bootstrap **once** for the entire app, so every component can use it. We avoid importing it repeatedly in individual files.

---

## 5. Create a simple placeholder screen

We replaced the default Vite demo page in **`src/App.tsx`** with a small, clean placeholder:

- A centered card with a rocket icon and the title **Orbit 2.0**.
- A green badge reading **"Bootstrap 5 & Bootstrap Icons loaded"**.

**Why:** this is only a **visual confirmation** that React, Vite, and Bootstrap are all working together. We intentionally did **not** build real pages or dashboards yet — that comes in later steps. Keeping it minimal avoids clutter and makes the foundation easy to review.

---

## 6. Clean up leftover demo files

- **Deleted `src/App.css`** — it belonged to the Vite demo and was no longer used (an unused file could cause confusion or broken imports).
- **Simplified `src/index.css`** — removed the demo's custom styling that would have fought with Bootstrap. It now only holds a tiny baseline reset so Bootstrap controls the look and the **light theme** stays consistent.
- **Updated `index.html`** — changed the browser tab title from `orbit-web` to **Orbit 2.0**.

**Why:** a clean starting point with no dead code and no conflicting styles. Every remaining file has a clear purpose.

---

## 7. Verify everything works

**Production build** (type-check + bundle):

```bash
npm run build
```
Result: **built successfully with zero TypeScript errors.** Bootstrap CSS and the icon font were correctly included in the output.

**Development server:**

```bash
npm run dev
```
Result: server started and served the app in the browser (on `http://localhost:5174/`, because port 5173 was already in use).

---

## 8. The npm scripts (how to run the project)

Defined in `package.json`:

| Command | What it does | When to use it |
|---|---|---|
| `npm run dev` | Starts the Vite dev server with live reload. | Daily development. |
| `npm run build` | Type-checks (`tsc -b`) then creates an optimized production bundle in `dist/` (`vite build`). | Before deploying / to catch errors. |
| `npm run preview` | Serves the built `dist/` folder locally. | To test the production build before release. |

---

## 9. Summary of files created or changed in this step

| File | Change | Purpose |
|---|---|---|
| `src/main.tsx` | Added Bootstrap CSS, JS bundle, and icon imports | Load Bootstrap once for the whole app |
| `src/App.tsx` | Replaced demo with a placeholder card | Confirm the stack works |
| `src/index.css` | Reduced to a clean baseline | Let Bootstrap own the styling |
| `src/App.css` | Deleted | Remove unused demo file |
| `index.html` | Title set to `Orbit 2.0` | Professional default |

---

## 10. What this step delivered

- A running **React + TypeScript + Vite** project named **Orbit.Web**.
- **Bootstrap 5** and **Bootstrap Icons** fully wired in.
- Verified working `dev` and `build` commands with **no errors**.
- A clean, minimal foundation — **frontend only**, no backend/API files, ready for the next steps (folder structure, layouts, routing, and the Axios API client).

**Next step:** create the recommended folder structure and global styles.
