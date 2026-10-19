import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function GrupoMenu({ nombre, icono: Icono, hijos, onNavegar }) {
  const { pathname } = useLocation();

  // El grupo está "activo" si alguna de sus páginas es la actual
  const grupoActivo = hijos.some((hijo) => pathname.startsWith(hijo.ruta));

  // Arranca abierto si estamos dentro de una de sus páginas
  const [abierto, setAbierto] = useState(grupoActivo);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          // CAMBIO 1: gris suave cuando estás dentro del grupo
          grupoActivo
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <Icono size={18} />
        <span className="flex-1 text-left">{nombre}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Contenedor que se expande y se contrae con animación */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
            {hijos.map(({ nombre: nombreHijo, ruta }) => (
              <NavLink
                key={ruta}
                to={ruta}
                onClick={onNavegar}
                tabIndex={abierto ? 0 : -1}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    // CAMBIO 2: oscuro sólido, igual que Dashboard y Usuarios
                    isActive
                      ? "bg-slate-800 font-medium text-white"
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
