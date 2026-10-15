import { useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  FolderKanban,
  Package,
  Grid,
  Tag,
  Boxes,
  Network,
  Truck,
  Users,
  Workflow,
  ShoppingCart,
  Warehouse,
  TrendingUp,
  History,
  ReceiptText,
  FileText,
  BarChart3,
  ShieldCheck,
  UserCheck,
  KeyRound,
  DatabaseBackup,
  ChevronRight,
  CircleDot,
} from "lucide-react";

// Mapa de nombres legibles para cada segmento de la URL
const nombresRutas = {
  gestion: "Gestión",
  productos: "Productos",
  categorias: "Categorías",
  marcas: "Marcas",
  modelos: "Modelos",
  compatibilidades: "Compatibilidades",
  proveedores: "Proveedores",
  clientes: "Clientes",
  operaciones: "Operaciones",
  compras: "Compras",
  inventario: "Inventario",
  ventas: "Ventas",
  historial: "Historial de ventas",
  facturacion: "Facturación",
  facturas: "Facturas",
  reportes: "Reportes",
  administracion: "Administración",
  usuarios: "Usuarios",
  roles_permisos: "Roles y permisos",
  respaldo: "Respaldo",
  inicio: "Inicio",
  dashboard: "Dashboard",
};

// Mapa que asocia cada ruta con su respectivo componente de icono de Lucide
const iconosRutas = {
  inicio: Home,
  dashboard: LayoutDashboard,
  gestion: FolderKanban,
  productos: Package,
  categorias: Grid,
  marcas: Tag,
  modelos: Boxes,
  compatibilidades: Network,
  proveedores: Truck,
  clientes: Users,
  operaciones: Workflow,
  compras: ShoppingCart,
  inventario: Warehouse,
  ventas: TrendingUp,
  historial: History,
  facturacion: ReceiptText,
  facturas: FileText,
  reportes: BarChart3,
  administracion: ShieldCheck,
  usuarios: UserCheck,
  roles_permisos: KeyRound,
  respaldo: DatabaseBackup,
};

/**
 * Componente dinámico para renderizar el icono correspondiente a la ruta actual.
 * Si no encuentra un icono registrado, devuelve un círculo por defecto.
 */
function IconoRuta({ nombre, className = "h-4 w-4" }) {
  const ComponenteIcono = iconosRutas[nombre] || CircleDot;
  return <ComponenteIcono className={className} aria-hidden="true" />;
}

/**
 * Componente de Navegación por Migas de Pan (Breadcrumbs).
 * Lee la URL actual mediante React Router, extrae los segmentos jerárquicos
 * y genera una ruta visual adaptativa tanto para dispositivos móviles como de escritorio.
 */
function MigasPan() {
  const ubicacion = useLocation();

  // Desglosamos la ruta en segmentos limpios
  const segmentos = ubicacion.pathname.split("/").filter(Boolean);
  const segmentosMigas = segmentos.slice(1);

  const ultimoSegmento = segmentosMigas.at(-1);
  const nombreUltimo =
    nombresRutas[ultimoSegmento] || ultimoSegmento || "Inicio";
  const rutaActual = ultimoSegmento || "dashboard";

  return (
    <nav
      aria-label="Migas de pan"
      className="flex min-w-0 items-center text-xs sm:text-sm"
    >
      {/* 1. Vista adaptable para dispositivos móviles */}
      <div className="flex min-w-0 items-center gap-2 sm:hidden">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <IconoRuta nombre={rutaActual} className="h-4 w-4" />
        </span>
        <span
          aria-current="page"
          className="truncate text-xs font-bold text-slate-900"
        >
          {nombreUltimo}
        </span>
      </div>

      {/* 2. Vista completa para pantallas de escritorio */}
      <div className="hidden min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap sm:flex [&::-webkit-scrollbar]:hidden">
        {/* Raíz estática: Inicio */}
        <span className="flex shrink-0 items-center gap-2 text-slate-400">
          <IconoRuta nombre="inicio" className="h-4 w-4" />
          <span>Inicio</span>
        </span>

        {/* Generación dinámica de los segmentos de la ruta */}
        {segmentosMigas.map((segmento, indice) => {
          const nombre = nombresRutas[segmento] || segmento;
          const esUltimo = indice === segmentosMigas.length - 1;

          return (
            <span
              key={`${indice}-${segmento}`}
              className="inline-flex shrink-0 items-center gap-2"
            >
              {/* Separador de flecha */}
              <ChevronRight size={14} className="text-slate-300" />

              <span
                aria-current={esUltimo ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 ${
                  esUltimo
                    ? "font-semibold text-slate-900"
                    : "font-medium text-slate-500"
                }`}
              >
                <IconoRuta
                  nombre={segmento}
                  className={`h-4 w-4 ${
                    esUltimo ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                {nombre}
              </span>
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export default MigasPan;
