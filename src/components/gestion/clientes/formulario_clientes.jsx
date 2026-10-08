function FormularioClientes({
  modoEdicion,
  formulario,
  manejarCambio,
  registrarCliente,
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
            {modoEdicion ? "Edición de Cliente" : "Registro de Nuevo Cliente"}
          </h3>
        </div>
      </div>

      <form onSubmit={registrarCliente} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs font-semibold text-slate-600"
            >
              Nombre <span className="text-rose-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
              placeholder="Ej. Juan"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Apellido */}
          <div>
            <label
              htmlFor="apellido"
              className="block text-xs font-semibold text-slate-600"
            >
              Apellido <span className="text-rose-500">*</span>
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              value={formulario.apellido}
              onChange={manejarCambio}
              required
              placeholder="Ej. Pérez"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="telefono"
              className="block text-xs font-semibold text-slate-600"
            >
              Teléfono de contacto <span className="text-rose-500">*</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="text"
              value={formulario.telefono}
              onChange={manejarCambio}
              required
              placeholder="Ej. 8888-1000"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label
              htmlFor="correo_electronico"
              className="block text-xs font-semibold text-slate-600"
            >
              Correo electrónico
            </label>
            <input
              id="correo_electronico"
              name="correo_electronico"
              type="email"
              value={formulario.correo_electronico}
              onChange={manejarCambio}
              placeholder="cliente@ejemplo.com"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Dirección */}
          <div className="sm:col-span-2">
            <label
              htmlFor="direccion"
              className="block text-xs font-semibold text-slate-600"
            >
              Dirección de residencia
            </label>
            <textarea
              id="direccion"
              name="direccion"
              rows="3"
              value={formulario.direccion}
              onChange={manejarCambio}
              placeholder="Dirección domiciliar del cliente..."
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
            {modoEdicion ? "Guardar Cambios" : "Registrar Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioClientes;
