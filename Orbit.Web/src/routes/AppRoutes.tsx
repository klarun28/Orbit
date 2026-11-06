import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { Login } from '../features/auth/pages/Login'
import { ForgotPassword } from '../features/auth/pages/ForgotPassword'
import { Dashboard } from '../features/dashboard/pages/Dashboard'
import { NotFound } from '../components/common'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './routeConfig'

/**
 * Centralized application routing.
 *
 * Route groups:
 *  - Public routes use AuthLayout (e.g. Login).
 *  - Protected routes are guarded by ProtectedRoute and use MainLayout.
 *  - Any unmatched path renders the NotFound page.
 */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login has its own full split-screen layout */}
        <Route path={ROUTES.login} element={<Login />} />

        {/* Other public auth pages use the centered AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
        </Route>

        {/* Protected routes (guard + MainLayout) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
          </Route>
        </Route>

        {/* Root redirect → dashboard (guard will bounce to login if needed) */}
        <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />

        {/* 404 fallback */}
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
