import { Pencil, Trash2 } from "lucide-react";
import InsigniaEstado from "../compartido/InsigniaEstado";

const claseIcono =
  "rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";
const claseIconoPeligro =
  "rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600";

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
                    <div className="flex justify-end gap-1">
                      {puedeEditar && (
                        <button
                          onClick={() => onEditar(p)}
                          title="Editar"
                          aria-label={`Editar ${p.nombre_proveedor}`}
                          className={claseIcono}
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {puedeEliminar && (
                        <button
                          onClick={() => onEliminar(p)}
                          title="Eliminar"
                          aria-label={`Eliminar ${p.nombre_proveedor}`}
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
        {proveedores.map((p) => (
          <div
            key={p.id_proveedor}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  {p.nombre_proveedor}
                </p>
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
              <div className="mt-3 flex gap-4">
                {puedeEditar && (
                  <button
                    onClick={() => onEditar(p)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                )}
                {puedeEliminar && (
                  <button
                    onClick={() => onEliminar(p)}
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
