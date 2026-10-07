import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Iconografía SVG uniforme
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
      { to: "/app/administracion/roles-permisos", texto: "Roles y permisos" },
      { to: "/app/administracion/respaldo", texto: "Respaldo" },
    ],
  },
];

const claseSubEnlace = ({ isActive }) =>
  `flex items-center rounded-md px-3 py-2 text-xs font-medium transition ${
    isActive
      ? "bg-slate-800 text-white font-semibold"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
  }`;

function BarraLateral({ abierto = false, alCerrar = () => {} }) {
  const ubicacion = useLocation();

  const seccionActiva =
    secciones.find((s) => ubicacion.pathname.startsWith(s.base))?.id ?? null;

  // Sincronización limpia en React sin useEffect (evita renderizados en cascada)
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
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-900 transition-transform duration-200 lg:translate-x-0 ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Identidad Institucional (Mismo estilo que Iniciar_Sesion.jsx) */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-base font-bold text-slate-900">
              R
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Sistema de Repuestos
            </span>
          </div>

          <button
            type="button"
            onClick={alCerrar}
            aria-label="Cerrar menú"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
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

        {/* Navegación con Scrollbar CSS Estándar (Compatible con Tailwind v4) */}
        <nav
          aria-label="Navegación principal"
          className="flex-1 space-y-1 overflow-y-auto px-4 py-5 [scrollbar-color:#334155_transparent] scrollbar-thin"
          onClick={(e) => {
            if (e.target.closest("a")) alCerrar();
          }}
        >
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`
            }
          >
            {Iconos.dashboard}
            <span>Dashboard</span>
          </NavLink>

          {secciones.map((seccion) => {
            const estaAbierta = seccionAbierta === seccion.id;
            const esActiva = seccionActiva === seccion.id;

            return (
              <div key={seccion.id}>
                <button
                  type="button"
                  onClick={() => alternarSeccion(seccion.id)}
                  aria-expanded={estaAbierta}
                  aria-controls={`submenu-${seccion.id}`}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-800/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 ${
                    esActiva ? "text-white" : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {seccion.icono}
                    <span>{seccion.titulo}</span>
                  </div>

                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      estaAbierta ? "rotate-180" : ""
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

                {estaAbierta && (
                  <div
                    id={`submenu-${seccion.id}`}
                    className="ml-4 mt-1 flex flex-col gap-1 border-l border-slate-800 pl-3"
                  >
                    {seccion.enlaces.map((enlace) => (
                      <NavLink
                        key={enlace.to}
                        to={enlace.to}
                        className={claseSubEnlace}
                      >
                        {enlace.texto}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Pie de perfil */}
        <div className="flex shrink-0 items-center gap-3 border-t border-slate-800 px-5 py-4">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 border border-slate-700"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5Z" />
            </svg>
          </div>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium text-white">Usuario</p>
            <span className="text-xs text-slate-400">Administrador</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default BarraLateral;
