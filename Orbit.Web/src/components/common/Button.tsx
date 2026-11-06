import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Visual style of the button, mapped to Bootstrap button variants. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'outline'

export type ButtonSize = 'sm' | 'md' | 'lg'

/** Props for the reusable Button. Extends native <button> attributes. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label / content. */
  children: ReactNode
  /** Visual variant. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Size. Defaults to 'md'. */
  size?: ButtonSize
  /** Shows a spinner and disables the button while true. */
  isLoading?: boolean
  /** Optional Bootstrap Icon class, e.g. "bi-plus-lg". */
  icon?: string
  /** Stretch to full width of the parent. */
  fullWidth?: boolean
}

/** Maps our variant names to Bootstrap button classes. */
const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'btn-orbit-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  danger: 'btn-danger',
  outline: 'btn-outline-secondary',
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

/**
 * A themed, reusable button built on Bootstrap.
 * Handles loading state, icons, sizing, and full-width layout.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'btn',
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? 'w-100' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}
      {!isLoading && icon && <i className={`bi ${icon} me-2`} />}
      {children}
    </button>
  )
}
