function DetalleProveedores({ proveedor, cerrar }) {
  if (!proveedor) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Ficha del Proveedor
        </h3>
      </div>

      <dl className="grid grid-cols-1 gap-y-3 text-xs sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="font-medium text-slate-400">Identificador (ID)</dt>
          <dd className="font-mono font-semibold text-slate-800">
            #{proveedor.id_proveedor}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Nombre Comercial</dt>
          <dd className="font-semibold text-slate-800">{proveedor.nombre}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Persona de Contacto</dt>
          <dd className="font-medium text-sky-700">
            {proveedor.contacto || "No registrado"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Teléfono</dt>
          <dd className="font-mono text-slate-700">
            {proveedor.telefono || "No registrado"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-400">Correo Electrónico</dt>
          <dd className="text-slate-700">
            {proveedor.correo_electronico || "No registrado"}
          </dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <dt className="text-xs font-medium text-slate-400">Dirección Física</dt>
        <dd className="mt-1 text-xs leading-relaxed text-slate-600">
          {proveedor.direccion || "Sin dirección registrada."}
        </dd>
      </div>

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

export default DetalleProveedores;
