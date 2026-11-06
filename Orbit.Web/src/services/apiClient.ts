import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'
import { appConfig } from '../config/appConfig'
import { tokenService } from './tokenService'
import { ROUTES } from '../routes/routeConfig'
import type { ApiError } from '../types/api'

/**
 * Centralized Axios instance for all backend communication.
 *
 * Every feature service imports this ONE configured client, so base URL,
 * timeout, headers, auth, and error handling are defined in a single place
 * and never duplicated per module.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* --------------------------- Request interceptor --------------------------- */
/**
 * Attaches the JWT Bearer token (if present) to every outgoing request.
 * The actual login that produces the token is implemented later; this simply
 * forwards whatever token the tokenService holds.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

/* -------------------------- Response interceptor --------------------------- */
/**
 * Centralized response/error handling:
 *  - Passes successful responses straight through.
 *  - On 401 Unauthorized: clears the token and redirects to login.
 *  - Normalizes every error into a consistent ApiError shape so callers get
 *    predictable `{ status, message }` instead of raw Axios errors.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0

    // Handle expired / invalid session.
    if (status === 401) {
      tokenService.clearToken()
      // Avoid redirect loops if we're already on the login page.
      if (window.location.pathname !== ROUTES.login) {
        window.location.assign(ROUTES.login)
      }
    }

    const normalized: ApiError = {
      status,
      message: resolveErrorMessage(error),
    }

    return Promise.reject(normalized)
  },
)

/** Produces a human-readable message from an Axios error. */
function resolveErrorMessage(error: AxiosError<{ message?: string }>): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.'
  }
  if (error.response) {
    return `Request failed with status ${error.response.status}.`
  }
  return 'Unable to reach the server. Check your connection.'
}
