/**
 * Shared TypeScript types used across the whole application.
 * Put domain-agnostic, reusable types here (not feature-specific ones).
 */

/** A value that may or may not be present. */
export type Nullable<T> = T | null

/** Generic key/value option used by selects, dropdowns, etc. */
export interface SelectOption<T = string> {
  label: string
  value: T
}

/** Common loading/error UI state for async operations. */
export interface RequestState {
  isLoading: boolean
  error: Nullable<string>
}
