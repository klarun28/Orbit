import { apiClient } from '../../services/apiClient'
import { tokenService } from '../../services/tokenService'
import type { AuthResult, AuthUser, LoginCredentials } from './authTypes'

/**
 * Authentication service — the single integration point with the backend
 * auth API. It uses the shared `apiClient`, so JWT headers, timeouts, and
 * 401 handling are applied automatically.
 *
 * IMPORTANT: The actual requests are NOT implemented yet because the backend
 * ASP.NET Core JWT API contract is unknown. Each method is stubbed to throw
 * until the real endpoints and payload shapes are provided. Wiring them up is
 * intended to be a small, localized change inside this one file.
 */
export const authService = {
  /**
   * Exchange credentials for a session.
   *
   * TODO (after contract review): call the real login endpoint, e.g.
   *   const { data } = await apiClient.post<AuthResult>(
   *     API_ENDPOINTS.auth.login, credentials)
   *   tokenService.setToken(data.token)
   *   return data
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    void credentials
    void apiClient
    throw new Error(
      'authService.login is not implemented yet — pending backend API contract.',
    )
  },

  /**
   * End the session. Clears the local token. A backend logout/invalidate
   * call can be added here once the contract is known.
   */
  async logout(): Promise<void> {
    tokenService.clearToken()
  },

  /**
   * Load the current user for an existing session (e.g. on app start / page
   * refresh when a token is present).
   *
   * TODO (after contract review): call the "me"/profile endpoint, e.g.
   *   const { data } = await apiClient.get<AuthUser>(API_ENDPOINTS.auth.me)
   *   return data
   */
  async getCurrentUser(): Promise<AuthUser> {
    void apiClient
    throw new Error(
      'authService.getCurrentUser is not implemented yet — pending backend API contract.',
    )
  },
}
