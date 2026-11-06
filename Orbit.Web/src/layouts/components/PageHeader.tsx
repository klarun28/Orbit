import type { ReactNode } from 'react'

/** Props for the reusable PageHeader. */
export interface PageHeaderProps {
  /** Main page title. */
  title: string
  /** Optional supporting text shown under the title. */
  subtitle?: string
  /** Optional Bootstrap Icon class shown before the title, e.g. "bi-people". */
  icon?: string
  /** Optional actions (e.g. buttons) shown on the right. */
  actions?: ReactNode
}

/**
 * A consistent page header: title, optional subtitle/icon, and an
 * actions area on the right. Place it at the top of a page's content.
 */
export function PageHeader({ title, subtitle, icon, actions }: PageHeaderProps) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div className="d-flex align-items-center gap-2">
        {icon && <i className={`bi ${icon} fs-4 text-primary`} />}
        <div>
          <h1 className="orbit-page-title">{title}</h1>
          {subtitle && (
            <p className="orbit-text-muted small mb-0">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="d-flex gap-2">{actions}</div>}
    </div>
  )
}
