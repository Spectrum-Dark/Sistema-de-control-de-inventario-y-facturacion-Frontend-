import { useAuth } from "./useAuth";
import { ID_ROL } from "../../utils/sesion/roles";

// Reglas iguales para todos los módulos de catálogo, vehículos y productos:
// Administrador y Operador crean; solo el Administrador edita y elimina.
export function usePermisos() {
  const { usuario } = useAuth();
  const idRol = usuario?.id_rol;

  return {
    puedeCrear: [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR].includes(idRol),
    puedeEditar: idRol === ID_ROL.ADMINISTRADOR,
    puedeEliminar: idRol === ID_ROL.ADMINISTRADOR,
  };
}