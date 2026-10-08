function FormularioProducto({
  modoEdicion,
  formulario,
  manejarCambio,
  registrarProducto,
  categorias = [],
  cancelar,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      {/* Encabezado Corporativo Limpio */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              modoEdicion ? "bg-amber-500 animate-pulse" : "bg-sky-500"
            }`}
          ></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {modoEdicion
              ? "Edición de Datos de Producto"
              : "Registro de Nuevo Producto"}
          </h3>
        </div>
      </div>

      <form onSubmit={registrarProducto} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Código */}
          <div>
            <label
              htmlFor="codigo_producto"
              className="block text-xs font-semibold text-slate-600"
            >
              Código del producto <span className="text-rose-500">*</span>
            </label>
            <input
              id="codigo_producto"
              name="codigo_producto"
              type="text"
              value={formulario.codigo_producto}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs font-semibold text-slate-600"
            >
              Nombre <span className="text-rose-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label
              htmlFor="id_categoria"
              className="block text-xs font-semibold text-slate-600"
            >
              Categoría <span className="text-rose-500">*</span>
            </label>
            <select
              id="id_categoria"
              name="id_categoria"
              value={formulario.id_categoria}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Precio de Compra */}
          <div>
            <label
              htmlFor="precio_compra"
              className="block text-xs font-semibold text-slate-600"
            >
              Precio de compra (C$) <span className="text-rose-500">*</span>
            </label>
            <input
              id="precio_compra"
              name="precio_compra"
              type="number"
              min="0"
              step="0.01"
              value={formulario.precio_compra}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Precio de Venta */}
          <div>
            <label
              htmlFor="precio_venta"
              className="block text-xs font-semibold text-slate-600"
            >
              Precio de venta (C$) <span className="text-rose-500">*</span>
            </label>
            <input
              id="precio_venta"
              name="precio_venta"
              type="number"
              min="0"
              step="0.01"
              value={formulario.precio_venta}
              onChange={manejarCambio}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Existencia Mínima */}
          <div>
            <label
              htmlFor="existencia_minima"
              className="block text-xs font-semibold text-slate-600"
            >
              Existencia mínima
            </label>
            <input
              id="existencia_minima"
              name="existencia_minima"
              type="number"
              min="0"
              value={formulario.existencia_minima}
              onChange={manejarCambio}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Existencia Máxima */}
          <div>
            <label
              htmlFor="existencia_maxima"
              className="block text-xs font-semibold text-slate-600"
            >
              Existencia máxima
            </label>
            <input
              id="existencia_maxima"
              name="existencia_maxima"
              type="number"
              min="0"
              value={formulario.existencia_maxima}
              onChange={manejarCambio}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="block text-xs font-semibold text-slate-600"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="2"
            value={formulario.descripcion}
            onChange={manejarCambio}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          />
        </div>

        {/* Acciones principales */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={cancelar}
            className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
              modoEdicion
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {modoEdicion ? "Guardar Cambios" : "Registrar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioProducto;