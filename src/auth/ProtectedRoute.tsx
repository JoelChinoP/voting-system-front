import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { ProtectedRouteProps } from '@/types/auth'

/**
 * @description Protects a route based on user authentication and role.
 * If allowedRoles is not provided, only checks if authenticated.
 */
export function ProtectedRoute({ allowedRoles, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    // Si el usuario está autenticado pero no tiene el rol requerido, mostrar 403 o redirigir
    return <Navigate to="/forbidden" replace />
  }

  return <Outlet />
}