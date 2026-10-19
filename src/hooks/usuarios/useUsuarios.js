import { useEffect, useState } from "react";
import { listarUsuarios } from "../../services/usuarios/usuariosService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    listarUsuarios()
      .then((respuesta) => activo && setUsuarios(respuesta.datos))
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
    setUsuarios((anteriores) =>
      anteriores.map((u) =>
        u.id_usuario === datos.id_usuario ? { ...u, ...datos } : u
      )
    );
  };

  return { usuarios, cargando, error, recargar, actualizarEnLista };
}