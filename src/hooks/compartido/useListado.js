import { useEffect, useState } from "react";

// Carga una lista desde el backend. claveId es el nombre del id (ej: "id_modelo").
export function useListado(cargarLista, claveId) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    cargarLista()
      .then((respuesta) => activo && setDatos(respuesta.datos))
      .catch((e) => activo && setError(e.message))
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
    setDatos((anteriores) =>
      anteriores.map((d) =>
        d[claveId] === nuevo[claveId] ? { ...d, ...nuevo } : d,
      ),
    );
  };

  return { datos, cargando, error, recargar, actualizarEnLista };
}
