import { useListado } from "../compartido/useListado";
import { listarModelos } from "../../services/modelos/modelosService";

export function useModelos() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarModelos,
    "id_modelo"
  );
  return { modelos: datos, cargando, error, recargar, actualizarEnLista };
}