import { LayoutDashboard, Boxes, Users } from "lucide-react";
import { ID_ROL } from "../sesion/roles";

export const menuPrincipal = [
  { nombre: "Dashboard", ruta: "/dashboard", icono: LayoutDashboard },

  // Grupo desplegable: cada módulo nuevo del catálogo se agrega como una línea en "hijos"
  {
    nombre: "Catálogo",
    icono: Boxes,
    hijos: [
      { nombre: "Categorías", ruta: "/categorias" },
      { nombre: "Marcas", ruta: "/marcas" },
    ],
  },

  {
    nombre: "Usuarios",
    ruta: "/usuarios",
    icono: Users,
    roles: [ID_ROL.ADMINISTRADOR],
  },
];

const puedeVerOpcion = (opcion, idRol) =>
  !opcion.roles || opcion.roles.includes(idRol);

// Deja solo lo que el rol puede ver, también dentro de los grupos.
// Si a un grupo no le queda ningún sub-link visible, el grupo desaparece.
export const filtrarMenuPorRol = (menu, idRol) =>
  menu
    .map((item) =>
      item.hijos
        ? {
            ...item,
            hijos: item.hijos.filter((hijo) => puedeVerOpcion(hijo, idRol)),
          }
        : item
    )
    .filter(
      (item) =>
        puedeVerOpcion(item, idRol) && (!item.hijos || item.hijos.length > 0)
    );