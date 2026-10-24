import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { precargarRuta } from "../../services/compartido/precargarRuta";

export default function GrupoMenu({ nombre, icono: Icono, hijos, onNavegar }) {
  const { pathname } = useLocation();

  const grupoActivo = hijos.some((hijo) => pathname.startsWith(hijo.ruta));
  const [abierto, setAbierto] = useState(grupoActivo);
  const submenuId = `submenu-${nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls={submenuId}
        className={`group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          grupoActivo
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${grupoActivo ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 group-hover:text-slate-700"}`}>
          <Icono size={17} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{nombre}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={submenuId}
        className={`grid transition-[grid-template-rows] duration-200 ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-[26px] mt-1.5 space-y-0.5 border-l border-slate-200 pl-3">
            {hijos.map(({ nombre: nombreHijo, ruta }) => (
              <NavLink
                key={ruta}
                to={ruta}
                onClick={onNavegar}
                onMouseEnter={() => precargarRuta(ruta)}
                onFocus={() => precargarRuta(ruta)}
                tabIndex={abierto ? 0 : -1}
                className={({ isActive }) =>
                  `relative block min-h-9 rounded-lg px-3 py-2 text-xs transition duration-150 ${
                    isActive
                      ? "bg-slate-900 font-semibold text-white shadow-sm before:absolute before:-left-17px before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-slate-900 before:ring-2 before:ring-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {nombreHijo}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
