import api from './api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { UserPayload, AuthResponse } from '@/types/auth';
import { isNotEmpty, isValidEmail } from '@/utils/validators';

// Obtener la duración del token de variables de entorno o usar 1 hora por defecto
const TOKEN_EXPIRY_HOURS = Number(import.meta.env.VITE_TOKEN_EXPIRED) || 1;
export const TOKEN_KEY = 'token';

/**
 * Establece el token en una cookie con configuraciones de seguridad
 */
const setAuthToken = (token: string) => { 
  Cookies.set(TOKEN_KEY, token, {
    secure: true, // Solo HTTPS
    sameSite: 'strict', // Previene CSRF
    expires: TOKEN_EXPIRY_HOURS / 24, // Expira en horas (ej: 1 hora = 1/24)
    path: '/', // Accesible en todo el sitio
    // httpOnly: true, // No accesible por JavaScript (Nota: js-cookie no puede establecer cookies HttpOnly, requiere configuración del servidor)
  });
  window.dispatchEvent(new Event('authChanged')); // 🔥 Disparar evento global
};

/**
 * Autentica al usuario y guarda el token
 */
export const login = async (email: string, password: string): Promise<string> => {
  // Validar campos antes de enviar la solicitud
  isNotEmpty(email, password); // Check if email and password are not empty
  isValidEmail(email);        // Validate email format

  return await api.post<AuthResponse>('/auth/login', { email, password })
    .then(({ token }) => {
      setAuthToken(token);
      return token;
    })
    .catch((error) => {
      throw new Error(error instanceof Error ? error.message : 'Error al autenticar');
    });
};

/**
 * Autentica al usuario con Google y guarda el token
 */
export const loginWithGoogle = async (code: string): Promise<string> => {
  return await api.post<AuthResponse>(`/auth/google/callback?code=${code}`)
    .then(({ token }) => {
      setAuthToken(token);
      return token;
    })
    .catch((error) => {
      throw new Error(error instanceof Error ? error.message : 'Error al autenticar con Google');
    });
};

/**
 * Obtiene el usuario actual desde el token
 */
export const getCurrentUser = (): UserPayload | null => {
  const token = Cookies.get(TOKEN_KEY);
  if (!token) return null;
  
  try {
    // Verificar si el token ha expirado
    const { exp, ...payload } = jwtDecode<UserPayload & { exp: number }>(token);
    return exp < Date.now() / 1000 ? (logout(), null) : payload;
  } catch (error) {
    console.error('Error decodificando token:', error);
    logout(); // Eliminar token inválido
    return null;
  }
};

/**
 * Elimina el token y cierra la sesión del usuario
 */
export const logout = () => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
};

/**
 * Verifica si el token actual es válido
 */
export const isTokenValid = (): boolean => {
  return getCurrentUser() !== null;
};

