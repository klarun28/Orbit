import { NavLink } from 'react-router-dom'

/** A single navigation entry shown in the sidebar. */
interface NavItem {
  label: string
  to: string
  icon: string
}

/**
 * Placeholder navigation items.
 * These are static for now — dynamic/API-driven menus come later.
 */
const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: 'bi-speedometer2' },
  { label: 'Employees', to: '/employees', icon: 'bi-people' },
  { label: 'Reports', to: '/reports', icon: 'bi-bar-chart' },
  { label: 'Settings', to: '/settings', icon: 'bi-gear' },
]

export interface SidebarProps {
  /** Collapsed (icon-only) state on desktop. */
  isCollapsed: boolean
  /** Open state for the mobile drawer. */
  isMobileOpen: boolean
  /** Called when a nav item is clicked (used to close the mobile drawer). */
  onNavigate: () => void
}

/**
 * Application sidebar with brand, placeholder navigation, and support for
 * a collapsed (icon-only) desktop state and a slide-in mobile drawer.
 */
export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onNavigate,
}: SidebarProps) {
  const sidebarClasses = [
    'orbit-sidebar',
    isCollapsed ? 'is-collapsed' : '',
    isMobileOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={sidebarClasses}>
      <div className="orbit-sidebar__brand">
        <i className="bi bi-rocket-takeoff-fill text-primary fs-5" />
        {!isCollapsed && <span>Orbit 2.0</span>}
      </div>

      <nav className="orbit-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="orbit-nav-link"
            onClick={onNavigate}
            title={isCollapsed ? item.label : undefined}
          >
            <i className={`bi ${item.icon} fs-5`} />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
