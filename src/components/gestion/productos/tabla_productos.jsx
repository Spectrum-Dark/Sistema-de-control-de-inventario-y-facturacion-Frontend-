function TablaProductos({
  productos = [],
  verProducto,
  editarProducto,
  paginaActual,
  totalPaginas,
  paginaAnterior,
  paginaSiguiente,
  totalRegistros,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Contenedor de la tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Código</th>
              <th scope="col" className="px-4 py-3 font-bold">Nombre</th>
              <th scope="col" className="px-4 py-3 font-bold">Categoría</th>
              <th scope="col" className="px-4 py-3 font-bold">Marca</th>
              <th scope="col" className="px-4 py-3 font-bold">P. Compra</th>
              <th scope="col" className="px-4 py-3 font-bold">P. Venta</th>
              <th scope="col" className="px-4 py-3 font-bold">Existencia</th>
              <th scope="col" className="px-4 py-3 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productos.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-xs text-slate-400">
                  No se encontraron productos registrados.
                </td>
              </tr>
            ) : (
              productos.map((prod) => (
                <tr key={prod.id_producto} className="transition hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">
                    {prod.codigo_producto}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {prod.nombre}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{prod.categoria}</td>
                  <td className="px-4 py-3 text-slate-600">{prod.marca}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    C$ {(prod.precio_compra ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-700">
                    C$ {(prod.precio_venta ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-md border border-sky-100 bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                      {prod.existencia_actual} unid.
                    </span>
                  </td>
                  <td className="space-x-2 px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => verProducto(prod)}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      onClick={() => editarProducto(prod)}
                      className="rounded-lg border border-sky-200/60 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 bg-slate-50/50">
        <p className="text-xs text-slate-500">
          Mostrando <span className="font-semibold text-slate-700">{productos.length}</span> de{" "}
          <span className="font-semibold text-slate-700">{totalRegistros}</span> resultados
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={paginaActual === 1}
            onClick={paginaAnterior}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="text-xs font-medium text-slate-600 px-1">
            Página <span className="font-bold text-slate-800">{paginaActual}</span> de{" "}
            <span className="font-bold text-slate-800">{totalPaginas}</span>
          </span>

          <button
            type="button"
            disabled={paginaActual === totalPaginas}
            onClick={paginaSiguiente}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablaProductos;