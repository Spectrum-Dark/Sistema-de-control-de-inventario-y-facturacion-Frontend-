import { X } from "lucide-react";
import CampoBusqueda from "../compartido/CampoBusqueda";
import { ROLES } from "../../utils/sesion/roles";

const claseSelect =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-auto";

export default function FiltrosUsuarios({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="sm:flex-1">
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar("busqueda", valor)}
          placeholder="Buscar por nombre, usuario o correo"
        />
      </div>

      <select
        aria-label="Filtrar por rol"
        value={filtros.rol}
        onChange={(e) => onCambiar("rol", e.target.value)}
        className={claseSelect}
      >
        <option value="">Todos los roles</option>
        {Object.entries(ROLES).map(([id, nombre]) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por estado"
        value={filtros.estado}
        onChange={(e) => onCambiar("estado", e.target.value)}
        className={claseSelect}
      >
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>

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
