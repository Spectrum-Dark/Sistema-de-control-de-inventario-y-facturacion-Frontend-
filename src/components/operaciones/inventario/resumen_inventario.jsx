export default function Resumen_Inventario({ resumen }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Resumen del inventario
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Productos */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Total de productos
          </span>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {resumen.totalProductos}
          </p>
        </article>

        {/* Unidades Existentes */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Unidades existentes
          </span>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {resumen.unidadesExistentes}
          </p>
        </article>

        {/* Existencias Bajas */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Existencias bajas
          </span>
          <p className="mt-1 text-2xl font-black text-amber-600">
            {resumen.productosBajos}
          </p>
        </article>

        {/* Productos Agotados */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Productos agotados
          </span>
          <p className="mt-1 text-2xl font-black text-rose-600">
            {resumen.productosAgotados}
          </p>
        </article>
      </div>
    </section>
  );
}