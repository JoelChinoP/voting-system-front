import { useAuth } from '@/hooks/useAuth'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth()

  return isAuthenticated ? <Authorized /> : <Unauthorized />
}
