function StockBajo({ productos }) {
  const listaProductos = productos ?? [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Productos con stock bajo
        </h3>
        {listaProductos.length > 0 && (
          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-100">
            Alerta activa
          </span>
        )}
      </div>

      {listaProductos.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-xs text-slate-400">
          No hay productos con stock bajo.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {listaProductos.map((producto) => (
            <article
              key={producto.id_producto}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 pr-4">
                <h4 className="truncate text-sm font-semibold text-slate-900">
                  {producto.nombre}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500">
                  Mínimo requerido:{" "}
                  <span className="font-medium text-slate-700">
                    {producto.minimo}
                  </span>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  {producto.existencia} unid.
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default StockBajo;