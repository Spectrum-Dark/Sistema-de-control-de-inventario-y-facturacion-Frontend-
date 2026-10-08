function FormularioMarcas({
  modoEdicion,
  formulario,
  manejarCambio,
  registrarMarca,
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
            {modoEdicion ? "Edición de Marca" : "Registro de Nueva Marca"}
          </h3>
        </div>
      </div>

      <form onSubmit={registrarMarca} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-xs font-semibold text-slate-600"
          >
            Nombre de la marca <span className="text-rose-500">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
            placeholder="Ej. Toyota, Nissan, Honda"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="descripcion"
            className="block text-xs font-semibold text-slate-600"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="3"
            value={formulario.descripcion}
            onChange={manejarCambio}
            placeholder="Breve información sobre el fabricante de vehículos..."
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          />
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
            {modoEdicion ? "Guardar Cambios" : "Registrar Marca"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioMarcas;
