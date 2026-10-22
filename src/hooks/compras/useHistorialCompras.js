import { useListado } from "../compartido/useListado";
import { listarHistorialCompras } from "../../services/compras/historialComprasService";

// Es de solo lectura: no hace falta indicar el nombre del id
export function useHistorialCompras() {
  const { datos, cargando, error, recargar, actualizarEnLista } =
    useListado(listarHistorialCompras);
  return { historial: datos, cargando, error, recargar, actualizarEnLista };
}