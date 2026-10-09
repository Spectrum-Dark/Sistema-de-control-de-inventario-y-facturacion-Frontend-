export default function Informacion_Compra({
  formulario,
  proveedores,
  manejarCambioFormulario,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Información de la compra
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Proveedor */}
        <div>
          <label
            htmlFor="id_proveedor"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Proveedor <span className="text-rose-500">*</span>
          </label>
          <select
            id="id_proveedor"
            name="id_proveedor"
            value={formulario.id_proveedor}
            onChange={manejarCambioFormulario}
            required
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((proveedor) => (
              <option
                key={proveedor.id_proveedor}
                value={proveedor.id_proveedor}
              >
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de compra */}
        <div>
          <label
            htmlFor="fecha_compra"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Fecha de compra <span className="text-rose-500">*</span>
          </label>
          <input
            id="fecha_compra"
            type="date"
            name="fecha_compra"
            value={formulario.fecha_compra}
            onChange={manejarCambioFormulario}
            required
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Observación */}
        <div className="sm:col-span-2">
          <label
            htmlFor="observacion"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Observación
          </label>
          <textarea
            id="observacion"
            name="observacion"
            value={formulario.observacion}
            onChange={manejarCambioFormulario}
            placeholder="Información adicional de la compra"
            rows="2"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>
    </section>
  );
}
