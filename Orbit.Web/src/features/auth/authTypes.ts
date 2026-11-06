/**
 * Authentication types.
 *
 * IMPORTANT: These are GENERIC PLACEHOLDERS. They do NOT represent the real
 * ASP.NET Core JWT API request/response structure, which is unknown at this
 * stage. Once the backend contract is reviewed, update these interfaces to
 * match the actual payloads — the rest of the auth code depends on them.
 */

/** Credentials submitted by the login form. */
export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

/**
 * The authenticated user. Fields are a reasonable placeholder set and will
 * be aligned to whatever the backend returns (claims, profile, roles, etc.).
 */
export interface AuthUser {
  id: string
  username: string
  displayName?: string
  email?: string
  roles?: string[]
}

/**
 * The result of a successful login. The real shape (token field names,
 * expiry, refresh token, user payload) comes from the backend contract.
 */
export interface AuthResult {
  token: string
  user: AuthUser
}

/** High-level authentication status for the UI/state machine. */
export type AuthStatus =
  | 'unknown' // initial, before we've checked for an existing session
  | 'authenticated'
  | 'unauthenticated'
