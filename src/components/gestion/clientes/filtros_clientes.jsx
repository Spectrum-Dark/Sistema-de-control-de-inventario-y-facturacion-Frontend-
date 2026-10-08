function FiltrosClientes({ busqueda, setBusqueda }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="w-full md:w-1/2">
        <label
          htmlFor="buscar-cliente"
          className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600"
        >
          Buscar cliente
        </label>
        <input
          id="buscar-cliente"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, apellido, teléfono o correo..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}

export default FiltrosClientes;
