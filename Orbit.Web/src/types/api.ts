/**
 * Generic API-related types shared across features.
 *
 * NOTE: These are intentionally generic placeholders. The real response
 * shapes will be defined per feature once the backend API contract is known.
 * Do not hardcode endpoint-specific models here.
 */

/** Standard wrapper many APIs use for a single payload. */
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

/** Standard wrapper for paginated list responses. */
export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
}

/** Normalized error shape produced by the Axios client (added in a later step). */
export interface ApiError {
  status: number
  message: string
}
