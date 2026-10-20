import {
  LayoutDashboard,
  Boxes,
  Car,
  UserRound,
  Warehouse,
  ReceiptText,
  ClipboardList,
  Users,
} from "lucide-react";
import { ID_ROL } from "../sesion/roles";

export const menuPrincipal = [
  { nombre: "Dashboard", ruta: "/dashboard", icono: LayoutDashboard },

  // Fase 2: catálogos independientes
  {
    nombre: "Catálogos Autónomo",
    icono: Boxes,
    hijos: [
      { nombre: "Categorías", ruta: "/categorias" },
      { nombre: "Marcas", ruta: "/marcas" },
      { nombre: "Proveedores", ruta: "/proveedores" },
    ],
  },

  // Fase 3: catálogo de vehículos y productos
  {
    nombre: "Vehículos y productos",
    icono: Car,
    hijos: [
      { nombre: "Modelos", ruta: "/modelos" },
      { nombre: "Productos", ruta: "/productos" },
      { nombre: "Compatibilidades", ruta: "/compatibilidades" },
    ],
  },

  // Fase 4: clientes
  { nombre: "Clientes", ruta: "/clientes", icono: UserRound },

  // Fase 5: operaciones de compra e inventario
  {
    nombre: "Compras e inventario",
    icono: Warehouse,
    hijos: [
      { nombre: "Compras", ruta: "/compras" },
      { nombre: "Historial de compras", ruta: "/historial-compras" },
      { nombre: "Movimientos de inventario", ruta: "/movimientos-inventario" },
    ],
  },

  // Fase 6: ventas y facturación
  {
    nombre: "Ventas y facturación",
    icono: ReceiptText,
    hijos: [
      { nombre: "Ventas", ruta: "/ventas" },
      { nombre: "Historial de ventas", ruta: "/historial-ventas" },
      { nombre: "Facturación", ruta: "/facturacion" },
    ],
  },

  // Fase 7: consultas consolidadas (el Dashboard analítico es el de arriba)
  {
    nombre: "Reportes",
    icono: ClipboardList,
    hijos: [
      { nombre: "Inventario", ruta: "/reportes/inventario" },
      { nombre: "Compras", ruta: "/reportes/compras" },
      { nombre: "Ventas", ruta: "/reportes/ventas" },
      { nombre: "Facturación", ruta: "/reportes/facturacion" },
    ],
  },

  // Fase 1: seguridad y acceso
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
        : item,
    )
    .filter(
      (item) =>
        puedeVerOpcion(item, idRol) && (!item.hijos || item.hijos.length > 0),
    );
