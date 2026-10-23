import { useListado } from "../compartido/useListado";
import { listarVentas } from "../../services/ventas/ventasService";

export function useVentas() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarVentas,
    "id_venta",
  );
  return { ventas: datos, cargando, error, recargar, actualizarEnLista };
}
