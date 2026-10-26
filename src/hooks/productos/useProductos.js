import { useListado } from '../compartido/useListado';
import { listarProductos } from '../../services/productos/productosService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de productos.
 * Centraliza la obtención de datos, estados de carga y manejo de errores,
 * desacoplando esta lógica de la interfaz de usuario.
 */
export function useProductos() {
  // Reutilizamos el hook genérico useListado pasándole la función de servicio
  // encargada de traer los productos y el identificador único de cada registro ("id_producto").
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarProductos,
    'id_producto'
  );

  // Retornamos los estados y funciones, renombrando "datos" a "productos"
  // para darle un contexto semántico claro a los componentes que lo utilicen.
  return { productos: datos, cargando, error, recargar, actualizarEnLista };
}
