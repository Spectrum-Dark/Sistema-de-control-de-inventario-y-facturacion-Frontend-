import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

const Vacio = () => <span className="text-slate-400">—</span>;

export default function TablaProveedores({
  proveedores,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Proveedor</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Dirección
              </th>
              <th className="px-4 py-3 font-medium">Estado</th>
              {hayAcciones && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {proveedores.map((p) => (
              <tr key={p.id_proveedor} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {p.nombre_proveedor}
                  </p>
                  <p className="text-xs text-slate-500">
                    {p.identificacion || "Sin identificación"}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <p>{p.telefono || <Vacio />}</p>
                  <p className="text-xs text-slate-500">{p.correo || ""}</p>
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
                  {p.direccion || <Vacio />}
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstado estado={p.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-4 py-3">
                    <AccionesFila
                      nombre={p.nombre_proveedor}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(p)}
                      onEliminar={() => onEliminar(p)}
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
        {proveedores.map((p) => (
          <div
            key={p.id_proveedor}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{p.nombre_proveedor}</p>
                <p className="text-xs text-slate-500">
                  {p.identificacion || "Sin identificación"}
                </p>
              </div>
              <InsigniaEstado estado={p.estado} />
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              {p.telefono && <p>{p.telefono}</p>}
              {p.correo && <p className="truncate">{p.correo}</p>}
              {p.direccion && <p>{p.direccion}</p>}
            </div>

            {hayAcciones && (
              <AccionesFila
                variante="tarjeta"
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={() => onEditar(p)}
                onEliminar={() => onEliminar(p)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}