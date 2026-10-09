/**
 * Componente de filtros para la consulta de facturas.
 * Permite filtrar por término de búsqueda (número o cliente) y rango de fechas.
 */
export default function Filtros_Facturas({
  busqueda,
  fechaDesde,
  fechaHasta,
  setBusqueda,
  setFechaDesde,
  setFechaHasta,
  limpiarFiltros,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Consultar facturas
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
        {/* Búsqueda por número o cliente */}
        <div>
          <label
            htmlFor="busqueda"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Número de factura o cliente
          </label>

          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar por código o cliente..."
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Fecha Desde */}
        <div>
          <label
            htmlFor="fecha_desde"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Fecha desde
          </label>

          <input
            id="fecha_desde"
            type="date"
            value={fechaDesde}
            onChange={(evento) => setFechaDesde(evento.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <label
            htmlFor="fecha_hasta"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Fecha hasta
          </label>

          <input
            id="fecha_hasta"
            type="date"
            value={fechaHasta}
            onChange={(evento) => setFechaHasta(evento.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={limpiarFiltros}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98]"
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}