import MigasPan from "./migajas_pan";
import Notificaciones from "./notificaciones";

function Encabezado({
  menuAbierto = false,
  alAlternarMenu = () => {},
  cantidadNotificaciones = 0,
  alCerrarSesion = () => {},
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md transition-all duration-200 sm:px-6 lg:left-64">
      {/* SECCIÓN IZQUIERDA: BOTÓN MÓVIL + MIGAS DE PAN INTEGRADAS */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Botón de Menú (Móvil/Tablet) */}
        <button
          type="button"
          onClick={alAlternarMenu}
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuAbierto}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 lg:hidden"
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

        {/* Migas de Pan Integradas */}
        <MigasPan />
      </div>

      {/* SECCIÓN DERECHA: NOTIFICACIONES, PERFIL Y SALIR */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        {/* Notificaciones */}
        <Notificaciones cantidad={cantidadNotificaciones} />

        <div aria-hidden="true" className="h-6 w-px bg-slate-200" />

        {/* PERFIL DEL USUARIO (Movido desde la barra lateral) */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
            A
          </div>

          <div className="hidden flex-col text-left leading-tight sm:flex">
            <span className="text-xs font-bold text-slate-900">Usuario</span>
            <span className="text-[10px] font-semibold text-blue-600">
              Administrador
            </span>
          </div>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button
          type="button"
          onClick={alCerrarSesion}
          aria-label="Cerrar sesión"
          title="Cerrar sesión del sistema"
          className="ml-1 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}

export default Encabezado;
