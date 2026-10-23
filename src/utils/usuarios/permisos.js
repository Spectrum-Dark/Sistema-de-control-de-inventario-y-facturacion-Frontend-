import { ID_ROL } from "../sesion/roles";

const esAdministradorPrincipal = (usuario) => {
  const valor = usuario?.es_administrador_principal;
  return valor === true || valor === 1 || valor === "1" || valor === "true";
};

export const esMismaCuenta = (fila, actual) =>
  fila?.id_usuario != null &&
  actual?.id_usuario != null &&
  String(fila.id_usuario) === String(actual.id_usuario);

// No se puede modificar la cuenta principal ni la propia
export const puedeModificar = (fila, actual) =>
  Boolean(actual) &&
  !esAdministradorPrincipal(fila) &&
  !esMismaCuenta(fila, actual);

// Solo el Administrador principal puede cambiar estados
export const puedeCambiarEstado = (fila, actual) =>
  puedeModificar(fila, actual) && esAdministradorPrincipal(actual);

// Solo el Administrador principal puede asignar el rol Administrador
export const rolesAsignables = (fila, actual) =>
  Object.values(ID_ROL).filter(
    (id) =>
      id !== ID_ROL.ADMINISTRADOR ||
      esAdministradorPrincipal(actual) ||
      fila.id_rol === ID_ROL.ADMINISTRADOR
  );
