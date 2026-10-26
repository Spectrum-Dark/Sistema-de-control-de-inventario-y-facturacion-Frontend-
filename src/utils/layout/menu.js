import {
  Gauge,
  Tags,
  CarFront,
  ContactRound,
  PackageSearch,
  ShoppingCart,
  ChartNoAxesCombined,
  UsersRound,
  DatabaseBackup,
  Settings2,
} from 'lucide-react';
import { ID_ROL } from '../sesion/roles';

/**
 * Estructura de navegación principal del sistema basada en fases de desarrollo.
 * Define los módulos, rutas, iconos asociados y control de acceso por roles.
 */
export const menuPrincipal = [
  // Ruta directa sin subelementos
  { nombre: 'Dashboard', ruta: '/dashboard', icono: Gauge },

  // Fase 2: catálogos independientes
  {
    nombre: 'Catálogos Autónomo',
    icono: Tags,
    hijos: [
      { nombre: 'Categorías', ruta: '/categorias' },
      { nombre: 'Marcas', ruta: '/marcas' },
      { nombre: 'Proveedores', ruta: '/proveedores' },
    ],
  },

  // Fase 3: catálogo de vehículos y productos
  {
    nombre: 'Vehículos y productos',
    icono: CarFront,
    hijos: [
      { nombre: 'Modelos', ruta: '/modelos' },
      { nombre: 'Productos', ruta: '/productos' },
      { nombre: 'Compatibilidades', ruta: '/compatibilidades' },
    ],
  },

  // Fase 4: operaciones de compra e inventario
  {
    nombre: 'Compras e inventario',
    icono: PackageSearch,
    hijos: [
      { nombre: 'Compras', ruta: '/compras' },
      { nombre: 'Correcciones', ruta: '/historial-compras' },
      { nombre: 'Movimientos de inventario', ruta: '/movimientos-inventario' },
    ],
  },

  // Fase 5: clientes y proformas (con restricción explícita de roles)
  {
    nombre: 'Clientes y proformas',
    icono: ContactRound,
    roles: [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR, ID_ROL.CONSULTOR],
    hijos: [
      { nombre: 'Clientes', ruta: '/clientes' },
      {
        nombre: 'Proformas',
        ruta: '/proformas',
        roles: [ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR, ID_ROL.CONSULTOR],
      },
    ],
  },

  // Fase 6: ventas y facturación
  {
    nombre: 'Ventas y facturación',
    icono: ShoppingCart,
    hijos: [
      { nombre: 'Ventas', ruta: '/ventas' },
      { nombre: 'Correcciones', ruta: '/historial-ventas' },
      { nombre: 'Facturación', ruta: '/facturacion' },
    ],
  },

  // Fase 7: consultas consolidadas y reportes
  {
    nombre: 'Reportes',
    icono: ChartNoAxesCombined,
    hijos: [
      { nombre: 'Inventario', ruta: '/reportes/inventario' },
      { nombre: 'Compras', ruta: '/reportes/compras' },
      { nombre: 'Ventas', ruta: '/reportes/ventas' },
      { nombre: 'Facturación', ruta: '/reportes/facturacion' },
      { nombre: 'Clientes y proveedores', ruta: '/reportes/catalogos' },
    ],
  },

  // Fase 1: seguridad y configuración del sistema (restringido a administradores)
  {
    nombre: 'Sistema',
    icono: Settings2,
    roles: [ID_ROL.ADMINISTRADOR],
    hijos: [
      {
        nombre: 'Usuarios',
        ruta: '/usuarios',
        icono: UsersRound,
        roles: [ID_ROL.ADMINISTRADOR],
      },
      {
        nombre: 'Respaldos',
        ruta: '/respaldo',
        icono: DatabaseBackup,
        roles: [ID_ROL.ADMINISTRADOR],
      },
    ],
  },
];

/**
 * Evalúa si un rol de usuario específico tiene permisos para ver una opción del menú.
 * Si la opción define roles explícitos, valida si se incluyen; de lo contrario,
 * aplica una regla por defecto (los consultores tienen restricciones generales).
 */
const puedeVerOpcion = (opcion, idRol) =>
  opcion.roles ? opcion.roles.includes(idRol) : idRol !== ID_ROL.CONSULTOR;

/**
 * Filtra dinámicamente el menú principal de navegación según el rol del usuario actual.
 * 1. Mapea los elementos para filtrar sus sub-links (hijos) si los poseen.
 * 2. Filtra los grupos principales asegurando que cumplan con los permisos
 *    y que no queden vacíos (si un grupo se queda sin hijos visibles, se oculta por completo).
 */
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
