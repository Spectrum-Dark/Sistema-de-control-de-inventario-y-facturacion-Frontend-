import { useListado } from '../compartido/useListado';
import { listarCompatibilidades } from '../../services/compatibilidades/compatibilidadesService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de compatibilidades.
 * Aplica el principio de separación de responsabilidades, aislando la lógica de negocio
 * y la comunicación con el servicio del componente visual.
 */
export function useCompatibilidades() {
  // Consumimos el hook genérico useListado para reutilizar la lógica de petición,
  // estados de carga, manejo de errores y actualización.
  // Le pasamos la función del servicio HTTP y la clave primaria ('id_compatibilidad').
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCompatibilidades,
    'id_compatibilidad'
  );

  // Retornamos la interfaz del hook. Renombramos 'datos' a 'compatibilidades'
  // para dar mayor claridad contextual (semántica) a los componentes que lo consuman.
  return {
    compatibilidades: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
