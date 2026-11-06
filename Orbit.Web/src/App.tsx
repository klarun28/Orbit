import { AuthProvider } from './context/AuthProvider'
import { AppRoutes } from './routes/AppRoutes'

/**
 * Application root.
 * AuthProvider supplies authentication state to the whole app; all routing
 * is centralized in AppRoutes.
 */
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
