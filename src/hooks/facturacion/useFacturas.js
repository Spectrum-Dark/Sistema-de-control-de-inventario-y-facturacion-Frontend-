import { useListado } from '../compartido/useListado';
import { listarFacturas } from '../../services/facturacion/facturasService';

/**
 * Custom Hook para gestionar el estado, la carga y las acciones del listado de facturas.
 * Centraliza la lógica de negocio separándola de los componentes de la interfaz.
 */
export function useFacturas() {
  // Consumimos el hook genérico useListado pasándole la función que obtiene las facturas
  // y el identificador único de cada registro ("id_factura").
  const { datos, cargando, error, recargar } = useListado(
    listarFacturas,
    'id_factura'
  );

  // Retornamos el estado y las funciones del hook.
  // Renombramos 'datos' a 'facturas' para mejorar la semántica y legibilidad en las vistas.
  return {
    facturas: datos,
    cargando,
    error,
    recargar,
  };
}
