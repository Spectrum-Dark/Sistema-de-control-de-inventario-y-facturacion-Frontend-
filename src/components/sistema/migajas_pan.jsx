
import { useLocation } from "react-router-dom";

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

const iconosRutas = {
  inicio: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  gestion: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10" />
    </>
  ),
  productos: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  categorias: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  marcas: (
    <>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </>
  ),
  modelos: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h10M7 13h6" />
    </>
  ),
  compatibilidades: (
    <>
      <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7" />
    </>
  ),
  proveedores: (
    <>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" />
    </>
  ),
  clientes: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  operaciones: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="m7 15 4-4 3 2 5-7" />
    </>
  ),
  compras: (
    <>
      <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </>
  ),
  inventario: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  ventas: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 4 4 6-7" />
    </>
  ),
  historial: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  facturacion: (
    <>
      <path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </>
  ),
  facturas: (
    <>
      <path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8M8 12h8" />
    </>
  ),
  reportes: (
    <>
      <path d="M3 3v18h18" />
      <rect x="7" y="11" width="3" height="6" rx="1" />
      <rect x="12" y="7" width="3" height="10" rx="1" />
      <rect x="17" y="4" width="3" height="13" rx="1" />
    </>
  ),
  administracion: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-3l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.5-2.6L6.9 15a8 8 0 0 1 0-2l-1.4-1.1L7 9.3l1.7.6a8 8 0 0 1 1.7-1l.3-1.8h3l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.5 2.6-1.4 1.1a8 8 0 0 1-.1 2Z" />
    </>
  ),
  usuarios: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  roles_permisos: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  respaldo: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </>
  ),
};

function IconoRuta({ nombre, className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconosRutas[nombre] || (
        <circle cx="12" cy="12" r="8" />
      )}
    </svg>
  );
}

function MigasPan() {
  const ubicacion = useLocation();

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
      {/* Vista móvil */}
      <div className="flex min-w-0 items-center gap-2 sm:hidden">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <IconoRuta nombre={rutaActual} className="h-4 w-4" />
        </span>

        <span
          aria-current="page"
          className="truncate text-xs font-bold text-slate-900"
        >
          {nombreUltimo}
        </span>
      </div>

      {/* Vista de escritorio */}
      <div className="hidden min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap sm:flex [&::-webkit-scrollbar]:hidden">
        <span className="flex shrink-0 items-center gap-2 text-slate-400">
          <IconoRuta nombre="inicio" className="h-4 w-4" />
          <span>Inicio</span>
        </span>

        {segmentosMigas.map((segmento, indice) => {
          const nombre = nombresRutas[segmento] || segmento;
          const esUltimo = indice === segmentosMigas.length - 1;

          return (
            <span
              key={`${indice}-${segmento}`}
              className="inline-flex shrink-0 items-center gap-2"
            >
              <svg
                className="h-3.5 w-3.5 text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>

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
