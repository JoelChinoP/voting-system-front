/**
 * @description this type defines the possible roles a user can have in the application.
 * @property {string} admin - Represents an administrator role with full access.
 * @property {string} user - Represents a regular user role with limited access.
 */
export type Role = 'admin' | 'user';

/**
 * @description This interface represents the context type for authentication.
 * @interface AuthContextType
 * @property {UserPayload | null} user - The current user object or null if not authenticated.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {() => void} logout - Function to log out the user.
 */
interface AuthContextType {
  user: UserPayload | null;
  isAuthenticated: boolean;
  logout: () => void;
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