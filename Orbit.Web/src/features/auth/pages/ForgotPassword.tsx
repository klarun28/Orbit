import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '../../../components/common'
import { ROUTES } from '../../../routes/routeConfig'

/**
 * Forgot Password page (UI only).
 * Shows a simple email form and a success message. No backend call.
 */
export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center">
        <i className="bi bi-envelope-check text-success display-5" />
        <h2 className="h5 mt-3 mb-2">Check your email</h2>
        <p className="orbit-text-muted small mb-4">
          If an account exists, we&apos;ve sent password reset instructions.
        </p>
        <Link className="btn btn-orbit-primary w-100" to={ROUTES.login}>
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="h5 fw-bold mb-1 text-center">Reset your password</h2>
      <p className="orbit-text-muted small text-center mb-4">
        Enter your email and we&apos;ll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          icon="bi-envelope"
          placeholder="you@example.com"
          required
        />
        <Button type="submit" fullWidth icon="bi-send">
          Send reset link
        </Button>
      </form>

      <div className="text-center mt-3">
        <Link to={ROUTES.login} className="small">
          <i className="bi bi-arrow-left me-1" />
          Back to sign in
        </Link>
      </div>
    </>
  )
}
