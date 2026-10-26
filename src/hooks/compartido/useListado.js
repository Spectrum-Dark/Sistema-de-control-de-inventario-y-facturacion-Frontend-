import { useEffect, useState } from 'react';
import {
  actualizarCacheListado,
  cargarListadoConCache,
  obtenerCacheListado,
} from '../../services/compartido/cacheListados';

/**
 * Hook personalizado 'useListado' para cargar y sincronizar listas desde el backend
 * con soporte de caché local, manejo de estados de carga, errores y actualizaciones optimistas.
 */
export function useListado(cargarLista, claveId) {
  const cacheInicial = obtenerCacheListado(cargarLista);
  const [datos, setDatos] = useState(cacheInicial?.datos ?? []);
  const [cargando, setCargando] = useState(!cacheInicial);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);

  // Efecto para sincronizar los datos de la lista desde el servidor de forma asíncrona.
  useEffect(() => {
    let activo = true;
    const cache = obtenerCacheListado(cargarLista);
    const hayCache = Boolean(cache);

    cargarListadoConCache(cargarLista, { forzar: version > 0 })
      .then((respuesta) => {
        if (!activo) return;
        setDatos(respuesta.datos);
        setError('');
      })
      .catch((e) => activo && !hayCache && setError(e.message))
      .finally(() => activo && setCargando(false));

    return () => {
      activo = false;
    };
  }, [cargarLista, version]);

  /**
   * Fuerza la recarga de los datos desde el servidor incrementando la versión.
   */
  const recargar = () => {
    setCargando(true);
    setError('');
    setVersion((v) => v + 1);
  };

  /**
   * Actualiza de manera optimista un elemento específico dentro de la lista y su caché asociada.
   */
  const actualizarEnLista = (nuevo) => {
    const actualizar = (anteriores) =>
      anteriores.map((d) =>
        d[claveId] === nuevo[claveId] ? { ...d, ...nuevo } : d
      );
    setDatos((anteriores) => actualizar(anteriores));
    actualizarCacheListado(cargarLista, actualizar);
  };

  return { datos, cargando, error, recargar, actualizarEnLista };
}
