export default function Tabla_Existencias({
  productos,
  consultarProducto,
  paginaProductos,
  totalPaginasProductos,
  setPaginaProductos,
  totalProductosTotal,
}) {
  const renderEstadoTexto = (estado) => {
    switch (estado) {
      case "Agotado":
        return <span className="font-bold text-rose-600">Agotado</span>;
      case "Bajo":
        return <span className="font-bold text-amber-600">Bajo</span>;
      default:
        return <span className="font-medium text-slate-600">Normal</span>;
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Existencias actuales
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          Total: {totalProductosTotal} ítems
        </span>
      </div>

      {productos.length === 0 ? (
        <p className="text-xs text-slate-500">
          No se encontraron productos con esos criterios.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Código</th>
                  <th className="px-4 py-2.5">Producto</th>
                  <th className="px-4 py-2.5">Categoría</th>
                  <th className="px-4 py-2.5">Actual</th>
                  <th className="px-4 py-2.5">Mínima</th>
                  <th className="px-4 py-2.5">Máxima</th>
                  <th className="px-4 py-2.5">Estado</th>
                  <th className="px-4 py-2.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {productos.map((producto) => (
                  <tr key={producto.id_producto} className="hover:bg-slate-50/60 transition">
                    <td className="px-4 py-2.5 font-semibold text-slate-900">
                      {producto.codigo_producto}
                    </td>
                    <td className="px-4 py-2.5">{producto.nombre}</td>
                    <td className="px-4 py-2.5 text-slate-500">{producto.categoria}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{producto.existencia_actual}</td>
                    <td className="px-4 py-2.5 text-slate-500">{producto.existencia_minima}</td>
                    <td className="px-4 py-2.5 text-slate-500">{producto.existencia_maxima}</td>
                    <td className="px-4 py-2.5">{renderEstadoTexto(producto.estado)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => consultarProducto(producto)}
                        className="font-bold text-blue-600 hover:underline"
                      >
                        Ver movimientos
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Control de Paginación */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span>
              Página <b>{paginaProductos}</b> de <b>{totalPaginasProductos}</b>
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                disabled={paginaProductos === 1}
                onClick={() => setPaginaProductos((prev) => prev - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1 font-bold transition hover:bg-slate-50 disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={paginaProductos === totalPaginasProductos}
                onClick={() => setPaginaProductos((prev) => prev + 1)}
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