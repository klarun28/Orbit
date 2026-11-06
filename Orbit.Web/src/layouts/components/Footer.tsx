/**
 * Application footer shown at the bottom of the main layout.
 * Static content for now.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="orbit-footer">
      <span>© {year} Orbit 2.0 — Enterprise Application</span>
    </footer>
  )
}
