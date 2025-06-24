import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorPage } from '@/components/404'

import HomePage from '@/pages/HomePage'

export default function Authorized() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas dentro del layout */}
        <Route path="/" /* element={<Layout />} */>
          {/* Rutas anidadas dentro del layout */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="login" element={<Navigate to="/" />} />

          {/* Otras rutas aquí */}

        </Route>

        {/* Ruta para 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
