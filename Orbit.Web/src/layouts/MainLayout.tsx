import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'

const MOBILE_QUERY = '(max-width: 767.98px)'

/**
 * The main application shell for authenticated pages:
 * collapsible sidebar + header + scrollable content + footer.
 *
 * - On desktop, the toggle collapses the sidebar to an icon-only rail.
 * - On mobile, the same toggle opens the sidebar as a slide-in drawer.
 *
 * Routed pages are rendered via <Outlet />.
 */
export function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Keep the two sidebar modes from interfering when the viewport crosses the
  // mobile breakpoint: reset the collapsed rail on mobile and close the drawer
  // on desktop.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const sync = (matches: boolean) => {
      if (matches) {
        setIsCollapsed(false)
      } else {
        setIsMobileOpen(false)
      }
    }
    sync(mql.matches)
    const handler = (e: MediaQueryListEvent) => sync(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // The header toggle collapses on desktop and opens the drawer on mobile.
  const handleToggleSidebar = () => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches
    if (isMobile) {
      setIsMobileOpen((open) => !open)
    } else {
      setIsCollapsed((collapsed) => !collapsed)
    }
  }

  const closeMobileSidebar = () => setIsMobileOpen(false)

  return (
    <div className="orbit-shell">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onNavigate={closeMobileSidebar}
      />

      {/* Dimmed backdrop behind the mobile drawer. */}
      {isMobileOpen && (
        <div className="orbit-sidebar-backdrop" onClick={closeMobileSidebar} />
      )}

      <div className="orbit-main">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="orbit-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
