import { FilePlus2, Filter, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';

// Componente de barra de filtros y búsqueda específica para el módulo de facturas (incluye buscador por texto, filtro de estado y botón para emitir nueva factura).
export default function FiltrosFacturas({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
  puedeCrear,
  onEmitir,
}) {
  return (
    // Sección contenedora principal con bordes redondeados, sombra suave y diseño responsivo adaptado para diferentes pantallas.
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda y filtros de facturas"
    >
      {/* Cabecera del filtro: incluye icono decorativo, título principal, descripción normativa y el botón de emisión condicional */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Filter size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-slate-800">
              Buscar y filtrar facturas
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Solo se emiten facturas para ventas confirmadas aún sin facturar.
            </p>
          </div>
        </div>

        {/* Botón de emisión condicional (se renderiza únicamente si el usuario cuenta con el permiso 'puedeCrear') */}
        {puedeCrear && (
          <button
            type="button"
            onClick={onEmitir}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-800 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <FilePlus2 size={15} />
            <span className="hidden sm:inline">Emitir factura</span>
            <span className="sm:hidden">Emitir</span>
          </button>
        )}
      </div>

      {/* Cuadrícula (grid) que organiza los controles de búsqueda: campo de texto, selector de estado y botón de reinicio */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_210px_auto] sm:items-center">
        {/* Campo de búsqueda interactivo por texto libre */}
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Número de factura, venta o cliente"
        />

        {/* Selector desplegable para filtrar las facturas según su estado actual */}
        <SelectFiltro
          etiqueta="Filtrar por estado"
          valor={filtros.estado}
          onChange={(valor) => onCambiar('estado', valor)}
          className="w-full"
        >
          <option value="">Todos los estados</option>
          <option value="Emitida">Emitidas</option>
          <option value="Anulada">Anuladas</option>
        </SelectFiltro>

        {/* Botón condicional para limpiar o restablecer los filtros aplicados (visible solo si hay filtros activos) */}
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
