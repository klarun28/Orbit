import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routeConfig'

/**
 * Shared 404 "Not Found" page shown for any unmatched route.
 */
export function NotFound() {
  return (
    <div className="orbit-auth">
      <div className="text-center">
        <i className="bi bi-compass display-1 text-primary" />
        <h1 className="display-5 mt-3 mb-2">404</h1>
        <p className="orbit-text-muted mb-4">
          The page you are looking for does not exist.
        </p>
        <Link className="btn btn-orbit-primary" to={ROUTES.dashboard}>
          <i className="bi bi-house me-2" />
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
