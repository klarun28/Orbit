import { Button } from '../../../components/common'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useAuth } from '../../../hooks/useAuth'
import { ROUTES } from '../../../routes/routeConfig'

/** Shape of a summary metric card. */
interface SummaryCard {
  label: string
  value: string
  delta: string
  isPositive: boolean
  icon: string
  tone: string // Bootstrap subtle background tone
}

/** Dummy summary data (frontend only — no API). */
const summaryCards: SummaryCard[] = [
  {
    label: 'Active Shipments',
    value: '1,284',
    delta: '+8.2%',
    isPositive: true,
    icon: 'bi-box-seam',
    tone: 'primary',
  },
  {
    label: 'In Transit',
    value: '642',
    delta: '+3.1%',
    isPositive: true,
    icon: 'bi-truck',
    tone: 'info',
  },
  {
    label: 'Delivered (30d)',
    value: '9,517',
    delta: '+12.4%',
    isPositive: true,
    icon: 'bi-check2-circle',
    tone: 'success',
  },
  {
    label: 'Delayed',
    value: '37',
    delta: '-1.8%',
    isPositive: false,
    icon: 'bi-exclamation-triangle',
    tone: 'warning',
  },
]

/** Dummy recent bookings (frontend only — no API). */
const recentBookings = [
  { id: 'ORB-10482', route: 'Shanghai → Rotterdam', mode: 'Sea', status: 'In Transit' },
  { id: 'ORB-10481', route: 'Dubai → Mumbai', mode: 'Air', status: 'Booked' },
  { id: 'ORB-10479', route: 'Hamburg → New York', mode: 'Sea', status: 'Delivered' },
  { id: 'ORB-10476', route: 'Singapore → Sydney', mode: 'Air', status: 'In Transit' },
]

const statusBadge: Record<string, string> = {
  'In Transit': 'text-bg-info',
  Booked: 'text-bg-secondary',
  Delivered: 'text-bg-success',
  Delayed: 'text-bg-warning',
}

/**
 * Dashboard for the Orbit 2.0 logistics portal.
 * Frontend UI with dummy data only — no backend connection.
 */
export function Dashboard() {
  const { user, logout } = useAuth()

  // Logout via the auth context, then return to login.
  const handleLogout = () => {
    void logout().then(() => window.location.assign(ROUTES.login))
  }

  const displayName = user?.displayName ?? user?.username ?? 'Guest'

  return (
    <>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        subtitle="Here's what's happening across your shipments today."
        icon="bi-speedometer2"
        actions={
          <>
            <Button icon="bi-plus-lg">New Booking</Button>
            <Button variant="outline" icon="bi-box-arrow-right" onClick={handleLogout}>
              Logout
            </Button>
          </>
        }
      />

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        {summaryCards.map((card) => (
          <div className="col-12 col-sm-6 col-xl-3" key={card.label}>
            <div className="orbit-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span
                  className={`rounded d-inline-flex align-items-center justify-content-center bg-${card.tone}-subtle text-${card.tone}`}
                  style={{ width: 44, height: 44, fontSize: '1.25rem' }}
                >
                  <i className={`bi ${card.icon}`} />
                </span>
                <span
                  className={`small fw-semibold ${
                    card.isPositive ? 'text-success' : 'text-danger'
                  }`}
                >
                  <i
                    className={`bi ${
                      card.isPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'
                    } me-1`}
                  />
                  {card.delta}
                </span>
              </div>
              <div className="h3 fw-bold mb-0">{card.value}</div>
              <div className="orbit-text-muted small">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="orbit-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h6 fw-semibold mb-0">Recent Bookings</h2>
          <a href="#" className="small fw-medium" onClick={(e) => e.preventDefault()}>
            View all
          </a>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="orbit-text-muted small">
                <th scope="col">Booking ID</th>
                <th scope="col">Route</th>
                <th scope="col">Mode</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td className="fw-medium">{b.id}</td>
                  <td>{b.route}</td>
                  <td>
                    <i
                      className={`bi ${
                        b.mode === 'Air' ? 'bi-airplane' : 'bi-water'
                      } me-1 orbit-text-muted`}
                    />
                    {b.mode}
                  </td>
                  <td>
                    <span className={`badge ${statusBadge[b.status] ?? 'text-bg-secondary'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
