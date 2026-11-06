/** Props for the reusable Loader (spinner). */
export interface LoaderProps {
  /** Optional text shown next to/under the spinner. */
  label?: string
  /** Spinner size. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg'
  /** Fill and center within the parent's full height. */
  fullScreen?: boolean
}

const sizeStyleMap: Record<NonNullable<LoaderProps['size']>, string> = {
  sm: '1rem',
  md: '2rem',
  lg: '3rem',
}

/**
 * A reusable loading spinner. Use inline for small areas, or with
 * fullScreen to center it within a page/container.
 */
export function Loader({ label, size = 'md', fullScreen = false }: LoaderProps) {
  const dimension = sizeStyleMap[size]

  const spinner = (
    <div className="d-flex flex-column align-items-center gap-2">
      <div
        className="spinner-border text-primary"
        style={{ width: dimension, height: dimension }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {label && <span className="orbit-text-muted small">{label}</span>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100 py-5">
        {spinner}
      </div>
    )
  }

  return spinner
}
