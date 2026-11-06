import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../features/auth/authService'
import { tokenService } from '../services/tokenService'
import type { AuthStatus, AuthUser, LoginCredentials } from '../features/auth/authTypes'
import { AuthContext, type AuthContextValue } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provides application-wide authentication state (status, user) and the
 * login/logout actions. Wrap the app with this once (above the router).
 *
 * On startup it checks for an existing token and attempts to restore the
 * session. Because authService is not wired to the backend yet, that restore
 * currently resolves to "unauthenticated" — this will work end-to-end once
 * the API contract is implemented inside authService.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('unknown')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount: restore session if a token exists.
  useEffect(() => {
    let isMounted = true

    const restore = async () => {
      if (!tokenService.hasToken()) {
        if (isMounted) {
          setStatus('unauthenticated')
          setIsLoading(false)
        }
        return
      }

      try {
        const currentUser = await authService.getCurrentUser()
        if (isMounted) {
          setUser(currentUser)
          setStatus('authenticated')
        }
      } catch {
        /*
         * authService is not wired to the backend yet, so getCurrentUser
         * throws. To keep the UI demo working while a token is present, we
         * fall back to a placeholder user and treat the session as valid.
         *
         * TEMPORARY: once the real contract is implemented, remove this
         * fallback and instead clear the token on failure:
         *   tokenService.clearToken(); setStatus('unauthenticated')
         */
        if (isMounted) {
          setUser({ id: 'guest', username: 'guest', displayName: 'Guest User' })
          setStatus('authenticated')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void restore()
    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const result = await authService.login(credentials)
      tokenService.setToken(result.token)
      setUser(result.user)
      setStatus('authenticated')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isAuthenticated: status === 'authenticated',
      isLoading,
      user,
      login,
      logout,
    }),
    [status, isLoading, user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
