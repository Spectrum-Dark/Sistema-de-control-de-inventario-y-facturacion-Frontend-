import { ID_ROL } from "../sesion/roles";

// Administrador y Operador pueden registrar
export const puedeCrearMarca = (idRol) =>
  [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol);

// Solo el Administrador puede actualizar (incluye el estado)
export const puedeEditarMarca = (idRol) => idRol === ID_ROL.ADMINISTRADOR;