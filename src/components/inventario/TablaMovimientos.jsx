import InsigniaTipoMovimiento from "./InsigniaTipoMovimiento";
import { formatearFechaHora } from "../../utils/compartido/fecha";

const signo = (tipo) => (tipo === "Entrada" ? "+" : tipo === "Salida" ? "−" : "");
const colorCantidad = (tipo) =>
  tipo === "Entrada"
    ? "text-green-700"
    : tipo === "Salida"
    ? "text-red-700"
    : "text-slate-700";

export default function TablaMovimientos({ movimientos }) {
  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 text-right font-medium">Cantidad</th>
              <th className="px-4 py-3 font-medium">Existencia</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Detalle
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {movimientos.map((m, i) => (
              <tr key={m.id_movimiento ?? i} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {formatearFechaHora(m.fecha_movimiento)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {m.producto?.nombre_producto ?? "Producto no encontrado"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {m.producto?.codigo_producto ?? "—"}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <InsigniaTipoMovimiento tipo={m.tipo_movimiento} />
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium ${colorCantidad(
                    m.tipo_movimiento
                  )}`}
                >
                  {signo(m.tipo_movimiento)}
                  {m.cantidad}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {m.existencia_anterior} → {m.existencia_nueva}
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
                  <p>{m.motivo || "—"}</p>
                  <p className="text-xs text-slate-500">
                    {m.usuario?.nombre_completo ?? "—"}
                    {m.compra && ` · Compra ${m.compra.numero_compra}`}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {movimientos.map((m, i) => (
          <div
            key={m.id_movimiento ?? i}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  {m.producto?.nombre_producto ?? "Producto no encontrado"}
                </p>
                <p className="text-xs text-slate-500">
                  {m.producto?.codigo_producto ?? "—"} ·{" "}
                  {formatearFechaHora(m.fecha_movimiento)}
                </p>
              </div>
              <InsigniaTipoMovimiento tipo={m.tipo_movimiento} />
            </div>

            <p className="mt-3 text-sm text-slate-700">
              <span className={`font-medium ${colorCantidad(m.tipo_movimiento)}`}>
                {signo(m.tipo_movimiento)}
                {m.cantidad}
              </span>{" "}
              · Existencia {m.existencia_anterior} → {m.existencia_nueva}
            </p>

            {m.motivo && (
              <p className="mt-1 text-sm text-slate-600">{m.motivo}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">
              {m.usuario?.nombre_completo ?? "—"}
              {m.compra && ` · Compra ${m.compra.numero_compra}`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}