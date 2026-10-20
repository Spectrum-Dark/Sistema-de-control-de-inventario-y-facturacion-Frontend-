import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";
import { formatearAnios } from "../../utils/modelos/formato";

export default function TablaModelos({
  modelos,
  nombresMarcas,
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
              <th className="px-4 py-3 font-medium">Modelo</th>
              <th className="px-4 py-3 font-medium">Años</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Descripción
              </th>
              <th className="px-4 py-3 font-medium">Estado</th>
              {hayAcciones && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modelos.map((m) => (
              <tr key={m.id_modelo} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {m.nombre_modelo}
                  </p>
                  <p className="text-xs text-slate-500">
                    {nombresMarcas[m.id_marca] ?? "—"}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatearAnios(m.anio_inicio, m.anio_fin)}
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
                  {m.descripcion || <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstado estado={m.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-4 py-3">
                    <AccionesFila
                      nombre={m.nombre_modelo}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(m)}
                      onEliminar={() => onEliminar(m)}
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
        {modelos.map((m) => (
          <div
            key={m.id_modelo}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{m.nombre_modelo}</p>
                <p className="text-xs text-slate-500">
                  {nombresMarcas[m.id_marca] ?? "—"} ·{" "}
                  {formatearAnios(m.anio_inicio, m.anio_fin)}
                </p>
              </div>
              <InsigniaEstado estado={m.estado} />
            </div>

            {m.descripcion && (
              <p className="mt-2 text-sm text-slate-600">{m.descripcion}</p>
            )}

            {hayAcciones && (
              <AccionesFila
                variante="tarjeta"
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={() => onEditar(m)}
                onEliminar={() => onEliminar(m)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
