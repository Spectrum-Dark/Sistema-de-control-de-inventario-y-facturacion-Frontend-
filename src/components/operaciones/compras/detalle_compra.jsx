export default function Detalle_Compra({
  detalles,
  manejarCambioDetalle,
  eliminarProducto,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Detalle de la compra
      </h2>

      {detalles.length === 0 ? (
        <p className="text-xs text-slate-500">
          Todavía no has agregado productos.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Código</th>
                <th className="px-4 py-2.5">Producto</th>
                <th className="px-4 py-2.5 w-32">Cantidad</th>
                <th className="px-4 py-2.5 w-36">Precio de compra</th>
                <th className="px-4 py-2.5">Subtotal</th>
                <th className="px-4 py-2.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {detalles.map((detalle) => (
                <tr key={detalle.id_producto}>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">
                    {detalle.codigo_producto}
                  </td>
                  <td className="px-4 py-2.5">{detalle.nombre}</td>

                  {/* Cantidad */}
                  <td className="px-4 py-1.5">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={detalle.cantidad}
                      onChange={(evento) =>
                        manejarCambioDetalle(
                          detalle.id_producto,
                          "cantidad",
                          evento.target.value,
                        )
                      }
                      aria-label={`Cantidad de ${detalle.nombre}`}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </td>

                  {/* Precio de compra */}
                  <td className="px-4 py-1.5">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={detalle.precio_compra}
                      onChange={(evento) =>
                        manejarCambioDetalle(
                          detalle.id_producto,
                          "precio_compra",
                          evento.target.value,
                        )
                      }
                      aria-label={`Precio de compra de ${detalle.nombre}`}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </td>

                  {/* Subtotal */}
                  <td className="px-4 py-2.5 font-bold text-slate-900">
                    C$ {Number(detalle.subtotal).toFixed(2)}
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => eliminarProducto(detalle.id_producto)}
                      className="font-semibold text-rose-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
