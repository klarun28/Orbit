/**
 * Centralized route path definitions.
 *
 * Every route path lives here as a constant so there are no magic strings
 * scattered across the app. Import from here when linking or navigating.
 */
export const ROUTES = {
  // Public
  login: '/login',
  forgotPassword: '/forgot-password',

  // Protected
  dashboard: '/dashboard',

  // Fallback
  notFound: '*',
} as const

/** Union type of all defined route paths. */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
