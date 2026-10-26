import { useListado } from '../compartido/useListado';
import { listarHistorialCompras } from '../../services/compras/historialComprasService';

/**
 * Custom Hook para gestionar el historial de compras.
 * Al tratarse de una vista de solo lectura, no es necesario pasarle
 * un identificador único (id) al hook genérico useListado.
 */
export function useHistorialCompras() {
  // Consumimos el hook genérico useListado pasando únicamente la función de servicio.
  // Como no requiere modificaciones locales por ID, omitimos el segundo parámetro.
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarHistorialCompras
  );

  // Retornamos el estado mapeado: 'datos' se renombra semánticamente a 'historial'.
  return {
    historial: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
