import { useListado } from "../compartido/useListado";
import { listarMovimientos } from "../../services/inventario/inventarioService";

// Si el id de tus movimientos no se llama id_movimiento, cámbialo aquí
export function useMovimientos() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarMovimientos,
    "id_movimiento"
  );
  return { movimientos: datos, cargando, error, recargar, actualizarEnLista };
}