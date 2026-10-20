import { ID_ROL } from "../sesion/roles";

// Administrador y Operador pueden registrar
export const puedeCrearProveedor = (idRol) =>
  [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol);

// Solo el Administrador puede actualizar y eliminar
export const puedeEditarProveedor = (idRol) => idRol === ID_ROL.ADMINISTRADOR;
export const puedeEliminarProveedor = (idRol) => idRol === ID_ROL.ADMINISTRADOR;