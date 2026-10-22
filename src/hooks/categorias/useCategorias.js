import { useListado } from "../compartido/useListado";
import { listarCategorias } from "../../services/categorias/categoriasService";

export function useCategorias() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCategorias,
    "id_categoria"
  );
  return { categorias: datos, cargando, error, recargar, actualizarEnLista };
}