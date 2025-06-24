/**
 * @description this type defines the possible roles a user can have in the application.
 * @enum {string} Role
 * @property {string} ADMIN - Represents an administrator role with full access.
 * @property {string} USER - Represents a regular user role with limited access.
 */
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * @description This interface represents the context type for authentication.
 * @interface AuthContextType
 * @property {UserPayload | null} user - The current user object or null if not authenticated.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {() => void} logout - Function to log out the user.
 */
export interface AuthContextType {
  user: UserPayload | null;
  isAuthenticated: boolean;
  logout: () => void;
}

/**
 * @description This interface represents the user object returned from the API.
 * @interface AuthResponse
 * @property {boolean} success - Indicates if the authentication was successful.
 * @property {string} message - A message from the server, usually for error handling.
 * @property {string} [token] - The authentication token, if the authentication was successful.
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
}

/** 
 * @description This interface represents the payload structure for user authentication.
 * @interface UserPayload
 * @property {string} id - The unique identifier for the user.
 * @property {Role} role - The role of the user, which can be 'admin' or 'user'.
 * @property {string} email - The email address of the user.
*/
export interface UserPayload {
  id: string;
  role: Role;
  email: string;
}

/**
 * @description This interface defines the properties for the RequireRole component.
 * @interface RequireRoleProps
 * @property {Role[]} roles - An array of roles that are allowed to access the children.
 * @property {ReactNode} children - The content to render if the user has one of
 * @property {ReactNode} [fallback] - Optional fallback content to render if the user does not have the required roles.
 */
export interface RequireRoleProps {
  roles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * @description This interface defines the properties for the ProtectedRoute component.
 * @interface ProtectedRouteProps
 * @property {Role[]} [allowedRoles] - An optional array of roles that are allowed to access the route.
 * @property {string} [redirectTo] - The path to redirect to if the user
 */
interface ProtectedRouteProps {
  allowedRoles?: Role[]
  redirectTo?: string
}