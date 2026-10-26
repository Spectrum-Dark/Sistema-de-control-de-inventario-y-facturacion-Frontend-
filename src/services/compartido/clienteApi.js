import { obtenerToken } from '../../utils/sesion/almacenSesion';
import { invalidarCacheListados } from './cacheListados';

const API_URL = import.meta.env.VITE_API_URL;

// Ejecuta una solicitud JSON autenticada y normaliza respuestas y errores.
export async function peticion(endpoint, { metodo = 'GET', cuerpo } = {}) {
  // El token se agrega solo cuando hay una sesión guardada.
  const token = obtenerToken();

  let respuesta;
  try {
    // Envía el método, los encabezados comunes y, si existe, el cuerpo JSON.
    respuesta = await fetch(`${API_URL}${endpoint}`, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(cuerpo && { body: JSON.stringify(cuerpo) }),
    });
  } catch {
    // Convierte fallos de red a un mensaje uniforme para la interfaz.
    throw new Error('No se pudo conectar con el servidor.');
  }

  // Algunas respuestas pueden no incluir JSON, por lo que se usa un objeto vacío.
  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    // Conserva el estado HTTP y los errores de validación para quien consume el servicio.
    const error = new Error(
      datos.message || 'Ocurrió un error en el servidor.'
    );
    error.estado = respuesta.status;
    error.errores = datos.errors;
    throw error;
  }

  // Las escrituras pueden modificar cualquier listado y por eso invalidan el caché.
  if (metodo !== 'GET') invalidarCacheListados();

  return datos;
}
