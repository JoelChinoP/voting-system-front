import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { getCurrentUser, isTokenValid, logout } from '@/services/auth-service'
import type { UserPayload, AuthContextType } from '@/types/auth'
import { AuthContext } from './AuthContext'
import { TOKEN_KEY } from '../services/auth-service';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null)
  const [loading, setLoading] = useState(true)

  // Verifica y actualiza el estado del usuario
  const checkAuthState = useCallback(() => setUser(getCurrentUser()), [])

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logout()
    setUser(null)
    window.dispatchEvent(new Event('authChanged')) // Disparar evento global
  }

  // Verifica el estado de autenticación al montar el componente
  useEffect(() => {
    // Al montar el componente
    checkAuthState()
    setLoading(false)

    // Intervalo para verificar cada 1 minuto (60000 ms)
    const authCheckInterval = setInterval(() => {
      if (!isTokenValid()) setUser(null)
    }, 60000)

    // Evento personalizado para cambios de auth
    window.addEventListener('authChanged', checkAuthState)

    // Detectar cambios en localStorage entre pestañas
    const handleStorage = (e: StorageEvent) => e.key === TOKEN_KEY && checkAuthState()
    window.addEventListener('storage', handleStorage)

    // Verificar al enfocar la ventana
    window.addEventListener('focus', checkAuthState)

    return () => {
      clearInterval(authCheckInterval)
      window.removeEventListener('authChanged', checkAuthState)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', checkAuthState)
    }
  }, [checkAuthState])

  const data: AuthContextType = {
    user,
    isAuthenticated: !!user,
    logout: handleLogout,
  }

  return (
    <AuthContext.Provider value={data}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  )
}
