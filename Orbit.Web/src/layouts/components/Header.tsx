export interface HeaderProps {
  /** Toggles the desktop sidebar collapse / opens the mobile drawer. */
  onToggleSidebar: () => void
}

/**
 * Top application header: sidebar toggle, Orbit 2.0 branding, and a
 * placeholder user menu. Branding and user menu are static for now.
 */
export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="orbit-header">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-link text-secondary p-0 fs-4 lh-1"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list" />
        </button>
        <span className="fw-semibold d-none d-sm-inline">
          Orbit 2.0
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-link text-secondary p-0 fs-5 lh-1 position-relative"
          aria-label="Notifications"
        >
          <i className="bi bi-bell" />
        </button>

        {/* Placeholder user menu (static until auth is implemented). */}
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-link text-decoration-none text-body d-flex align-items-center gap-2 p-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34 }}
            >
              <i className="bi bi-person-fill" />
            </span>
            <span className="d-none d-md-inline small fw-medium">Guest User</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li>
              <span className="dropdown-item-text small orbit-text-muted">
                Signed in as Guest
              </span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button type="button" className="dropdown-item" disabled>
                <i className="bi bi-person me-2" />
                Profile
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item" disabled>
                <i className="bi bi-box-arrow-right me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
