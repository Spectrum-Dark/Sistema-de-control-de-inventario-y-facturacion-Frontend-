import { useEffect, useState } from "react";
import {
  actualizarCacheListado,
  cargarListadoConCache,
  obtenerCacheListado,
} from "../../services/compartido/cacheListados";

// Carga una lista desde el backend. claveId es el nombre del id (ej: "id_modelo").
export function useListado(cargarLista, claveId) {
  const cacheInicial = obtenerCacheListado(cargarLista);
  const [datos, setDatos] = useState(cacheInicial?.datos ?? []);
  const [cargando, setCargando] = useState(!cacheInicial);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;
    const cache = obtenerCacheListado(cargarLista);
    const hayCache = Boolean(cache);

    if (cache) {
      setDatos(cache.datos);
      setCargando(false);
    } else {
      setCargando(true);
    }

    cargarListadoConCache(cargarLista, { forzar: version > 0 })
      .then((respuesta) => {
        if (!activo) return;
        setDatos(respuesta.datos);
        setError("");
      })
      .catch((e) => activo && !hayCache && setError(e.message))
      .finally(() => activo && setCargando(false));

    return () => {
      activo = false;
    };
  }, [cargarLista, version]);

  const recargar = () => {
    setCargando(true);
    setError("");
    setVersion((v) => v + 1);
  };

  const actualizarEnLista = (nuevo) => {
    const actualizar = (anteriores) =>
      anteriores.map((d) =>
        d[claveId] === nuevo[claveId] ? { ...d, ...nuevo } : d,
      );
    setDatos((anteriores) => actualizar(anteriores));
    actualizarCacheListado(cargarLista, actualizar);
  };

  return { datos, cargando, error, recargar, actualizarEnLista };
}
