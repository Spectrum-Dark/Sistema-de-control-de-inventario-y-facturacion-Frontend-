import { Pencil } from "lucide-react";
import InsigniaEstadoCategoria from "./InsigniaEstadoCategoria";

export default function TablaCategorias({ categorias, puedeEditar, onEditar }) {
  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              {puedeEditar && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categorias.map((c) => (
              <tr key={c.id_categoria} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {c.nombre_categoria}
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {c.descripcion || <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstadoCategoria estado={c.estado} />
                </td>
                {puedeEditar && (
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onEditar(c)}
                      title="Editar"
                      aria-label={`Editar ${c.nombre_categoria}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {categorias.map((c) => (
          <div
            key={c.id_categoria}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900">{c.nombre_categoria}</p>
              <InsigniaEstadoCategoria estado={c.estado} />
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {c.descripcion || <span className="text-slate-400">Sin descripción</span>}
            </p>

            {puedeEditar && (
              <button
                onClick={() => onEditar(c)}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Pencil size={14} />
                Editar
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}