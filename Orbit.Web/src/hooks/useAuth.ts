import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from '../context/AuthContext'

/**
 * Access the application-wide authentication state and actions.
 *
 * Must be used within an <AuthProvider>. Throwing here gives a clear error
 * instead of silently returning undefined if the provider is missing.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
