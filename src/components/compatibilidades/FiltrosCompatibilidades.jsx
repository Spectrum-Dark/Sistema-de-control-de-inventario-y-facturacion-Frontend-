import { Filter, Plus, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

// Componente de barra de filtros y búsqueda específica para el módulo de compatibilidades (incluye buscador, selector de marcas y botón de creación).
export default function FiltrosCompatibilidades({
  filtros,
  marcas,
  onCambiar,
  onLimpiar,
  hayFiltros,
  puedeCrear,
  onNuevo,
}) {
  return (
    // Sección contenedora principal con bordes redondeados, sombra suave y diseño responsivo.
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda y filtros de compatibilidades"
    >
      {/* Cabecera del filtro: contiene el icono indicativo, título, subtítulo explicativo y el botón de crear nueva compatibilidad */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Filter size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-slate-800">
              Buscar compatibilidades
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Filtra las relaciones por producto, código, marca o modelo.
            </p>
          </div>
        </div>

        {/* Botón de creación condicional (solo visible si el usuario cuenta con el permiso 'puedeCrear') */}
        {puedeCrear && (
          <button
            type="button"
            onClick={() => onNuevo()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-800 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Nueva compatibilidad</span>
            <span className="sm:hidden">Nueva</span>
          </button>
        )}
      </div>

      {/* Cuadrícula (grid) que organiza los controles de búsqueda: campo de texto, selector de marca y botón de reinicio */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-center">
        {/* Campo de búsqueda interactivo para filtrar por texto (producto, código, etc.) */}
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Producto, código, marca o modelo"
        />

        {/* Selector desplegable de marcas que mapea dinámicamente las opciones disponibles */}
        <SelectFiltro
          etiqueta="Filtrar por marca"
          valor={filtros.marca}
          onChange={(valor) => onCambiar('marca', valor)}
          className="w-full"
        >
          <option value="">Todas las marcas</option>
          {marcas.map((marca) => (
            <option key={marca.id_marca} value={marca.id_marca}>
              {marca.nombre_marca}
            </option>
          ))}
        </SelectFiltro>

        {/* Botón condicional para limpiar los filtros aplicados (se muestra solo cuando hayFiltros es verdadero) */}
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
