/**
 * Verifica si un email tiene un formato válido.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("El email no tiene un formato válido.");
  return true;
}

/**
 * Verifica que todos los campos no estén vacíos.
 */
export function isNotEmpty(...fields: string[]): boolean {
  if (fields.some(field => field.trim() === "")) {
    throw new Error("Todos los campos son obligatorios.");
  }
  return true;
}

/**
 * Valida que una contraseña cumpla criterios básicos de seguridad.
 * - Al menos 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Al menos un número
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres.");
  if (!/[A-Z]/.test(password)) throw new Error("La contraseña debe contener al menos una letra mayúscula.");
  if (!/[a-z]/.test(password)) throw new Error("La contraseña debe contener al menos una letra minúscula.");
  if (!/\d/.test(password)) throw new Error("La contraseña debe contener al menos un número.");

  return true;
}

