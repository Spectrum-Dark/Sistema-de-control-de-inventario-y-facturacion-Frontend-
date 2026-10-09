export default function Filtros_Inventario({
  busqueda,
  filtroEstado,
  setBusqueda,
  setFiltroEstado,
  limpiarFiltros,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Consultar existencias
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Búsqueda general */}
        <div className="flex-1">
          <label
            htmlFor="busqueda"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Buscar producto
          </label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Código, nombre o categoría..."
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Filtro por estado */}
        <div className="w-full sm:w-48">
          <label
            htmlFor="filtro_estado"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Estado de existencias
          </label>
          <select
            id="filtro_estado"
            value={filtroEstado}
            onChange={(evento) => setFiltroEstado(evento.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Normal">Normal</option>
            <option value="Bajo">Bajo</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>

        {/* Limpiar Filtros */}
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
