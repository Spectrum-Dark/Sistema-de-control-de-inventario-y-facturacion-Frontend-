import { ID_ROL } from '../sesion/roles';

// Función auxiliar privada para determinar de forma robusta si un usuario tiene privilegios de administrador principal
const esAdministradorPrincipal = (usuario) => {
  const valor = usuario?.es_administrador_principal;
  // Valida múltiples tipos de datos comunes en bases de datos (booleanos, enteros o strings) por seguridad
  return valor === true || valor === 1 || valor === '1' || valor === 'true';
};

// Función para verificar si un registro (fila) corresponde al usuario que tiene la sesión activa (actual)
export const esMismaCuenta = (fila, actual) =>
  fila?.id_usuario != null &&
  actual?.id_usuario != null &&
  String(fila.id_usuario) === String(actual.id_usuario);

// Regla de negocio: Determina si se puede modificar un usuario (no se puede modificar la cuenta principal ni la propia)
export const puedeModificar = (fila, actual) =>
  Boolean(actual) && // Verifica que exista un usuario autenticado
  !esAdministradorPrincipal(fila) && // Evita que se modifique al administrador principal
  !esMismaCuenta(fila, actual); // Evita que el usuario modifique su propia cuenta

// Regla de negocio: Solo el administrador principal tiene permisos para cambiar el estado de otros usuarios
export const puedeCambiarEstado = (fila, actual) =>
  puedeModificar(fila, actual) && esAdministradorPrincipal(actual);

// Regla de negocio: Filtra y retorna los roles que se pueden asignar según los permisos del usuario actual y la fila
export const rolesAsignables = (fila, actual) =>
  Object.values(ID_ROL).filter(
    (id) =>
      id !== ID_ROL.ADMINISTRADOR || // Permite roles estándar por defecto
      esAdministradorPrincipal(actual) || // Si es admin principal, puede asignar el rol de Administrador
      fila.id_rol === ID_ROL.ADMINISTRADOR // Permite mantener el rol si la fila ya lo poseía
  );
