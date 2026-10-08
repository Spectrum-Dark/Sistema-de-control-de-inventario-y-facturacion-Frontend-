function FiltrosCategoria({ busqueda, setBusqueda }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="w-full md:w-1/2">
        <label
          htmlFor="buscar-categoria"
          className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
        >
          Buscar categoría
        </label>
        <input
          id="buscar-categoria"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o descripción..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}

export default FiltrosCategoria;
