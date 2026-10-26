import { useListado } from '../compartido/useListado';
import { listarHistorialVentas } from '../../services/ventas/historialVentasService';

/**
 * Custom Hook para gestionar el estado y la lógica del historial de ventas.
 * Reutiliza el hook genérico useListado para estandarizar la obtención de datos,
 * control de carga, gestión de errores y actualización del estado.
 */
export function useHistorialVentas() {
  // Consumimos el hook useListado pasándole únicamente la función de servicio
  // encargada de la petición HTTP para listar el historial de ventas.
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarHistorialVentas
  );

  // Retornamos los valores adaptados al dominio. Renombramos 'datos' a 'historial'
  // para que el componente que lo utilice maneje un código más descriptivo y legible.
  return {
    historial: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
