import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/common'
import { ROUTES } from '../../../routes/routeConfig'
import { tokenService } from '../../../services/tokenService'

/**
 * Login page for the Orbit 2.0 international logistics portal.
 *
 * Professional split-screen UI: a branded logistics panel on the left and
 * the sign-in form on the right. This is FRONTEND ONLY — "Sign in" stores a
 * placeholder token and navigates to the dashboard. No backend call and no
 * assumption about any JWT/API response shape.
 */
export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /*
     * TEMPORARY placeholder sign-in (frontend only).
     * Stores a placeholder token, then navigates with a full load so the
     * AuthProvider re-runs its startup session restore and marks the context
     * as authenticated.
     *
     * Once the backend contract is implemented, replace this with:
     *   await login({ username, password, rememberMe })
     *   navigate(ROUTES.dashboard)
     * using the `login` action from useAuth().
     */
    tokenService.setToken('placeholder-token')
    window.location.assign(ROUTES.dashboard)
  }

  return (
    <div className="orbit-auth-split">
      {/* Left: branded logistics panel */}
      <div className="orbit-auth-split__brand">
        <div className="d-flex align-items-center gap-2 fs-4 fw-bold">
          <i className="bi bi-rocket-takeoff-fill" />
          Orbit 2.0
        </div>

        <div>
          <h1 className="display-6 fw-bold mb-3">
            Move the world,
            <br />
            one shipment at a time.
          </h1>
          <p className="mb-4 opacity-75">
            The international logistics portal for booking, tracking and
            managing shipments across the globe.
          </p>

          <div className="orbit-auth-feature">
            <i className="bi bi-box-seam" />
            <span>Book and manage shipments in minutes</span>
          </div>
          <div className="orbit-auth-feature">
            <i className="bi bi-geo-alt" />
            <span>Real-time tracking across every route</span>
          </div>
          <div className="orbit-auth-feature">
            <i className="bi bi-shield-check" />
            <span>Secure, enterprise-grade platform</span>
          </div>
        </div>

        <p className="small opacity-50 mb-0">
          © {new Date().getFullYear()} Orbit Logistics. All rights reserved.
        </p>
      </div>

      {/* Right: sign-in form */}
      <div className="orbit-auth-split__form">
        <div className="orbit-auth-split__form-inner">
          {/* Compact brand for small screens where the panel is hidden */}
          <div className="text-center mb-4 d-lg-none">
            <i className="bi bi-rocket-takeoff-fill text-primary display-6" />
            <h1 className="h4 mt-2 mb-0">Orbit 2.0</h1>
          </div>

          <h2 className="h3 fw-bold mb-1">Welcome back</h2>
          <p className="orbit-text-muted mb-4">
            Sign in to your logistics dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-medium">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person" />
                </span>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password with show/hide */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="input-group-text bg-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
            </div>

            {/* Remember me + forgot password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check mb-0">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember me
                </label>
              </div>
              <Link to={ROUTES.forgotPassword} className="small fw-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth icon="bi-box-arrow-in-right">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
