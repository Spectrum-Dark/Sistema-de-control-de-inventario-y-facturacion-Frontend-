import { useListado } from "../compartido/useListado";
import { listarUsuarios } from "../../services/usuarios/usuariosService";

export function useUsuarios() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarUsuarios,
    "id_usuario"
  );
  return { usuarios: datos, cargando, error, recargar, actualizarEnLista };
}