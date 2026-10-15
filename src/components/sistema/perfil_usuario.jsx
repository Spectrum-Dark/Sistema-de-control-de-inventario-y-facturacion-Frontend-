import { useEffect, useRef, useState } from "react";

const iconos = {
  usuario: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </svg>
  ),
  ajustes: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" />
    </svg>
  ),
  salir: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
    </svg>
  ),
  flecha: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
};

function obtenerIniciales(nombre = "Usuario") {
  return (
    nombre
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase() || "U"
  );
}

export default function PerfilUsuario({
  usuario = {
    nombre: "Usuario",
    correo: "usuario@ejemplo.com",
    rol: "Administrador",
  },
  alCerrarSesion = () => {},
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const referencia = useRef(null);

  const nombre = usuario?.nombre || "Usuario";
  const correo = usuario?.correo || "Correo no disponible";
  const rol = usuario?.rol || "Sin rol asignado";

  useEffect(() => {
    function alPresionarTecla(evento) {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
      }
    }

    function alHacerClicFuera(evento) {
      if (referencia.current && !referencia.current.contains(evento.target)) {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("keydown", alPresionarTecla);
    document.addEventListener("mousedown", alHacerClicFuera);
    document.addEventListener("touchstart", alHacerClicFuera);

    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      document.removeEventListener("mousedown", alHacerClicFuera);
      document.removeEventListener("touchstart", alHacerClicFuera);
    };
  }, []);

  return (
    <div className="relative" ref={referencia}>
      <button
        type="button"
        onClick={() => setMenuAbierto((abierto) => !abierto)}
        aria-expanded={menuAbierto}
        aria-haspopup="menu"
        aria-label="Abrir menú de usuario"
        className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 text-left transition hover:border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700 ring-1 ring-blue-200/70">
          {obtenerIniciales(nombre)}
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="max-w-36 truncate text-sm font-semibold text-slate-800">
            {nombre}
          </p>
          <p className="max-w-36 truncate text-xs text-slate-500">{rol}</p>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`hidden h-4 w-4 text-slate-400 transition-transform sm:block ${
            menuAbierto ? "rotate-180" : ""
          }`}
        >
          <path
            d="m7 10 5 5 5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {menuAbierto && (
        <div
          role="menu"
          aria-label="Menú de usuario"
          className="absolute right-0 top-full z-50 mt-3 w-[min(340px,calc(100vw-24px))] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Información de la cuenta */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                {obtenerIniciales(nombre)}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="truncate text-sm font-bold text-slate-900">
                  {nombre}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">{correo}</p>

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
                    {rol}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Cuenta activa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Opciones de usuario */}
          <div className="p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => setMenuAbierto(false)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                {iconos.usuario}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-800">
                  Mi perfil
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Información y datos de la cuenta
                </span>
              </span>

              <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600">
                {iconos.flecha}
              </span>
            </button>
          </div>

          {/* Cierre de sesión */}
          <div className="border-t border-slate-100 bg-slate-50/70 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuAbierto(false);
                alCerrarSesion();
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:bg-red-200">
                {iconos.salir}
              </span>

              <span className="flex-1">
                <span className="block text-sm font-semibold text-red-600">
                  Cerrar sesión
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
