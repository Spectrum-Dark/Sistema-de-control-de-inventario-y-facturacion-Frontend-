import { NavLink } from "react-router-dom";
import { precargarRuta } from "../../services/compartido/precargarRuta";

export default function ItemMenu({ nombre, ruta, icono: Icono, onNavegar }) {
  return (
    <NavLink
      to={ruta}
      onClick={onNavegar}
      onMouseEnter={() => precargarRuta(ruta)}
      onFocus={() => precargarRuta(ruta)}
      className={({ isActive }) =>
        `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          isActive
            ? "bg-white/10 text-white shadow-sm"
            : "text-white/75 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${isActive ? "bg-white/10 text-white" : "text-white/45 group-hover:text-white/85"}`}>
            <Icono size={17} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1 truncate">{nombre}</span>
          {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden="true" />}
        </>
      )}
    </NavLink>
  );
}
