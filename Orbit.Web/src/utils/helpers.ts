/**
 * Small, pure, reusable helper functions.
 * Keep these generic and side-effect free so they are easy to test and reuse.
 */

/** Returns true if a string is null, undefined, or only whitespace. */
export function isBlank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim().length === 0
}

/** Capitalizes the first letter of a string. */
export function capitalize(value: string): string {
  if (value.length === 0) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}
