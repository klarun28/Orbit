# Orbit 2.0 — Step 4: Reusable Components

**Goal of this step:** Build a set of reusable React components with **TypeScript prop interfaces**, following reusable-component principles (simple, focused, configurable via props).

Components created:

| Component | Location | Purpose |
|---|---|---|
| `Button` | `components/common/` | Themed button with loading/icon/variants |
| `Input` | `components/common/` | Labelled text field with error + icon support |
| `Loader` | `components/common/` | Loading spinner |
| `Modal` | `components/common/` | React-controlled dialog |
| `ConfirmDialog` | `components/common/` | Yes/no confirmation (composes Modal + Button) |
| `PageHeader` | `layouts/components/` | Consistent page title bar |

> **Why two locations:** the five generic UI pieces live in `components/common/`. `PageHeader` is part of the page *layout* family, so it lives in `layouts/components/` per the folder structure.

---

## Design principles followed

- **Typed props:** every component has a TypeScript `interface` for its props. No `any`.
- **Extend native elements:** `Button` and `Input` extend the real HTML attributes (`ButtonHTMLAttributes`, `InputHTMLAttributes`), so standard props like `onClick`, `disabled`, `type`, `value` work automatically.
- **Sensible defaults:** e.g. `variant="primary"`, `size="md"` — use them with zero config.
- **Composition:** `ConfirmDialog` is built from `Modal` + `Button`, not duplicated code.
- **Controlled by props:** `Modal`/`ConfirmDialog` visibility is driven by React state (`isOpen`), which is predictable and testable.
- **Clean imports:** a barrel file (`components/common/index.ts`) lets you import several at once.

---

## 1. `Button`

Themed button with variants, sizes, an optional icon, loading state, and full-width option. Extends native `<button>`.

```tsx
import { Button } from '@/components/common'

<Button onClick={handleSave}>Save</Button>
<Button variant="danger" icon="bi-trash" onClick={handleDelete}>Delete</Button>
<Button isLoading>Saving...</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

**Props:** `variant`, `size`, `isLoading`, `icon`, `fullWidth` + all native button props.

---

## 2. `Input`

Labelled text field with an optional inline icon, required marker, and error message. Extends native `<input>` and links the label to the input for accessibility (auto-generated id).

```tsx
import { Input } from '@/components/common'

<Input
  label="Email"
  type="email"
  icon="bi-envelope"
  placeholder="you@example.com"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```

**Props:** `label`, `error`, `icon`, `required` + all native input props (`value`, `onChange`, `type`, ...).

---

## 3. `Loader`

A spinner for loading states. Use inline, or `fullScreen` to center it in a container.

```tsx
import { Loader } from '@/components/common'

<Loader />
<Loader label="Loading employees..." />
<Loader size="lg" fullScreen />
```

**Props:** `label`, `size` (`sm|md|lg`), `fullScreen`.

---

## 4. `Modal`

A React-controlled dialog. You own the open/close state; the modal handles the backdrop, centering, Escape-to-close, and background scroll lock.

```tsx
import { useState } from 'react'
import { Modal, Button } from '@/components/common'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Edit Employee"
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <p>Your form or content goes here.</p>
</Modal>
```

**Props:** `isOpen`, `onClose`, `title`, `children`, `footer`, `size` (`sm|md|lg`).

---

## 5. `ConfirmDialog`

A ready-made yes/no confirmation built by composing `Modal` + `Button`. Great for destructive actions.

```tsx
import { useState } from 'react'
import { ConfirmDialog } from '@/components/common'

const [confirming, setConfirming] = useState(false)

<ConfirmDialog
  isOpen={confirming}
  title="Delete item?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  isDestructive
  onConfirm={handleDelete}
  onCancel={() => setConfirming(false)}
/>
```

**Props:** `isOpen`, `title`, `message`, `confirmLabel`, `cancelLabel`, `isDestructive`, `isConfirming`, `onConfirm`, `onCancel`.

---

## 6. `PageHeader`

A consistent header for the top of each page: title, optional subtitle/icon, and a right-aligned actions area.

```tsx
import { PageHeader } from '@/layouts/components/PageHeader'
import { Button } from '@/components/common'

<PageHeader
  title="Employees"
  subtitle="Manage your team"
  icon="bi-people"
  actions={<Button icon="bi-plus-lg">Add Employee</Button>}
/>
```

**Props:** `title`, `subtitle`, `icon`, `actions`.

---

## Barrel import

Because of `components/common/index.ts`, you can import several components in one line:

```tsx
import { Button, Input, Modal, Loader, ConfirmDialog } from '@/components/common'
```

---

## Verification

- `App.tsx` was turned into a **live showcase** that renders every component together.
- `npm run build` → **succeeded, zero TypeScript errors**; no diagnostics on any component.

> The showcase in `App.tsx` is temporary — it will be replaced by the real layout and routes in later steps.

---

## What this step delivered

- Six reusable, typed components following consistent conventions.
- Composition in action (`ConfirmDialog` built from `Modal` + `Button`).
- A barrel export for clean imports.
- Everything styled via the Step 3 design system — no one-off styling.

**Next step:** build the layouts (`MainLayout`, `AuthLayout`) and layout parts (`Header`, `Sidebar`, `Footer`) using these components and the shell styles.
