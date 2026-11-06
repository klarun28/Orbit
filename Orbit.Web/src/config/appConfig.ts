import { DEFAULT_REQUEST_TIMEOUT } from '../utils/constants'

/**
 * Central place to read environment configuration.
 *
 * All access to `import.meta.env` should go through this file so that
 * environment variables are never scattered/hardcoded across components.
 * Values come from .env.development / .env.production.
 */

export const appConfig = {
  /** Display name of the application. */
  appName: import.meta.env.VITE_APP_NAME ?? 'Orbit 2.0',

  /** Base URL of the backend API. Configured per environment, never hardcoded. */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',

  /** Default HTTP request timeout (ms) for the Axios client. */
  apiTimeout: DEFAULT_REQUEST_TIMEOUT,
} as const

export type AppConfig = typeof appConfig
