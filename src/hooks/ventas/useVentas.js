import { useListado } from '../compartido/useListado';
import { listarVentas } from '../../services/ventas/ventasService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de ventas.
 * Centraliza la obtención, el manejo de estados (carga/error) y la actualización
 * de los registros de ventas, separando la lógica de negocio de los componentes.
 */
export function useVentas() {
  // Consumimos el hook genérico useListado pasándole la función de servicio
  // para obtener las ventas y el identificador único ('id_venta').
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarVentas,
    'id_venta'
  );

  // Retornamos las propiedades y funciones del hook, renombrando 'datos'
  // a 'ventas' para darle mayor claridad y contexto semántico al componente que lo use.
  return { ventas: datos, cargando, error, recargar, actualizarEnLista };
}
