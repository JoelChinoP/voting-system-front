/**
 * * Interfaz para las opciones de la petición
 * @typedef {Object} RequestOptions
 * @property {string} [method] - Método HTTP (GET, POST, PUT, DELETE, etc.)
 * @property {Record<string, string>} [headers] - Encabezados de la petición
 * @property {unknown} [body] - Cuerpo de la petición (para POST, PUT, etc.)
 * @property {RequestCredentials} [credentials] - Credenciales para la petición (same-origin, include, omit)
 */
export type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: RequestCredentials;
};
