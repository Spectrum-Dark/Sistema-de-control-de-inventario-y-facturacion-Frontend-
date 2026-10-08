function FiltrosCompatibilidades({
  busqueda,
  setBusqueda,
  marcas = [],
  marcaSeleccionadaFiltro,
  setMarcaSeleccionadaFiltro,
  modeloSeleccionadoFiltro,
  setModeloSeleccionadoFiltro,
  modelosDisponiblesFiltro = [],
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Buscador general */}
        <div>
          <label
            htmlFor="buscar-compatibilidad"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Buscar
          </label>
          <input
            id="buscar-compatibilidad"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Producto, marca o modelo..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Filtro por Marca */}
        <div>
          <label
            htmlFor="filtro-marca"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Marca
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

        {/* Filtro por Modelo */}
        <div>
          <label
            htmlFor="filtro-modelo"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Modelo
          </label>
          <select
            id="filtro-modelo"
            value={modeloSeleccionadoFiltro}
            onChange={(e) => setModeloSeleccionadoFiltro(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
          >
            <option value="">Todos los modelos</option>
            {modelosDisponiblesFiltro.map((modelo) => (
              <option key={modelo.id_modelo} value={modelo.id_modelo}>
                {modelo.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltrosCompatibilidades;
