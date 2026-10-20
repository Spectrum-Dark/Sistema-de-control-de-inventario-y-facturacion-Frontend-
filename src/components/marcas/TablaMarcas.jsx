import { Pencil, Trash2 } from "lucide-react";
import InsigniaEstadoMarca from "../compartido/InsigniaEstado";

const claseIcono =
  "rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";
const claseIconoPeligro =
  "rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600";

export default function TablaMarcas({
  marcas,
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
              <th className="px-4 py-3 font-medium">Marca</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              {hayAcciones && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {marcas.map((m) => (
              <tr key={m.id_marca} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {m.nombre_marca}
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {m.descripcion || <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstadoMarca estado={m.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      {puedeEditar && (
                        <button
                          onClick={() => onEditar(m)}
                          title="Editar"
                          aria-label={`Editar ${m.nombre_marca}`}
                          className={claseIcono}
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {puedeEliminar && (
                        <button
                          onClick={() => onEliminar(m)}
                          title="Eliminar"
                          aria-label={`Eliminar ${m.nombre_marca}`}
                          className={claseIconoPeligro}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {marcas.map((m) => (
          <div
            key={m.id_marca}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900">{m.nombre_marca}</p>
              <InsigniaEstadoMarca estado={m.estado} />
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {m.descripcion || (
                <span className="text-slate-400">Sin descripción</span>
              )}
            </p>

            {hayAcciones && (
              <div className="mt-3 flex gap-4">
                {puedeEditar && (
                  <button
                    onClick={() => onEditar(m)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                )}
                {puedeEliminar && (
                  <button
                    onClick={() => onEliminar(m)}
                    className="flex items-center gap-2 text-sm font-medium text-red-600"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}