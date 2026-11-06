import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/common'
import { ROUTES } from './routeConfig'

/**
 * Guards protected routes using the AuthContext.
 *
 * - While the session is being restored on startup, show a loader so we don't
 *   redirect before the auth state is known.
 * - If not authenticated, redirect to login.
 * - Otherwise render the nested routes via <Outlet />.
 *
 * NOTE: Hiding a route on the frontend is NOT a security boundary — the
 * backend API remains responsible for enforcing real authorization.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loader fullScreen label="Loading..." />
  }

  if (!isAuthenticated) {
    // `replace` avoids adding the guarded URL to browser history.
    return <Navigate to={ROUTES.login} replace />
  }

  return <Outlet />
}
