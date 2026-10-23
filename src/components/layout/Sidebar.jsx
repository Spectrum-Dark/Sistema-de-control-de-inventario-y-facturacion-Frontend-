import { Package, X } from "lucide-react";
import { menuPrincipal, filtrarMenuPorRol } from "../../utils/layout/menu";
import { useAuth } from "../../hooks/sesion/useAuth";
import ItemMenu from "./ItemMenu";
import GrupoMenu from "./GrupoMenu";

export default function Sidebar({ abierto, onCerrar }) {
  const { usuario } = useAuth();

  const opcionesVisibles = filtrarMenuPorRol(menuPrincipal, usuario?.id_rol);

  return (
    <>
      {/* Fondo oscuro: solo en móvil cuando el menú está abierto */}
      {abierto && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onCerrar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-white">
              <Package size={20} />
            </div>
            <span className="text-sm font-semibold text-slate-900">
              Inventario y Facturación
            </span>
          </div>

          <button
            onClick={onCerrar}
            className="text-slate-500 hover:text-slate-700 lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Opciones */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {opcionesVisibles.map((item) =>
            item.hijos ? (
              <GrupoMenu key={item.nombre} {...item} onNavegar={onCerrar} />
            ) : (
              <ItemMenu key={item.ruta} {...item} onNavegar={onCerrar} />
            ),
          )}
        </nav>

      </aside>
    </>
  );
}
