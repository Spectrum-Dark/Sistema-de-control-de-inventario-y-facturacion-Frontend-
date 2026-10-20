import { useEffect, useState } from "react";
import { listarProveedores } from "../../services/proveedores/proveedoresService";

export function useProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    listarProveedores()
      .then((respuesta) => activo && setProveedores(respuesta.datos))
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
    setProveedores((anteriores) =>
      anteriores.map((p) =>
        p.id_proveedor === datos.id_proveedor ? { ...p, ...datos } : p
      )
    );
  };

  return { proveedores, cargando, error, recargar, actualizarEnLista };
}