import { useListado } from "../compartido/useListado";
import { listarCompras } from "../../services/compras/comprasService";

export function useCompras() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCompras,
    "id_compra"
  );
  return { compras: datos, cargando, error, recargar, actualizarEnLista };
}