import { useEffect, useState } from "react";
import { listarCategorias } from "../../services/categorias/categoriasService";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    listarCategorias()
      .then((respuesta) => activo && setCategorias(respuesta.datos))
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
    setCategorias((anteriores) =>
      anteriores.map((c) =>
        c.id_categoria === datos.id_categoria ? { ...c, ...datos } : c
      )
    );
  };

  return { categorias, cargando, error, recargar, actualizarEnLista };
}