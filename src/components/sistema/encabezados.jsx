import MigasPan from "./migajas_pan";
import Notificaciones from "./notificaciones";
import PerfilUsuario from "./perfil_usuario";

function Encabezado({
  menuAbierto = false,
  alAlternarMenu = () => {},
  cantidadNotificaciones = 0,
  alCerrarSesion = () => {},
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur-md transition-all duration-200 sm:px-6 lg:left-64">
      {/* Sección izquierda */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={alAlternarMenu}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 lg:hidden"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {menuAbierto ? (
              <path d="m18 6-12 12M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <MigasPan />
      </div>

      {/* Sección derecha */}
      <div className="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <Notificaciones cantidad={cantidadNotificaciones} />

        <div aria-hidden="true" className="h-7 w-px bg-slate-200" />

        <PerfilUsuario alCerrarSesion={alCerrarSesion} />
      </div>
    </header>
  );
}

export default Encabezado;
