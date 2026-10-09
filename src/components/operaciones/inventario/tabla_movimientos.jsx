export default function Tabla_Movimientos({
  movimientos,
  productoSeleccionado,
  consultarProducto,
  paginaMovimientos,
  totalPaginasMovimientos,
  setPaginaMovimientos,
  totalMovimientosTotal,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          {productoSeleccionado
            ? `Movimientos de ${productoSeleccionado.nombre}`
            : "Movimientos de inventario"}
        </h2>

        {productoSeleccionado && (
          <button
            type="button"
            onClick={() => consultarProducto(null)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Ver todos los movimientos
          </button>
        )}
      </div>

      {movimientos.length === 0 ? (
        <p className="text-xs text-slate-500">
          No hay movimientos registrados para esta selección.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Fecha</th>
                  <th className="px-4 py-2.5">Código</th>
                  <th className="px-4 py-2.5">Producto</th>
                  <th className="px-4 py-2.5">Tipo</th>
                  <th className="px-4 py-2.5">Cantidad</th>
                  <th className="px-4 py-2.5">Referencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {movimientos.map((movimiento) => (
                  <tr key={movimiento.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-4 py-2.5 text-slate-500">{movimiento.fecha}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-900">{movimiento.codigo_producto}</td>
                    <td className="px-4 py-2.5">{movimiento.producto}</td>
                    <td className="px-4 py-2.5 font-semibold">
                      {movimiento.tipo === "Entrada" ? (
                        <span className="text-blue-600">Entrada</span>
                      ) : (
                        <span className="text-slate-600">Salida</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{movimiento.cantidad}</td>
                    <td className="px-4 py-2.5 text-slate-500">{movimiento.referencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Control de Paginación */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span>
              Página <b>{paginaMovimientos}</b> de <b>{totalPaginasMovimientos}</b> ({totalMovimientosTotal} registros)
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                disabled={paginaMovimientos === 1}
                onClick={() => setPaginaMovimientos((prev) => prev - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1 font-bold transition hover:bg-slate-50 disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={paginaMovimientos === totalPaginasMovimientos}
                onClick={() => setPaginaMovimientos((prev) => prev + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1 font-bold transition hover:bg-slate-50 disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}