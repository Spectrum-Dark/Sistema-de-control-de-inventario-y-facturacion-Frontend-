import { useListado } from "../compartido/useListado";
import { listarMarcas } from "../../services/marcas/marcasService";

export function useMarcas() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarMarcas,
    "id_marca"
  );
  return { marcas: datos, cargando, error, recargar, actualizarEnLista };
}