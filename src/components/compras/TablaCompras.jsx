import { Eye, Check, PencilLine } from "lucide-react";
import InsigniaEstadoCompra from "./InsigniaEstadoCompra";
import AccionesFila from "../compartido/AccionesFila";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function TablaCompras({
  compras,
  puedeOperar,
  onVerDetalle,
  onConfirmar,
  onCorregir,
}) {
  const extrasDe = (c) => {
    const extras = [
      {
        titulo: "Ver detalle",
        textoCorto: "Detalle",
        icono: Eye,
        onClick: () => onVerDetalle(c),
      },
    ];

    if (puedeOperar && c.estado === "Registrada") {
      extras.push({
        titulo: "Confirmar compra",
        textoCorto: "Confirmar",
        icono: Check,
        onClick: () => onConfirmar(c),
      });
    }

    if (puedeOperar && c.estado === "Confirmada") {
      extras.push({
        titulo: "Corregir compra",
        textoCorto: "Corregir",
        icono: PencilLine,
        onClick: () => onCorregir(c),
      });
    }

    return extras;
  };

  const cantidadProductos = (c) => c.detalles?.length ?? 0;

  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Compra</th>
              <th className="px-4 py-3 font-medium">Proveedor</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {compras.map((c) => (
              <tr key={c.id_compra} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{c.numero_compra}</p>
                  <p className="text-xs text-slate-500">
                    {formatearFechaHora(c.fecha_compra)}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-700">
                    {c.proveedor?.nombre_proveedor ?? "—"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {cantidadProductos(c)} producto(s)
                  </p>
                </td>
                <td className="px-4 py-3 text-right">
                  <p className="font-medium text-slate-900">
                    {formatearPrecio(c.total)}
                  </p>
                  <p className="text-xs text-slate-500">
                    IVA {formatearPrecio(c.impuesto)}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstadoCompra estado={c.estado} />
                </td>
                <td className="px-4 py-3">
                  <AccionesFila nombre={c.numero_compra} extras={extrasDe(c)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {compras.map((c) => (
          <div
            key={c.id_compra}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{c.numero_compra}</p>
                <p className="text-xs text-slate-500">
                  {formatearFechaHora(c.fecha_compra)}
                </p>
              </div>
              <InsigniaEstadoCompra estado={c.estado} />
            </div>

            <p className="mt-3 text-sm text-slate-700">
              {c.proveedor?.nombre_proveedor ?? "—"}
            </p>
            <p className="mt-1 text-sm">
              <span className="font-medium text-slate-900">
                {formatearPrecio(c.total)}
              </span>{" "}
              <span className="text-xs text-slate-500">
                · {cantidadProductos(c)} producto(s)
              </span>
            </p>

            <AccionesFila variante="tarjeta" extras={extrasDe(c)} />
          </div>
        ))}
      </div>
    </>
  );
}