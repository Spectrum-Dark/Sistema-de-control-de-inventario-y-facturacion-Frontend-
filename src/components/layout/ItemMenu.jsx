import { NavLink } from "react-router-dom";

export default function ItemMenu({ nombre, ruta, icono: Icono, onNavegar }) {
  return (
    <NavLink
      to={ruta}
      onClick={onNavegar}
      className={({ isActive }) =>
        `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          isActive
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${isActive ? "bg-white/10 text-white" : "text-slate-400 group-hover:text-slate-700"}`}>
            <Icono size={17} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1 truncate">{nombre}</span>
          {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden="true" />}
        </>
      )}
    </NavLink>
  );
}
