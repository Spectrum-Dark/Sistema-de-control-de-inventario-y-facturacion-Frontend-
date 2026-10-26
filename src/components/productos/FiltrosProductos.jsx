import { Filter, Plus, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

// Componente 'FiltrosProductos' para gestionar la búsqueda por texto, filtrado por categoría y estado, y la acción de registro de nuevos productos (repuestos) en el sistema.
export default function FiltrosProductos({
  filtros,
  categorias,
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
      aria-label="Búsqueda y filtros de productos"
    >
      {/* Cabecera que agrupa el icono decorativo, el título, subtítulo orientativo y el botón de creación condicional */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Filter size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-slate-800">
              Buscar y filtrar productos
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Encuentra repuestos por código, nombre, categoría o estado.
            </p>
          </div>
        </div>

        {/* Botón de creación condicional (se muestra únicamente si el usuario cuenta con permisos de creación) */}
        {puedeCrear && (
          <button
            type="button"
            onClick={() => onNuevo()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-800 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Nuevo producto</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        )}
      </div>

      {/* Cuadrícula (grid) flexible para distribuir el campo de búsqueda, selectores y botón de reinicio */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_210px_180px_auto] xl:items-center">
        {/* Campo de búsqueda interactivo por texto libre (código, nombre o categoría del repuesto) */}
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Código, nombre o categoría"
        />

        {/* Selector desplegable para filtrar los productos según su categoría asociada */}
        <SelectFiltro
          etiqueta="Filtrar por categoría"
          valor={filtros.categoria}
          onChange={(valor) => onCambiar('categoria', valor)}
          className="w-full"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre_categoria}
            </option>
          ))}
        </SelectFiltro>

        {/* Selector desplegable para filtrar los productos según su estado operativo (Activo / Inactivo) */}
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

        {/* Botón condicional para restablecer los filtros aplicados (visible solo si hay filtros activos) */}
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
