import { useListado } from "../compartido/useListado";
import { listarProveedores } from "../../services/proveedores/proveedoresService";

export function useProveedores() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarProveedores,
    "id_proveedor"
  );
  return { proveedores: datos, cargando, error, recargar, actualizarEnLista };
}