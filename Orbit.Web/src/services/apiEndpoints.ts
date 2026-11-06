/**
 * Centralized API endpoint paths.
 *
 * Paths are relative to `apiBaseUrl` (configured in appConfig / .env).
 * Grouping them here keeps feature services free of hardcoded URL strings.
 *
 * IMPORTANT: No real backend endpoints are defined yet. The actual paths
 * will be added here once the backend API contract is provided. The entries
 * below are intentionally empty placeholders showing the intended shape.
 *
 * Example of how this will look once the contract is known:
 *   auth: {
 *     login: '/auth/login',
 *     refresh: '/auth/refresh',
 *   },
 *   employees: {
 *     list: '/employees',
 *     byId: (id: string) => `/employees/${id}`,
 *   },
 */
export const API_ENDPOINTS = {
  auth: {
    // login: '',        // TODO: set once API contract is known
    // forgotPassword: '',
  },
  dashboard: {
    // summary: '',
  },
} as const
