export default function Agregar_Producto({
  productos,
  idProductoSeleccionado,
  setIdProductoSeleccionado,
  agregarProducto,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Agregar productos
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="producto"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Producto
          </label>
          <select
            id="producto"
            value={idProductoSeleccionado}
            onChange={(evento) =>
              setIdProductoSeleccionado(evento.target.value)
            }
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Selecciona un producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.codigo_producto} - {producto.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={agregarProducto}
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Agregar producto
        </button>
      </div>
    </section>
  );
}
