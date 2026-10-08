function FormularioModelos({
  modoEdicion,
  formulario,
  manejarCambio,
  registrarModelo,
  marcas = [],
  cancelar,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              modoEdicion ? "bg-amber-500 animate-pulse" : "bg-sky-500"
            }`}
          ></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {modoEdicion ? "Edición de Modelo" : "Registro de Nuevo Modelo"}
          </h3>
        </div>
      </div>

      <form onSubmit={registrarModelo} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Marca Selector */}
          <div>
            <label
              htmlFor="id_marca"
              className="block text-xs font-semibold text-slate-600"
            >
              Marca del vehículo <span className="text-rose-500">*</span>
            </label>
            <select
              id="id_marca"
              name="id_marca"
              value={formulario.id_marca}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((marca) => (
                <option key={marca.id_marca} value={marca.id_marca}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre del Modelo */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs font-semibold text-slate-600"
            >
              Nombre del modelo <span className="text-rose-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
              placeholder="Ej. Corolla, Hilux, Civic"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={cancelar}
            className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
              modoEdicion
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {modoEdicion ? "Guardar Cambios" : "Registrar Modelo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioModelos;
