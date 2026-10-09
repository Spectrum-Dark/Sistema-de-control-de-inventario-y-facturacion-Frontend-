export default function Informacion_Venta({
  formulario,
  clientes,
  manejarCambioFormulario,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Información de la venta
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Cliente Registrado */}
        <div>
          <label
            htmlFor="id_cliente"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Cliente Registrado <span className="text-rose-500">*</span>
          </label>
          <select
            id="id_cliente"
            name="id_cliente"
            value={formulario.id_cliente}
            onChange={manejarCambioFormulario}
            required
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre Cliente (Opcional / Venta Rápida) */}
        <div>
          <label
            htmlFor="nombre_cliente_comprobante"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Nombre en Factura / Cliente
          </label>
          <input
            id="nombre_cliente_comprobante"
            type="text"
            name="nombre_cliente_comprobante"
            value={formulario.nombre_cliente_comprobante}
            onChange={manejarCambioFormulario}
            placeholder="Ej. Juan Pérez (Opcional)"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Fecha de Venta */}
        <div>
          <label
            htmlFor="fecha_venta"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Fecha de venta <span className="text-rose-500">*</span>
          </label>
          <input
            id="fecha_venta"
            type="date"
            name="fecha_venta"
            value={formulario.fecha_venta}
            onChange={manejarCambioFormulario}
            required
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Observaciones */}
        <div className="sm:col-span-2 lg:col-span-3">
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
            placeholder="Información adicional de la venta"
            rows="2"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>
    </section>
  );
}
