import { NavLink } from "react-router-dom";

export default function ItemMenu({ nombre, ruta, icono: Icono, onNavegar }) {
  return (
    <NavLink
      to={ruta}
      onClick={onNavegar}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          isActive
            ? "bg-slate-800 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`
      }
    >
      <Icono size={18} />
      {nombre}
    </NavLink>
  );
}
