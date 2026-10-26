import { Filter, Plus, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

// Componente 'FiltrosProveedores' encargado de proporcionar la interfaz de búsqueda por texto libre y filtrado por estado para la gestión del directorio de proveedores.
export default function FiltrosProveedores({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
  puedeCrear,
  onNuevo,
}) {
  return (
    // Sección contenedora principal con bordes redondeados, fondo blanco, sombra sutil y diseño adaptable (responsivo).
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda y filtros de proveedores"
    >
      {/* Cabecera que agrupa el icono descriptivo, el título, un subtítulo orientativo y el botón condicional de registro */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Filter size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-slate-800">
              Buscar y filtrar proveedores
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Encuentra proveedores por empresa, contacto o estado.
            </p>
          </div>
        </div>

        {/* Botón de creación condicional (se renderiza únicamente si el usuario cuenta con permisos de creación) */}
        {puedeCrear && (
          <button
            type="button"
            onClick={() => onNuevo()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-800 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Nuevo proveedor</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        )}
      </div>

      {/* Cuadrícula (grid) organizada para distribuir fluidamente el buscador, el selector de estado y el botón de reinicio */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_210px_auto] sm:items-center">
        {/* Campo de búsqueda interactivo por texto libre (nombre, identificación o contacto del proveedor) */}
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Nombre, identificación o contacto"
        />

        {/* Selector desplegable para filtrar los registros según su estado operativo actual (Activo / Inactivo) */}
        <SelectFiltro
          etiqueta="Filtrar por estado"
          valor={filtros.estado}
          onChange={(valor) => onCambiar('estado', valor)}
          className="w-full"
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </SelectFiltro>

        {/* Botón condicional para restablecer los filtros aplicados (visible solamente si hay filtros activos) */}
        {hayFiltros && (
          <button
            type="button"
            onClick={onLimpiar}
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <RotateCcw size={14} />
            Limpiar
          </button>
        )}
      </div>
    </section>
  );
}
