import { useListado } from "../compartido/useListado";
import { listarCompatibilidades } from "../../services/compatibilidades/compatibilidadesService";

export function useCompatibilidades() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCompatibilidades,
    "id_compatibilidad",
  );
  return {
    compatibilidades: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
