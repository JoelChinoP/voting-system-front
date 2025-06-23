import { useAuth } from './useAuth';

export function useRole(allowedRoles: string | string[]) {
  const { user } = useAuth();
  if (!user) return false;
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(user.role);
  }
  return user.role === allowedRoles;
}