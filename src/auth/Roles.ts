/**
 * @description this type defines the possible roles a user can have in the application.
 * @const {string} Role
 * @property {string} ADMIN - Represents an administrator role with full access.
 * @property {string} USER - Represents a regular user role with limited access.
 */
export const Role = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = typeof Role[keyof typeof Role];