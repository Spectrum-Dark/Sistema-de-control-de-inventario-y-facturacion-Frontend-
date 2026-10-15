import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// =====================================================
// LOGO PERSONALIZADO SVG (Astro / daily.dev)
// =====================================================
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

// =====================================================
// ICONOGRAFÍA SVG UNIFORME
// =====================================================
const Iconos = {
  dashboard: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  ),
  gestion: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  operaciones: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  ),
  facturacion: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  reportes: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  administracion: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

const secciones = [
  {
    id: "gestion",
    titulo: "Gestión",
    icono: Iconos.gestion,
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
    icono: Iconos.operaciones,
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
    icono: Iconos.facturacion,
    base: "/app/facturacion",
    enlaces: [{ to: "/app/facturacion/facturas", texto: "Facturas" }],
  },
  {
    id: "analisis",
    titulo: "Análisis",
    icono: Iconos.reportes,
    base: "/app/reportes",
    enlaces: [{ to: "/app/reportes", texto: "Reportes" }],
  },
  {
    id: "administracion",
    titulo: "Administración",
    icono: Iconos.administracion,
    base: "/app/administracion",
    enlaces: [
      { to: "/app/administracion/usuarios", texto: "Usuarios" },
      { to: "/app/administracion/respaldo", texto: "Respaldo" },
    ],
  },
];

const claseSubEnlace = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
  }`;

function BarraLateral({ abierto = false, alCerrar = () => {} }) {
  const ubicacion = useLocation();

  const seccionActiva =
    secciones.find((s) => ubicacion.pathname.startsWith(s.base))?.id ?? null;

  const [seccionManual, setSeccionManual] = useState(null);
  const [ultimaRuta, setUltimaRuta] = useState(ubicacion.pathname);

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
      {/* Fondo móvil */}
      {abierto && (
        <div
          onClick={alCerrar}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1e232a] text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ENCABEZADO CON LOGO Y MARCA ASTRO */}
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

          <button
            type="button"
            onClick={alCerrar}
            aria-label="Cerrar menú"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ETIQUETA DE NAVEGACIÓN */}
        <div className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Navegación
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav
          aria-label="Navegación principal"
          className="flex-1 space-y-1 overflow-y-auto px-3 pb-6 [scrollbar-color:#334155_transparent] scrollbar-thin"
          onClick={(e) => {
            if (e.target.closest("a")) alCerrar();
          }}
        >
          {/* Dashboard */}
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
            {Iconos.dashboard}
            <span>Dashboard</span>
          </NavLink>

          {/* Menús desplegables */}
          {secciones.map((seccion) => {
            const estaAbierta = seccionAbierta === seccion.id;
            const esActiva = seccionActiva === seccion.id;

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
                    {seccion.icono}
                    <span>{seccion.titulo}</span>
                  </div>

                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      estaAbierta
                        ? "rotate-180 text-blue-400"
                        : "text-slate-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Submenú desplegable */}
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
                            ></span>
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
