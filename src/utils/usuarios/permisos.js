import { ID_ROL } from "../sesion/roles";

export const esMismaCuenta = (fila, actual) =>
  fila.id_usuario === actual?.id_usuario;

// No se puede modificar la cuenta principal ni la propia
export const puedeModificar = (fila, actual) =>
  Boolean(actual) &&
  !fila.es_administrador_principal &&
  !esMismaCuenta(fila, actual);

// Solo el Administrador principal puede cambiar estados
export const puedeCambiarEstado = (fila, actual) =>
  puedeModificar(fila, actual) && Boolean(actual?.es_administrador_principal);

// Solo el Administrador principal puede asignar el rol Administrador
export const rolesAsignables = (fila, actual) =>
  Object.values(ID_ROL).filter(
    (id) =>
      id !== ID_ROL.ADMINISTRADOR ||
      actual?.es_administrador_principal ||
      fila.id_rol === ID_ROL.ADMINISTRADOR
  );