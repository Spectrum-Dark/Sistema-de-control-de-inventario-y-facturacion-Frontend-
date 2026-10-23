const DURACION_CACHE_MS = 30_000;
const cacheListados = new Map();
const solicitudesEnCurso = new Map();
let versionCache = 0;

export function obtenerCacheListado(cargarLista) {
  return cacheListados.get(cargarLista) ?? null;
}

export function guardarCacheListado(cargarLista, datos) {
  cacheListados.set(cargarLista, {
    datos,
    vence: Date.now() + DURACION_CACHE_MS,
  });
}

export function cargarListadoConCache(cargarLista, { forzar = false } = {}) {
  const cache = obtenerCacheListado(cargarLista);
  if (!forzar && cache && cache.vence > Date.now()) {
    return Promise.resolve({ datos: cache.datos });
  }

  const solicitud = solicitudesEnCurso.get(cargarLista);
  if (solicitud) return solicitud;

  const versionSolicitud = versionCache;
  const promesa = cargarLista()
    .then((respuesta) => {
      if (versionSolicitud === versionCache) guardarCacheListado(cargarLista, respuesta.datos);
      return respuesta;
    })
    .finally(() => solicitudesEnCurso.delete(cargarLista));

  solicitudesEnCurso.set(cargarLista, promesa);
  return promesa;
}

export function actualizarCacheListado(cargarLista, actualizar) {
  const cache = obtenerCacheListado(cargarLista);
  if (!cache) return;
  guardarCacheListado(cargarLista, actualizar(cache.datos));
}

export function invalidarCacheListados() {
  versionCache += 1;
  cacheListados.clear();
  solicitudesEnCurso.clear();
}
