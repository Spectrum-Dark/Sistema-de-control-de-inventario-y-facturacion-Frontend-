import { useListado } from '../compartido/useListado';
import { listarUsuarios } from '../../services/usuarios/usuariosService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de usuarios.
 * Separa la lógica de negocio y la obtención de datos de los componentes visuales.
 */
export function useUsuarios() {
  // Reutilizamos el hook genérico useListado pasándole la función del servicio
  // encargada de la petición HTTP y la clave primaria ('id_usuario').
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarUsuarios,
    'id_usuario'
  );

  // Retornamos la interfaz del hook, renombrando 'datos' a 'usuarios'
  // para darle un contexto semántico claro a los componentes que lo consuman.
  return {
    usuarios: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
