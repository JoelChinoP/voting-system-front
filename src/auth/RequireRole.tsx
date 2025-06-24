import { useAuth } from "@/hooks/useAuth";
import type { RequireRoleProps } from "@/types/auth";

/**
 * @description Renders children only if user has one of the required roles.
 */
export function RequireRole({ roles, children, fallback = null }: RequireRoleProps) {
  const { user } = useAuth();
  if (user && roles.includes(user.role)) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}