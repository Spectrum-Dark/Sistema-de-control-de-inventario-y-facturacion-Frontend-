import { X } from "lucide-react";
import CampoBusqueda from "./CampoBusqueda";

export default function BarraFiltros({
  busqueda,
  onBusqueda,
  placeholder,
  hayFiltros,
  onLimpiar,
  children,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="sm:flex-1">
        <CampoBusqueda
          valor={busqueda}
          onChange={onBusqueda}
          placeholder={placeholder}
        />
      </div>

      {children}

      {hayFiltros && (
        <button
          type="button"
          onClick={onLimpiar}
          className="flex items-center justify-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <X size={16} />
          Limpiar
        </button>
      )}
    </div>
  );
}
