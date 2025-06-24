import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage, LoginPage } from '@/pages'
import { ErrorPage } from '@/components/404'
import { ProtectedRoute } from '@/auth'
import { Role } from '@/auth'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas públicas... */}
        {/* <Route path="home" element={<Navigate to="/" />} /> */}

        {/* Rutas protegidas por autenticación */}
        <Route element={<ProtectedRoute />}>
          {/* Rutas de acceso público con autentitación */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="login" element={<Navigate to="/" />} />
        </Route>

        {/* Rutas protegidas por rol */}
        <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]} />}>
          {/* <Route path="/admin" element={<AdminPage />} /> */}
        </Route>

        {/* Rutas para errores */}
        <Route path="/forbidden" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/forbidden" />} />
      </Routes>
    </BrowserRouter>
  )
}