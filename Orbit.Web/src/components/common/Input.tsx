import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

/** Props for the reusable Input. Extends native <input> attributes. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label shown above the input. */
  label?: string
  /** Validation/error message shown below the input. */
  error?: string
  /** Optional Bootstrap Icon class shown inside the field, e.g. "bi-envelope". */
  icon?: string
  /** Marks the field as required (adds a visual asterisk). */
  required?: boolean
}

/**
 * A labelled, reusable text input built on Bootstrap form styles.
 * Supports an inline icon, error state, and accessible label linking.
 */
export function Input({
  label,
  error,
  icon,
  required = false,
  id,
  className = '',
  ...rest
}: InputProps) {
  // Generate a stable id so the label is linked to the input for accessibility.
  const generatedId = useId()
  const inputId = id ?? generatedId

  const controlClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label fw-medium">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      {icon ? (
        <div className="input-group">
          <span className="input-group-text">
            <i className={`bi ${icon}`} />
          </span>
          <input
            id={inputId}
            className={controlClasses}
            required={required}
            {...rest}
          />
        </div>
      ) : (
        <input
          id={inputId}
          className={controlClasses}
          required={required}
          {...rest}
        />
      )}

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  )
}
