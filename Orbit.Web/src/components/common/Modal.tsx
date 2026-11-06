import type { ReactNode } from 'react'
import { useEffect } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg'

/** Props for the reusable Modal. */
export interface ModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean
  /** Called when the user requests to close (X, backdrop click, or Escape). */
  onClose: () => void
  /** Modal title shown in the header. */
  title: string
  /** Modal body content. */
  children: ReactNode
  /** Optional footer content (e.g. action buttons). */
  footer?: ReactNode
  /** Size of the modal dialog. Defaults to 'md'. */
  size?: ModalSize
}

const sizeClassMap: Record<ModalSize, string> = {
  sm: 'modal-sm',
  md: '',
  lg: 'modal-lg',
}

/**
 * A React-controlled modal dialog built on Bootstrap's modal markup.
 * Visibility is driven purely by the `isOpen` prop (no Bootstrap JS data API),
 * which keeps behavior predictable in React.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="modal fade show d-block"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${sizeClassMap[size]}`}
          // Stop clicks inside the dialog from closing it via the backdrop handler.
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}
