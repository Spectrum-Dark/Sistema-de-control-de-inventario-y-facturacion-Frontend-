import Notificaciones from "./notificaciones";

function Encabezado({
  menuAbierto = false,
  alAlternarMenu = () => {},
  cantidadNotificaciones = 0,
  alCerrarSesion = () => {},
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:left-64">
      <div className="flex min-w-0 items-center gap-3">
        {/* Botón de menú (móvil y tablet) */}
        <button
          type="button"
          onClick={alAlternarMenu}
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuAbierto}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/20 lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Indicador de contexto operativo no redundante */}
        <span className="text-sm font-semibold tracking-tight text-slate-700">
          Panel de Control
        </span>
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Notificaciones */}
        <Notificaciones cantidad={cantidadNotificaciones} />

        <div aria-hidden="true" className="mx-1 h-5 w-px bg-slate-200" />

        {/* Cerrar sesión */}
        <button
          type="button"
          onClick={alCerrarSesion}
          aria-label="Cerrar sesión"
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}

export default Encabezado;