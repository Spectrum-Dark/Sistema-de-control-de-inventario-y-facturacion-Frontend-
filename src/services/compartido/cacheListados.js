// Tiempo durante el que se reutiliza una respuesta de listado en memoria.
const DURACION_CACHE_MS = 60_000;
// Guarda los datos recientes usando la función de carga como clave.
const cacheListados = new Map();
// Evita iniciar solicitudes duplicadas para el mismo listado.
const solicitudesEnCurso = new Map();
// Permite descartar respuestas que empezaron antes de invalidar el caché.
let versionCache = 0;

// Devuelve la entrada almacenada para una función de carga, si existe.
export function obtenerCacheListado(cargarLista) {
  return cacheListados.get(cargarLista) ?? null;
}

// Almacena los datos junto con el momento en que dejarán de ser válidos.
export function guardarCacheListado(cargarLista, datos) {
  cacheListados.set(cargarLista, {
    datos,
    vence: Date.now() + DURACION_CACHE_MS,
  });
}

// Devuelve el caché vigente o carga los datos y comparte la solicitud en curso.
export function cargarListadoConCache(cargarLista, { forzar = false } = {}) {
  const cache = obtenerCacheListado(cargarLista);
  if (!forzar && cache && cache.vence > Date.now()) {
    return Promise.resolve({ datos: cache.datos });
  }

  const solicitud = solicitudesEnCurso.get(cargarLista);
  if (solicitud) return solicitud;

  // Una respuesta anterior a una invalidación no debe volver a poblar el caché.
  const versionSolicitud = versionCache;
  const promesa = cargarLista()
    .then((respuesta) => {
      if (versionSolicitud === versionCache)
        guardarCacheListado(cargarLista, respuesta.datos);
      return respuesta;
    })
    .finally(() => solicitudesEnCurso.delete(cargarLista));

  solicitudesEnCurso.set(cargarLista, promesa);
  return promesa;
}

// Actualiza los datos guardados sin volver a consultar el servidor.
export function actualizarCacheListado(cargarLista, actualizar) {
  const cache = obtenerCacheListado(cargarLista);
  if (!cache) return;
  guardarCacheListado(cargarLista, actualizar(cache.datos));
}

// Invalida todos los listados y solicitudes pendientes en memoria.
export function invalidarCacheListados() {
  versionCache += 1;
  cacheListados.clear();
  solicitudesEnCurso.clear();
}
