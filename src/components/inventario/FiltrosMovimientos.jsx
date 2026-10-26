import { Filter, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

// Componente de barra de filtros y búsqueda 'FiltrosMovimientos' para la gestión y consulta de movimientos de inventario (incluye buscador por texto libre, selector dinámico de tipos y botón de limpieza).
export default function FiltrosMovimientos({
  filtros,
  tipos,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    // Sección contenedora principal con bordes redondeados, sombra suave y diseño responsivo adaptado para diferentes pantallas.
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda y filtros de movimientos"
    >
      {/* Cabecera del filtro: incluye icono decorativo, título principal y descripción orientativa */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
          <Filter size={16} />
        </span>
        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-slate-800">
            Buscar y filtrar movimientos
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Encuentra un movimiento por producto, motivo, usuario o compra.
          </p>
        </div>
      </div>

      {/* Cuadrícula (grid) que organiza de manera fluida el campo de búsqueda, el selector desplegable y el botón de reinicio */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_230px_auto] sm:items-center">
        {/* Campo de búsqueda interactivo por texto libre */}
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Producto, motivo, usuario o compra"
        />

        {/* Selector desplegable para filtrar los movimientos según su tipo específico */}
        <SelectFiltro
          etiqueta="Filtrar por tipo"
          valor={filtros.tipo}
          onChange={(valor) => onCambiar('tipo', valor)}
          className="w-full"
        >
          <option value="">Todos los tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </SelectFiltro>

        {/* Botón condicional para limpiar o restablecer los filtros aplicados (visible únicamente cuando hay filtros activos) */}
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
