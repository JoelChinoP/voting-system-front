// api.ts - Implementación con fetch
import Cookies from 'js-cookie';
import type { RequestOptions } from '@/types/api';
import { logout, TOKEN_KEY } from './auth-service';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 5000; // 5 segundos por defecto

/**
 * * Función para realizar peticiones a la API
 * @param endpoint - URL del endpoint de la API
 * @param options 
 * @returns Promesa con la respuesta de la API
 * @throws {ApiError} - Lanza un error si la respuesta no es exitosa
 */
const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Añadir token de autorización si existe
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    credentials: options.credentials || 'same-origin',
  };

  // Añadir body si existe
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  // Añadir timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Realizar la petición
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      signal: fetchOptions.signal
    });
    clearTimeout(timeoutId); // Limpiar timeout si la respuesta llega a tiempo
    
    // Convertir respuesta a JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Manejar errores HTTP
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `Error ${response.status}: ${response.statusText}`,
        data
      );
    }
    
    return data as T;
  } catch (error) {
    // Si la solicitud fue abortada, lanzar un error específico
    if ((error as Error).name === 'AbortError') {
      throw new ApiError(0, 'La solicitud ha sido abortada debido a un tiempo de espera excedido.');
    }

    if (error instanceof ApiError) {
      if (error.status === 401) {
        logout(); // Cerrar sesión si el error es 401
        throw new ApiError(401, 'Credenciales inválidas', error.data);
      } else if (error.status === 403) {
        throw new ApiError(403, 'Acceso denegado', error.data);
      } else if (error.status === 404) {
        throw new ApiError(404, 'Recurso no encontrado', error.data);
      } else if (error.status === 500) {
        throw new ApiError(500, 'Error interno del servidor', error.data);
      } else {
        throw error; // Otros errores de la API
      }
    }
    
    // Manejar errores de red u otros errores
    throw new ApiError(0, 'Error de conexión: ' + ((error as Error).message || 'Error desconocido'));
  }
};

/**
 * * Función para realizar peticiones GET a la API
 * @param url - URL del endpoint de la API
 * @param options - Opciones de la petición
 * @returns Promesa con la respuesta de la API
 * @throws {ApiError} - Lanza un error si la respuesta no es exitosa
 */
const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiRequest<T>(url, { ...options, method: 'GET' }),
  
  post: <T>(url: string, data?: unknown, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(url, { ...options, method: 'POST', body: data }),
  
  put: <T>(url: string, data?: unknown, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(url, { ...options, method: 'PUT', body: data }),
  
  delete: <T>(url: string, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(url, { ...options, method: 'DELETE' }),
};

/**
 * * Clase para manejar errores de la API
 * @extends {Error}
 * @property {number} status - Código de estado HTTP
 * @property {unknown} [data] - Datos adicionales del error
 */
class ApiError extends Error {
  status: number;
  data?: unknown;
  
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export default api;