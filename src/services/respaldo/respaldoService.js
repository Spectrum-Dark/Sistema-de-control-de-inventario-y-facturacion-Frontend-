import { obtenerToken } from "../../utils/sesion/almacenSesion";
import { invalidarCacheListados } from "../compartido/cacheListados";

const API_URL = import.meta.env.VITE_API_URL;

async function obtenerError(respuesta) {
  const datos = await respuesta.json().catch(() => ({}));
  return new Error(datos.message || "Ocurrió un error al comunicarse con el servidor.");
}

function headersAutorizacion(extra = {}) {
  const token = obtenerToken();
  return {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...extra,
  };
}

export async function descargarRespaldo() {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/respaldo/descargar`, {
      headers: headersAutorizacion({ Accept: "application/sql, application/octet-stream, application/json" }),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }
  if (!respuesta.ok) throw await obtenerError(respuesta);

  const blob = await respuesta.blob();
  const disposicion = respuesta.headers.get("Content-Disposition") ?? "";
  const nombreCodificado = disposicion.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const nombreSimple = disposicion.match(/filename="?([^";]+)"?/i)?.[1];
  const nombre = nombreCodificado
    ? decodeURIComponent(nombreCodificado)
    : nombreSimple ?? `respaldo_${new Date().toISOString().replace(/[:.]/g, "-")}.sql`;
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombre;
  enlace.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function restaurarRespaldo(archivo) {
  const formulario = new FormData();
  formulario.append("archivo_sql", archivo);

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/respaldo/restaurar`, {
      method: "POST",
      headers: headersAutorizacion(),
      body: formulario,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }
  if (!respuesta.ok) throw await obtenerError(respuesta);

  const datos = await respuesta.json().catch(() => ({}));
  invalidarCacheListados();
  return datos;
}
