import { useListado } from "../compartido/useListado";
import { listarHistorialVentas } from "../../services/ventas/historialVentasService";

export function useHistorialVentas() {
  const { datos, cargando, error, recargar, actualizarEnLista } =
    useListado(listarHistorialVentas);
  return { historial: datos, cargando, error, recargar, actualizarEnLista };
}
