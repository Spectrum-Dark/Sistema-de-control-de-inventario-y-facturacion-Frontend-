/**
 * Componente Detalle_Factura_Panel.
 * Muestra el detalle de la factura con opciones de formato e impresión.
 */
export default function Detalle_Factura_Panel({
  facturaSeleccionada,
  formatoImpresion,
  setFormatoImpresion,
  consultarFactura,
  imprimirConFormato,
}) {
  if (!facturaSeleccionada) return null;

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
      {/* Encabezado sin la botón 'X' */}
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Detalle de la factura
        </h2>
      </div>

      {/* Información general de la factura */}
      <div id="factura-imprimible" className="space-y-4 text-xs text-slate-700">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Número
            </span>
            <span className="font-bold text-slate-900">
              {facturaSeleccionada.numero_factura}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Fecha
            </span>
            <span>{facturaSeleccionada.fecha}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Cliente
            </span>
            <span className="font-semibold text-slate-800">
              {facturaSeleccionada.cliente}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Estado
            </span>
            <span className="font-bold text-emerald-600">
              {facturaSeleccionada.estado}
            </span>
          </div>
        </div>

        {/* Tabla de ítems */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">Código</th>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio unitario</th>
                <th className="px-4 py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facturaSeleccionada.detalles.map((detalle) => (
                <tr key={detalle.id_producto}>
                  <td className="px-4 py-2 font-semibold text-slate-900">
                    {detalle.codigo_producto}
                  </td>
                  <td className="px-4 py-2">{detalle.producto}</td>
                  <td className="px-4 py-2">{detalle.cantidad}</td>
                  <td className="px-4 py-2">
                    C$ {Number(detalle.precio_venta).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-slate-900">
                    C$ {Number(detalle.subtotal).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end text-sm font-black text-slate-900">
          Total: C$ {Number(facturaSeleccionada.total).toFixed(2)}
        </div>
      </div>

      {/* BARRA DE ACCIONES Y BOTONES */}
      <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Selector de formato */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="formato_impresion"
            className="text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Formato:
          </label>
          <select
            id="formato_impresion"
            value={formatoImpresion}
            onChange={(evento) => setFormatoImpresion(evento.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-800 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="58mm">Voucher térmico - 58 mm</option>
            <option value="80mm">Voucher térmico - 80 mm</option>
            <option value="a4">Hoja convencional - A4</option>
          </select>
        </div>

        {/* Acciones principales */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => consultarFactura(null)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            Cerrar detalle
          </button>

          <button
            type="button"
            onClick={imprimirConFormato}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Imprimir comprobante
          </button>
        </div>
      </div>
    </section>
  );
}
