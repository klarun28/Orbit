import { Button } from './Button'
import { Modal } from './Modal'

/** Props for the reusable ConfirmDialog. */
export interface ConfirmDialogProps {
  /** Whether the dialog is visible. */
  isOpen: boolean
  /** Title shown in the header. */
  title: string
  /** The confirmation question / message. */
  message: string
  /** Label for the confirm button. Defaults to 'Confirm'. */
  confirmLabel?: string
  /** Label for the cancel button. Defaults to 'Cancel'. */
  cancelLabel?: string
  /** Use a danger style for destructive actions (e.g. delete). */
  isDestructive?: boolean
  /** Shows a spinner on the confirm button while an action runs. */
  isConfirming?: boolean
  /** Called when the user confirms. */
  onConfirm: () => void
  /** Called when the user cancels or closes. */
  onCancel: () => void
}

/**
 * A reusable confirmation dialog built by composing Modal + Button.
 * Use it for actions that need a yes/no confirmation (e.g. delete).
 */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            onClick={onConfirm}
            isLoading={isConfirming}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="mb-0">{message}</p>
    </Modal>
  )
}
