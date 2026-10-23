import BarraFiltros from "../compartido/BarraFiltros";

export default function FiltrosFacturas({ filtros, onCambiar, onLimpiar, hayFiltros }) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar factura, venta o cliente..."
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <select
        value={filtros.estado}
        onChange={(evento) => onCambiar("estado", evento.target.value)}
        aria-label="Filtrar por estado de factura"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-44"
      >
        <option value="">Todos los estados</option>
        <option value="Emitida">Emitida</option>
        <option value="Anulada">Anulada</option>
      </select>
    </BarraFiltros>
  );
}
