import { Outlet } from 'react-router-dom'

/**
 * A minimal, centered layout for authentication pages (login, forgot
 * password). No sidebar or header — just a branded card in the middle.
 *
 * Routed auth pages are rendered via <Outlet />.
 */
export function AuthLayout() {
  return (
    <div className="orbit-auth">
      <div className="orbit-auth__card">
        <div className="text-center mb-4">
          <i className="bi bi-rocket-takeoff-fill text-primary display-6" />
          <h1 className="h4 mt-2 mb-0">Orbit 2.0</h1>
          <p className="orbit-text-muted small mb-0">Enterprise Platform</p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
