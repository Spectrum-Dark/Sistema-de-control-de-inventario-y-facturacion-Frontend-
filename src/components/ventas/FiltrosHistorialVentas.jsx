import { Filter, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';

// Componente 'FiltrosHistorialVentas' encargado de proporcionar la interfaz de búsqueda por texto libre y filtrado dentro del registro del historial de ventas, soportando la limpieza de parámetros activos.
export default function FiltrosHistorialVentas({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Búsqueda del historial de ventas"
    >
      {/* Cabecera descriptiva con icono, título e información orientativa */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
          <Filter size={16} />
        </span>
        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-slate-800">
            Buscar en el historial
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Busca por venta, operación, usuario o motivo.
          </p>
        </div>
      </div>

      {/* Cuadrícula adaptable que distribuye el campo de búsqueda y el botón condicional para restablecer los filtros */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <CampoBusqueda
          valor={filtros.busqueda}
          onChange={(valor) => onCambiar('busqueda', valor)}
          placeholder="Venta, operación, usuario o motivo"
        />
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
