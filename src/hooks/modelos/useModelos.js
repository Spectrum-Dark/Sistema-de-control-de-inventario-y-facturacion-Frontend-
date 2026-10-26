import { useListado } from '../compartido/useListado';
import { listarModelos } from '../../services/modelos/modelosService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de modelos.
 * Centraliza la obtención de datos, estados de carga, manejo de errores
 * y actualización de registros siguiendo el principio DRY (Don't Repeat Yourself).
 */
export function useModelos() {
  // Ejecutamos el hook genérico useListado pasándole:
  // 1. La función de servicio que hace la petición HTTP para listar los modelos.
  // 2. El identificador único ("id_modelo") necesario para la gestión eficiente de la lista.
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarModelos,
    'id_modelo'
  );

  // Retornamos los estados y funciones, renombrando 'datos' a 'modelos'
  // para darle un significado semántico más claro al componente que lo utilice.
  return { modelos: datos, cargando, error, recargar, actualizarEnLista };
}
