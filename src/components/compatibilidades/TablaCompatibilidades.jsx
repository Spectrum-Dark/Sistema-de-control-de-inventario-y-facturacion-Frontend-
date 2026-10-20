import AccionesFila from "../compartido/AccionesFila";

export default function TablaCompatibilidades({
  filas,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  const hayAcciones = puedeEditar || puedeEliminar;

  const nombreProducto = (c) =>
    c.producto?.nombre_producto ?? "Producto no encontrado";
  const codigoProducto = (c) => c.producto?.codigo_producto ?? "—";
  const nombreModelo = (c) => c.modelo?.nombre_modelo ?? "Modelo no encontrado";

  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Modelo</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Observaciones
              </th>
              {hayAcciones && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filas.map((c) => (
              <tr key={c.id_compatibilidad} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {nombreProducto(c)}
                  </p>
                  <p className="text-xs text-slate-500">{codigoProducto(c)}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {nombreModelo(c)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {c.nombre_marca ?? "—"}
                  </p>
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
                  {c.observaciones || <span className="text-slate-400">—</span>}
                </td>
                {hayAcciones && (
                  <td className="px-4 py-3">
                    <AccionesFila
                      nombre={`${nombreProducto(c)} con ${nombreModelo(c)}`}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(c)}
                      onEliminar={() => onEliminar(c)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {filas.map((c) => (
          <div
            key={c.id_compatibilidad}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="font-medium text-slate-900">{nombreProducto(c)}</p>
            <p className="text-xs text-slate-500">{codigoProducto(c)}</p>

            <p className="mt-3 text-sm text-slate-700">
              {c.nombre_marca ?? "—"} · {nombreModelo(c)}
            </p>

            {c.observaciones && (
              <p className="mt-1 text-sm text-slate-600">{c.observaciones}</p>
            )}

            {hayAcciones && (
              <AccionesFila
                variante="tarjeta"
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={() => onEditar(c)}
                onEliminar={() => onEliminar(c)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
