import { Filter, Plus, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

export default function FiltrosClientes({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
  puedeCrear,
  onNuevo,
}) {
  return (
    // Contenedor principal de la sección de filtros, con diseño responsivo, bordes redondeados y sombra sutil.
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda y filtros de clientes"
    >
      {/* Cabecera del componente: Agrupa el título descriptivo y el botón de creación */}
      <div className="mb-4 flex items-center justify-between gap-3">
        {/* Contenedor del icono de filtro y los textos explicativos */}
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Icono visual representativo de filtros */}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Filter size={16} />
          </span>
          <div className="min-w-0">
            {/* Título principal de la sección */}
            <h2 className="text-xs font-semibold text-slate-800">
              Buscar y filtrar clientes
            </h2>
            {/* Subtítulo orientativo para el usuario */}
            <p className="mt-0.5 text-[11px] text-slate-500">
              Encuentra clientes por nombre, identificación o contacto.
            </p>
          </div>
        </div>

        {/* Renderizado condicional: Muestra el botón de "Nuevo cliente" solo si el usuario tiene permisos (puedeCrear es true) */}
        {puedeCrear && (
          <button
            type="button"
            onClick={() => onNuevo()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-800 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <Plus size={15} />
            {/* Texto adaptable según el tamaño de pantalla (completo en pantallas medianas o más grandes, corto en móviles) */}
            <span className="hidden sm:inline">Nuevo cliente</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        )}
      </div>

      {/* Cuerpo de los filtros: Distribución en cuadrícula adaptativa para barra de búsqueda, selector de estado y botón de limpiar */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_210px_auto] sm:items-center">
        {/* Componente reutilizable para la búsqueda textual de clientes */}
        <CampoBusqueda
          valor={filtros.busqueda} // Valor actual del input de búsqueda
          onChange={(valor) => onCambiar('busqueda', valor)} // Dispara la actualización del estado global de filtros
          placeholder="Nombre, identificación o contacto" // Texto guía dentro del input
        />

        {/* Componente selector para filtrar según el estado del cliente */}
        <SelectFiltro
          etiqueta="Filtrar por estado"
          valor={filtros.estado} // Estado seleccionado actualmente
          onChange={(valor) => onCambiar('estado', valor)} // Actualiza el filtro de estado
          className="w-full"
        >
          {/* Opciones disponibles del selector */}
          <option value="">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </SelectFiltro>

        {/* Renderizado condicional: El botón de limpiar filtros solo aparece si hay filtros activos (hayFiltros es true) */}
        {hayFiltros && (
          <button
            type="button"
            onClick={onLimpiar} // Restablece los filtros a su estado inicial
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <RotateCcw size={14} /> Limpiar
          </button>
        )}
      </div>
    </section>
  );
}
