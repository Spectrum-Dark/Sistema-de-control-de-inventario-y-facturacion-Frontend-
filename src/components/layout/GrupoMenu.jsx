import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { precargarRuta } from '../../services/compartido/precargarRuta';

// Componente 'GrupoMenu' para estructurar los menús desplegables (submenús) dentro de la barra de navegación lateral, soportando estados activos, animación de apertura/cierre y pre-carga de rutas optimizada.
export default function GrupoMenu({ nombre, icono: Icono, hijos, onNavegar }) {
  const { pathname } = useLocation();

  // Verifica si alguna de las rutas hijas coincide con la ruta actual para mantener el grupo abierto por defecto.
  const grupoActivo = hijos.some((hijo) => pathname.startsWith(hijo.ruta));
  const [abierto, setAbierto] = useState(grupoActivo);

  // Genera un ID único y seguro para la accesibilidad (ARIA) del submenú.
  const submenuId = `submenu-${nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="space-y-1">
      {/* Botón principal del grupo de menú (controla la expansión del submenú) */}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls={submenuId}
        className={`group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          grupoActivo
            ? 'bg-white/10 text-white'
            : 'text-white/75 hover:bg-white/5 hover:text-white'
        }`}
      >
        {/* Contenedor del icono representativo del grupo */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${grupoActivo ? 'bg-white/10 text-white' : 'text-white/45 group-hover:text-white/85'}`}
        >
          <Icono size={17} strokeWidth={1.8} />
        </span>

        {/* Nombre descriptivo del grupo de menú */}
        <span className="min-w-0 flex-1 truncate text-left">{nombre}</span>

        {/* Icono de flecha indicadora con animación de rotación al expandir/contraer */}
        <ChevronDown
          size={15}
          className={`shrink-0 text-white/45 transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Contenedor colapsable del submenú con transición fluida basada en grid-template-rows */}
      <div
        id={submenuId}
        className={`grid transition-[grid-template-rows] duration-200 ${
          abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="submenu-list mt-1.5 space-y-0.5 border-l border-white/15 pl-3">
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
                      ? 'submenu-active-link bg-white/10 font-semibold text-white shadow-sm'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
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
