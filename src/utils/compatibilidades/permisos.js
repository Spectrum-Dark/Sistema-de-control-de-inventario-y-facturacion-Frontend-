import { ID_ROL } from "../sesion/roles";

export const puedeCrearCompatibilidad = (idRol) =>
  [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol);

export const puedeEditarCompatibilidad = (idRol) =>
  idRol === ID_ROL.ADMINISTRADOR;
export const puedeEliminarCompatibilidad = (idRol) =>
  idRol === ID_ROL.ADMINISTRADOR;