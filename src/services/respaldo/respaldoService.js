import { obtenerToken } from '../../utils/sesion/almacenSesion';
import { invalidarCacheListados } from '../compartido/cacheListados';

const API_URL = import.meta.env.VITE_API_URL;

// Obtiene el mensaje de error que entregue el servidor, si está disponible.
async function obtenerError(respuesta) {
  const datos = await respuesta.json().catch(() => ({}));
  return new Error(
    datos.message || 'Ocurrió un error al comunicarse con el servidor.'
  );
}

// Construye encabezados de respuesta y agrega autenticación cuando existe sesión.
function headersAutorizacion(extra = {}) {
  const token = obtenerToken();
  return {
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...extra,
  };
}

// Descarga el archivo SQL y conserva el nombre enviado por el servidor.
export async function descargarRespaldo() {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/respaldo/descargar`, {
      headers: headersAutorizacion({
        Accept: 'application/sql, application/octet-stream, application/json',
      }),
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor.');
  }
  if (!respuesta.ok) throw await obtenerError(respuesta);

  // Convierte el contenido recibido en un archivo descargable desde el navegador.
  const blob = await respuesta.blob();
  // Se prioriza el nombre UTF-8 y se usa un nombre simple o generado como respaldo.
  const disposicion = respuesta.headers.get('Content-Disposition') ?? '';
  const nombreCodificado = disposicion.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const nombreSimple = disposicion.match(/filename="?([^";]+)"?/i)?.[1];
  const nombre = nombreCodificado
    ? decodeURIComponent(nombreCodificado)
    : (nombreSimple ??
      `respaldo_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`);
  const url = URL.createObjectURL(blob);
  // El enlace temporal inicia la descarga y luego se libera su URL.
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  enlace.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Envía un archivo SQL al servidor para restaurar la base de datos.
export async function restaurarRespaldo(archivo) {
  // FormData permite enviar el archivo como multipart sin fijar el Content-Type.
  const formulario = new FormData();
  formulario.append('archivo_sql', archivo);

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/respaldo/restaurar`, {
      method: 'POST',
      headers: headersAutorizacion(),
      body: formulario,
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor.');
  }
  if (!respuesta.ok) throw await obtenerError(respuesta);

  // Tras una restauración, los listados en memoria ya no representan los datos actuales.
  const datos = await respuesta.json().catch(() => ({}));
  invalidarCacheListados();
  return datos;
}
