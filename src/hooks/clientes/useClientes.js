import { useListado } from "../compartido/useListado";
import { listarClientes } from "../../services/clientes/clientesService";

export function useClientes() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarClientes,
    "id_cliente"
  );
  return { clientes: datos, cargando, error, recargar, actualizarEnLista };
}