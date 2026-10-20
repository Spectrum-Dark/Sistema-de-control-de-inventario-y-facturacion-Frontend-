import { ID_ROL } from "../sesion/roles";

export const puedeCrearProducto = (idRol) =>
  [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol);

export const puedeEditarProducto = (idRol) => idRol === ID_ROL.ADMINISTRADOR;
export const puedeEliminarProducto = (idRol) => idRol === ID_ROL.ADMINISTRADOR;