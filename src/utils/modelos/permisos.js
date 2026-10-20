import { ID_ROL } from "../sesion/roles";

export const puedeCrearModelo = (idRol) =>
  [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol);

export const puedeEditarModelo = (idRol) => idRol === ID_ROL.ADMINISTRADOR;
export const puedeEliminarModelo = (idRol) => idRol === ID_ROL.ADMINISTRADOR;