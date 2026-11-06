import { AUTH_TOKEN_KEY } from '../utils/constants'

/**
 * Centralized access to the authentication token.
 *
 * Keeping all token read/write/clear logic here means the storage mechanism
 * (currently localStorage) can be changed in ONE place without touching the
 * rest of the app. The Axios client and auth flow depend on this service.
 */
export const tokenService = {
  /** Returns the stored access token, or null if none. */
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  /** Stores the access token. */
  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  /** Removes the stored access token. */
  clearToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },

  /** Convenience check for whether a token is present. */
  hasToken(): boolean {
    return Boolean(this.getToken())
  },
}
