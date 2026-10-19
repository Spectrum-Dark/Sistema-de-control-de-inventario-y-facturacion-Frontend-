import { Menu } from "lucide-react";
import { useAuth } from "../../hooks/sesion/useAuth";
import { ROLES } from "../../utils/sesion/roles";

export default function Encabezado({ onAbrirMenu }) {
  const { usuario } = useAuth();

  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        onClick={onAbrirMenu}
        className="text-slate-600 hover:text-slate-900 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>

      <h2 className="text-sm font-medium text-slate-700">Panel principal</h2>

      {usuario && (
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-900">
              {usuario.nombre_completo}
            </p>
            <p className="text-xs text-slate-500">{ROLES[usuario.id_rol]}</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-white">
            {usuario.nombre_completo.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </header>
  );
}
