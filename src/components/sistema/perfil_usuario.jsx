import usePerfilUsuario from "../../hooks/sistema/usePerfilUsuario";
import { LogOut } from "lucide-react";

/**
 * Componente PerfilUsuario.
 * Muestra el avatar con las iniciales del usuario y despliega un menú flotante
 * con información detallada de la cuenta (nombre, correo, rol) y la opción
 * para cerrar sesión de manera segura.
 */
export default function PerfilUsuario({ alCerrarSesion = () => {} }) {
  const {
    menuAbierto,
    referencia,
    nombre,
    correo,
    rol,
    iniciales,
    cerrandoSesion,
    alternarMenu,
    cerrarSesion,
  } = usePerfilUsuario(alCerrarSesion);

  return (
    <div className="relative" ref={referencia}>
      {/* Botón Avatar del usuario (Disparador del menú desplegable) */}
      <button
        type="button"
        onClick={alternarMenu}
        aria-expanded={menuAbierto}
        aria-haspopup="menu"
        aria-label="Abrir menú de usuario"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ring-1 ring-blue-200/70 transition hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2"
      >
        {iniciales}
      </button>

      {/* Menú desplegable flotante */}
      {menuAbierto && (
        <div
          role="menu"
          aria-label="Menú de usuario"
          className="absolute right-0 top-full z-50 mt-3 w-[min(320px,calc(100vw-24px))] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Sección de información y datos del usuario */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700 ring-1 ring-blue-200">
                {iniciales}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {nombre}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">{correo}</p>
              </div>
            </div>

            {/* Badges de Rol y Estado de Cuenta */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
                {rol}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Cuenta activa
              </span>
            </div>
          </div>

          {/* Sección de acciones: Cerrar sesión */}
          <div className="border-t border-slate-100 bg-slate-50/70 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={cerrarSesion}
              disabled={cerrandoSesion}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:opacity-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:bg-red-200">
                <LogOut size={20} aria-hidden="true" />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-semibold text-red-600">
                  {cerrandoSesion ? "Cerrando sesión..." : "Cerrar sesión"}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Salir de tu cuenta de forma segura
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
