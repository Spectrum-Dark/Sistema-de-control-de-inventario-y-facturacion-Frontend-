import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Workflow,
  ReceiptText,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  X,
} from "lucide-react";

/**
 * Logo personalizado SVG (Astro / daily.dev).
 * Representa la identidad visual institucional en la barra de navegación.
 */
const LogoAstroSVG = () => (
  <svg
    className="h-8 w-auto shrink-0"
    viewBox="0 0 256 144"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M219.832837,71.6995129 L191.573071,43.3805814 L205.69559,15.0714884 L251.612188,61.0842182 C257.462604,66.9468836 257.462604,76.4521422 251.612188,82.3148081 L195.097565,138.947752 C189.247148,144.810417 179.761748,144.810417 173.911332,138.947752 C168.060915,133.085086 168.060915,123.579827 173.911332,117.717162 L219.832837,71.6995129 Z"
        fill="#3b82f6"
      ></path>
      <path
        d="M173.921862,4.39576953 C179.772279,-1.46689601 189.260133,-1.46443637 195.11055,4.39822916 L205.706121,15.0159838 L82.0886685,138.892247 C76.238252,144.754913 66.7503974,144.752453 60.8999803,138.889788 L50.3044093,128.272033 L173.921862,4.39576953 Z M120.941551,43.3299961 L99.7504086,64.5655051 L71.4906426,36.2465737 L36.167163,71.6440084 L64.4269285,99.96294 L50.3044093,128.272033 L4.38781264,82.2593032 C-1.46260421,76.3966377 -1.46260421,66.8913792 4.38781264,61.0287132 L60.8999803,4.39822916 C66.7503974,-1.46443637 76.238252,-1.46689601 82.0886685,4.39576953 L120.941551,43.3299961 Z"
        fill="#ffffff"
      ></path>
    </g>
  </svg>
);

// Estructura de secciones y submenús del sistema con iconos de Lucide
const secciones = [
  {
    id: "gestion",
    titulo: "Gestión",
    icono: FolderKanban,
    base: "/app/gestion",
    enlaces: [
      { to: "/app/gestion/productos", texto: "Productos" },
      { to: "/app/gestion/categorias", texto: "Categorías" },
      { to: "/app/gestion/marcas", texto: "Marcas" },
      { to: "/app/gestion/modelos", texto: "Modelos" },
      { to: "/app/gestion/compatibilidades", texto: "Compatibilidades" },
      { to: "/app/gestion/proveedores", texto: "Proveedores" },
      { to: "/app/gestion/clientes", texto: "Clientes" },
    ],
  },
  {
    id: "operaciones",
    titulo: "Operaciones",
    icono: Workflow,
    base: "/app/operaciones",
    enlaces: [
      { to: "/app/operaciones/compras", texto: "Compras" },
      { to: "/app/operaciones/inventario", texto: "Inventario" },
      { to: "/app/operaciones/ventas", texto: "Ventas" },
      { to: "/app/operaciones/historial", texto: "Historial" },
    ],
  },
  {
    id: "facturacion",
    titulo: "Facturación",
    icono: ReceiptText,
    base: "/app/facturacion",
    enlaces: [{ to: "/app/facturacion/facturas", texto: "Facturas" }],
  },
  {
    id: "analisis",
    titulo: "Análisis",
    icono: BarChart3,
    base: "/app/reportes",
    enlaces: [{ to: "/app/reportes", texto: "Reportes" }],
  },
  {
    id: "administracion",
    titulo: "Administración",
    icono: ShieldCheck,
    base: "/app/administracion",
    enlaces: [
      { to: "/app/administracion/usuarios", texto: "Usuarios" },
      { to: "/app/administracion/respaldo", texto: "Respaldo" },
    ],
  },
];

const claseSubEnlace = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
    isActive
      ? "text-white font-semibold bg-slate-800/60"
      : "text-slate-400 hover:text-white hover:bg-slate-800/30"
  }`;

/**
 * Componente BarraLateral (Sidebar).
 * Gestiona la navegación jerárquica del sistema con menús desplegables (acordeón),
 * diseño responsivo móvil y sincronización automática con la ruta actual.
 */
function BarraLateral({ abierto = false, alCerrar = () => {} }) {
  const ubicacion = useLocation();

  // Detecta la sección activa según la URL actual
  const seccionActiva =
    secciones.find((s) => ubicacion.pathname.startsWith(s.base))?.id ?? null;

  const [seccionManual, setSeccionManual] = useState(null);
  const [ultimaRuta, setUltimaRuta] = useState(ubicacion.pathname);

  // Reinicia el estado manual si cambia la ruta general
  if (ubicacion.pathname !== ultimaRuta) {
    setUltimaRuta(ubicacion.pathname);
    setSeccionManual(null);
  }

  const seccionAbierta = seccionManual ?? seccionActiva;

  const alternarSeccion = (id) => {
    setSeccionManual(seccionAbierta === id ? "cerrada" : id);
  };

  return (
    <>
      {/* Fondo oscuro desenfocado para dispositivos móviles */}
      {abierto && (
        <div
          onClick={alCerrar}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Contenedor principal de la barra lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1e232a] text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Encabezado con Logo y Marca institucional */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/60 px-5">
          <div className="flex items-center gap-2.5">
            <LogoAstroSVG />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white">
                ASTRO
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400 -mt-1">
                SISTEMA DE GESTION
              </span>
            </div>
          </div>

          {/* Botón para cerrar la barra en dispositivos móviles */}
          <button
            type="button"
            onClick={alCerrar}
            aria-label="Cerrar menú"
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Etiqueta de sección */}
        <div className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Navegación
        </div>

        {/* Navegación principal */}
        <nav
          aria-label="Navegación principal"
          className="flex-1 space-y-1.5 overflow-y-auto px-3 pb-6 scrollbar-thin"
          onClick={(e) => {
            if (e.target.closest("a")) alCerrar();
          }}
        >
          {/* Enlace directo: Dashboard */}
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={20} aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          {/* Secciones con submenús desplegables */}
          {secciones.map((seccion) => {
            const estaAbierta = seccionAbierta === seccion.id;
            const esActiva = seccionActiva === seccion.id;
            const IconoComponente = seccion.icono;

            return (
              <div key={seccion.id} className="space-y-1">
                <button
                  type="button"
                  onClick={() => alternarSeccion(seccion.id)}
                  aria-expanded={estaAbierta}
                  aria-controls={`submenu-${seccion.id}`}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                    esActiva && !estaAbierta
                      ? "bg-slate-800/80 text-white"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconoComponente size={20} aria-hidden="true" />
                    <span>{seccion.titulo}</span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      estaAbierta
                        ? "rotate-180 text-blue-400"
                        : "text-slate-500"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Submenú colapsable */}
                {estaAbierta && (
                  <div
                    id={`submenu-${seccion.id}`}
                    className="ml-4 flex flex-col gap-0.5 border-l border-slate-700/60 pl-2 animate-in fade-in duration-150"
                  >
                    {seccion.enlaces.map((enlace) => (
                      <NavLink
                        key={enlace.to}
                        to={enlace.to}
                        className={claseSubEnlace}
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isActive ? "bg-blue-500" : "bg-slate-600"
                              }`}
                            />
                            <span>{enlace.texto}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default BarraLateral;
