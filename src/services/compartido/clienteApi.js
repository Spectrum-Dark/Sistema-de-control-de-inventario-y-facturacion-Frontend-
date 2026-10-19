import { obtenerToken } from "../../utils/sesion/almacenSesion";

const API_URL = import.meta.env.VITE_API_URL;

export async function peticion(endpoint, { metodo = "GET", cuerpo } = {}) {
  const token = obtenerToken();

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${endpoint}`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(cuerpo && { body: JSON.stringify(cuerpo) }),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    const error = new Error(datos.message || "Ocurrió un error en el servidor.");
    error.estado = respuesta.status;
    error.errores = datos.errors;
    throw error;
  }

  return datos;
}