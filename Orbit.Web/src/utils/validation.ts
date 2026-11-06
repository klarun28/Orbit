/**
 * Reusable validation helpers for forms and inputs.
 * These are UI-side checks only; the backend remains the source of truth.
 */

/** Basic email format check. */
export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

/** Checks a value meets a minimum length after trimming. */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min
}
