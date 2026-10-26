import { useListado } from '../compartido/useListado';
import { listarCompras } from '../../services/compras/comprasService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de compras.
 * Centraliza la obtención de datos, estados de carga, manejo de errores y actualización local.
 */
export function useCompras() {
  // Consumimos el hook genérico useListado pasándole la función de servicio
  // encargada de obtener las compras del backend y el identificador único ("id_compra").
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCompras,
    'id_compra'
  );

  // Retornamos la interfaz del hook, renombrando "datos" a "compras"
  // para mejorar la semántica y claridad en los componentes que lo consuman.
  return { compras: datos, cargando, error, recargar, actualizarEnLista };
}
