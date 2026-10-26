import { useListado } from '../compartido/useListado';
import { listarMarcas } from '../../services/marcas/marcasService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de marcas.
 * Centraliza la obtención de datos, estados de carga y manejo de errores,
 * aplicando el principio DRY (Don't Repeat Yourself) mediante un hook genérico.
 */
export function useMarcas() {
  // Ejecutamos el hook genérico useListado pasándole la función de servicio
  // encargada de la petición HTTP y el identificador único de la entidad ('id_marca').
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarMarcas,
    'id_marca'
  );

  // Retornamos el estado y las funciones de control.
  // Renombramos 'datos' a 'marcas' para dotar al código de mayor semántica y claridad.
  return {
    marcas: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
