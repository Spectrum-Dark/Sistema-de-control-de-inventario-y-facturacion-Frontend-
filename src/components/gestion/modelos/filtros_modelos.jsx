function FiltrosModelos({
  busqueda,
  setBusqueda,
  marcas = [],
  marcaSeleccionadaFiltro,
  setMarcaSeleccionadaFiltro,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Buscador de texto */}
        <div>
          <label
            htmlFor="buscar-modelo"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Buscar modelo
          </label>
          <input
            id="buscar-modelo"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por modelo o marca..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Filtro por Marca */}
        <div>
          <label
            htmlFor="filtro-marca"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Filtrar por marca
          </label>
          <select
            id="filtro-marca"
            value={marcaSeleccionadaFiltro}
            onChange={(e) => setMarcaSeleccionadaFiltro(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
          >
            <option value="">Todas las marcas</option>
            {marcas.map((marca) => (
              <option key={marca.id_marca} value={marca.id_marca}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltrosModelos;
