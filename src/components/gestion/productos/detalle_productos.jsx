function DetalleProducto({ producto, cerrar }) {
  if (!producto) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      {/* Encabezado Corporativo Limpio */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Ficha Técnica del Repuesto
        </h3>
      </div>

      {/* Grid de Información del Producto */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:grid-cols-3 lg:grid-cols-4">
        <div>
          <dt className="font-medium text-slate-400">Código</dt>
          <dd className="font-mono font-semibold text-slate-800">
            {producto.codigo_producto}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Nombre</dt>
          <dd className="font-semibold text-slate-800">{producto.nombre}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Categoría</dt>
          <dd className="text-slate-700">{producto.categoria}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Marca</dt>
          <dd className="text-slate-700">{producto.marca}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Precio Compra</dt>
          <dd className="font-medium text-slate-700">
            C$ {(producto.precio_compra ?? 0).toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Precio Venta</dt>
          <dd className="font-bold text-emerald-600">
            C$ {(producto.precio_venta ?? 0).toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Existencia Actual</dt>
          <dd className="font-semibold text-sky-700">
            {producto.existencia_actual} unid.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Mín. / Máx.</dt>
          <dd className="text-slate-600">
            {producto.existencia_minima} / {producto.existencia_maxima}
          </dd>
        </div>
      </dl>

      {/* Descripción Expandida */}
      {producto.descripcion && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <dt className="text-xs font-medium text-slate-400">
            Descripción Detallada
          </dt>
          <dd className="mt-1 text-xs text-slate-600 leading-relaxed">
            {producto.descripcion}
          </dd>
        </div>
      )}

      {/* Pie con Acción Única en Azul */}
      <div className="mt-5 flex justify-end border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={cerrar}
          className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-green-700 active:scale-95"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
