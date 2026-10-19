import { useEffect, useState } from "react";
import { listarMarcas } from "../../services/marcas/marcasService";

export function useMarcas() {
  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    listarMarcas()
      .then((respuesta) => activo && setMarcas(respuesta.datos))
      .catch((e) => activo && setError(e.message))
      .finally(() => activo && setCargando(false));

    return () => {
      activo = false;
    };
  }, [version]);

  const recargar = () => {
    setCargando(true);
    setError("");
    setVersion((v) => v + 1);
  };

  const actualizarEnLista = (datos) => {
    setMarcas((anteriores) =>
      anteriores.map((m) =>
        m.id_marca === datos.id_marca ? { ...m, ...datos } : m
      )
    );
  };

  return { marcas, cargando, error, recargar, actualizarEnLista };
}