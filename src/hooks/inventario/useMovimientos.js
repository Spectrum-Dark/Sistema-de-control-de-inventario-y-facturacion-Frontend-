import { useListado } from '../compartido/useListado';
import { listarMovimientos } from '../../services/inventario/inventarioService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de movimientos de inventario.
 * Centraliza la obtención de datos, estados de carga, manejo de errores y funciones de actualización.
 */
export function useMovimientos() {
  // Consumimos el hook genérico useListado pasándole la función del servicio
  // y la clave primaria que identifica unívocamente a cada registro ("id_movimiento").
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarMovimientos,
    'id_movimiento'
  );

  // Retornamos el objeto renombrando "datos" como "movimientos"
  // para darle un contexto semántico claro al componente que lo utilice.
  return {
    movimientos: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
