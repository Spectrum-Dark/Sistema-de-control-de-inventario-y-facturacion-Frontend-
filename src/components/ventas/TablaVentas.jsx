import { Check, Eye, PencilLine, XCircle } from "lucide-react";
import AccionesFila from "../compartido/AccionesFila";
import InsigniaEstado from "../compartido/InsigniaEstado";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function TablaVentas({ ventas, puedeOperar, onVerDetalle, onConfirmar, onCorregir, onAnular }) {
  const extrasDe = (venta) => {
    const extras = [{
      titulo: "Ver detalle",
      textoCorto: "Detalle",
      icono: Eye,
      onClick: () => onVerDetalle(venta),
    }];
    if (puedeOperar && venta.estado === "Registrada") {
      extras.push({ titulo: "Confirmar venta", textoCorto: "Confirmar", icono: Check, onClick: () => onConfirmar(venta) });
    }
    if (puedeOperar && venta.estado === "Confirmada") {
      extras.push({ titulo: "Corregir venta", textoCorto: "Corregir", icono: PencilLine, onClick: () => onCorregir(venta) });
    }
    if (puedeOperar && venta.estado !== "Cancelada") {
      extras.push({ titulo: "Anular venta", textoCorto: "Anular", icono: XCircle, onClick: () => onAnular(venta) });
    }
    return extras;
  };
  const cantidadProductos = (venta) => venta.detalles?.length ?? 0;

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Venta</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ventas.map((venta) => (
              <tr key={venta.id_venta} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{venta.numero_venta}</p>
                  <p className="text-xs text-slate-500">{formatearFechaHora(venta.fecha_venta, { hora12: true })}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-700">{venta.cliente?.nombre_cliente ?? "—"}</p>
                  <p className="text-xs text-slate-500">{cantidadProductos(venta)} producto(s)</p>
                </td>
                <td className="px-4 py-3 text-right">
                  <p className="font-medium text-slate-900">{formatearPrecio(venta.total)}</p>
                  <p className="text-xs text-slate-500">IVA {formatearPrecio(venta.impuesto)}</p>
                </td>
                <td className="px-4 py-3"><InsigniaEstado estado={venta.estado} /></td>
                <td className="px-4 py-3"><AccionesFila nombre={venta.numero_venta} extras={extrasDe(venta)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {ventas.map((venta) => (
          <div key={venta.id_venta} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{venta.numero_venta}</p>
                <p className="text-xs text-slate-500">{formatearFechaHora(venta.fecha_venta, { hora12: true })}</p>
              </div>
              <InsigniaEstado estado={venta.estado} />
            </div>
            <p className="mt-3 text-sm text-slate-700">{venta.cliente?.nombre_cliente ?? "—"}</p>
            <p className="mt-1 text-sm">
              <span className="font-medium text-slate-900">{formatearPrecio(venta.total)}</span>{" "}
              <span className="text-xs text-slate-500">· {cantidadProductos(venta)} producto(s)</span>
            </p>
            <AccionesFila variante="tarjeta" nombre={venta.numero_venta} extras={extrasDe(venta)} />
          </div>
        ))}
      </div>
    </>
  );
}
