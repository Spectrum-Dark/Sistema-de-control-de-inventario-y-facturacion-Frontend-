import { useListado } from "../compartido/useListado";
import { listarProductos } from "../../services/productos/productosService";

export function useProductos() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarProductos,
    "id_producto"
  );
  return { productos: datos, cargando, error, recargar, actualizarEnLista };
}