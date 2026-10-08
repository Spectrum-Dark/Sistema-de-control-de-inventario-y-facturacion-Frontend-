function FormularioCompatibilidades({
  modoEdicion,
  formulario,
  manejarCambio,
  registrarCompatibilidad,
  productos = [],
  marcas = [],
  modelosDisponibles = [],
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
            {modoEdicion
              ? "Edición de Compatibilidad"
              : "Registro de Nueva Compatibilidad"}
          </h3>
        </div>
      </div>

      <form onSubmit={registrarCompatibilidad} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Producto */}
          <div>
            <label
              htmlFor="id_producto"
              className="block text-xs font-semibold text-slate-600"
            >
              Producto <span className="text-rose-500">*</span>
            </label>
            <select
              id="id_producto"
              name="id_producto"
              value={formulario.id_producto}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            >
              <option value="">Seleccione un producto</option>
              {productos.map((prod) => (
                <option key={prod.id_producto} value={prod.id_producto}>
                  {prod.codigo_producto} - {prod.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
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
              {marcas.map((m) => (
                <option key={m.id_marca} value={m.id_marca}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label
              htmlFor="id_modelo"
              className="block text-xs font-semibold text-slate-600"
            >
              Modelo del vehículo <span className="text-rose-500">*</span>
            </label>
            <select
              id="id_modelo"
              name="id_modelo"
              value={formulario.id_modelo}
              onChange={manejarCambio}
              required
              disabled={!formulario.id_marca}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {formulario.id_marca
                  ? "Seleccione un modelo"
                  : "Primero seleccione marca"}
              </option>
              {modelosDisponibles.map((mod) => (
                <option key={mod.id_modelo} value={mod.id_modelo}>
                  {mod.nombre}
                </option>
              ))}
            </select>
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
            {modoEdicion ? "Guardar Cambios" : "Registrar Compatibilidad"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioCompatibilidades;
