import { createContext } from 'react'
import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
} from '../features/auth/authTypes'

/**
 * Shape of the application-wide authentication context.
 * Components consume this via the `useAuth` hook.
 */
export interface AuthContextValue {
  /** Current authentication status. */
  status: AuthStatus
  /** Convenience flag derived from status. */
  isAuthenticated: boolean
  /** True while an auth operation (startup check / login) is in progress. */
  isLoading: boolean
  /** The signed-in user, or null when not authenticated. */
  user: AuthUser | null
  /** Perform a login. Resolves on success, throws on failure. */
  login: (credentials: LoginCredentials) => Promise<void>
  /** Log out and clear the session. */
  logout: () => Promise<void>
}

/**
 * The context is created with `undefined` as the default so that consuming
 * it outside of <AuthProvider> is caught early (see the useAuth hook).
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
