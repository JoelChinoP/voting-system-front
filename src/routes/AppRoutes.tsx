import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, LoginPage } from '@/pages'
import { ErrorPage } from '@/components/404'
import { ProtectedRoute } from '@/auth'
import { Role } from '@/types/auth'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas públicas... */}

        {/* Rutas protegidas por autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Rutas protegidas por rol */}
        <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]} />}>
          {/* <Route path="/admin" element={<AdminPage />} /> */}
        </Route>

        {/* Rutas para errores */}
        <Route path="/forbidden" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}