import { useAuth } from './useAuth';
import { ID_ROL } from '../../utils/sesion/roles';

/**
 * Custom Hook centralizado para la gestión de permisos basados en roles.
 * Regla de negocio: Administrador y Operador tienen permisos de creación,
 * pero solo el Administrador puede editar y eliminar (aplicable a módulos de catálogo, vehículos y productos).
 */
export function usePermisos() {
  // Obtenemos el usuario autenticado actual desde el contexto de autenticación
  const { usuario } = useAuth();

  // Extraemos el identificador del rol del usuario (puede ser undefined si no ha cargado o no hay sesión)
  const idRol = usuario?.id_rol;

  // Retornamos un objeto booleano con los permisos evaluados dinámicamente según el rol
  return {
    // Permite la creación si el rol del usuario se encuentra dentro del array (Admin u Operador)
    puedeCrear: [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol),

    // Solo permite la edición si el rol coincide estrictamente con el de Administrador
    puedeEditar: idRol === ID_ROL.ADMINISTRADOR,

    // Solo permite la eliminación si el rol coincide estrictamente con el de Administrador
    puedeEliminar: idRol === ID_ROL.ADMINISTRADOR,
  };
}
