function FiltrosProductos({
  busqueda,
  setBusqueda,
  categorias = [],
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  marcas = [],
  marcaSeleccionada,
  setMarcaSeleccionada,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Campo de búsqueda principal */}
        <div className="md:col-span-1">
          <label
            htmlFor="buscar-producto"
            className="mb-1 block text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            Buscar producto
          </label>
          <div className="relative">
            <input
              id="buscar-producto"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Código, nombre o repuesto..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-8 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Selector de Categoría */}
        <div>
          <label
            htmlFor="filtro-categoria"
            className="mb-1 block text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            Categoría
          </label>
          <select
            id="filtro-categoria"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 px-3 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Marca */}
        <div>
          <label
            htmlFor="filtro-marca"
            className="mb-1 block text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            Marca
          </label>
          <select
            id="filtro-marca"
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 px-3 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
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

export default FiltrosProductos;
