import { Eye, XCircle } from "lucide-react";
import AccionesFila from "../compartido/AccionesFila";
import InsigniaEstado from "../compartido/InsigniaEstado";
import { fechaFactura, precioFactura } from "../../utils/facturacion/formato";

export default function TablaFacturas({ facturas, puedeAnular, onVer, onAnular }) {
  const accionesDe = (factura) => {
    const acciones = [{
      titulo: "Ver factura e imprimir",
      textoCorto: "Ver",
      icono: Eye,
      onClick: () => onVer(factura),
    }];
    if (puedeAnular && factura.estado === "Emitida") {
      acciones.push({ titulo: "Anular factura", textoCorto: "Anular", icono: XCircle, onClick: () => onAnular(factura) });
    }
    return acciones;
  };

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Factura</th>
              <th className="px-4 py-3 font-medium">Venta</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {facturas.map((factura) => (
              <tr key={factura.id_factura} className="transition hover:bg-slate-50">
                <td className="px-4 py-3"><p className="font-medium text-slate-900">{factura.numero_factura}</p><p className="text-xs text-slate-500">{fechaFactura(factura.fecha_emision)}</p></td>
                <td className="px-4 py-3 text-slate-700">{factura.venta?.numero_venta ?? "—"}</td>
                <td className="px-4 py-3"><p className="text-slate-700">{factura.venta?.cliente?.nombre_cliente ?? "—"}</p><p className="text-xs text-slate-500">{factura.venta?.cliente?.identificacion ?? ""}</p></td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">{precioFactura(factura.total)}</td>
                <td className="px-4 py-3"><InsigniaEstado estado={factura.estado} /></td>
                <td className="px-4 py-3"><AccionesFila nombre={factura.numero_factura} extras={accionesDe(factura)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {facturas.map((factura) => (
          <article key={factura.id_factura} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="truncate font-semibold text-slate-900">{factura.numero_factura}</p><p className="text-xs text-slate-500">{fechaFactura(factura.fecha_emision)}</p></div>
              <InsigniaEstado estado={factura.estado} />
            </div>
            <div className="mt-3 space-y-1 text-sm"><p className="text-slate-700">{factura.venta?.cliente?.nombre_cliente ?? "—"}</p><p className="text-xs text-slate-500">Venta {factura.venta?.numero_venta ?? "—"}</p><p className="pt-1 font-semibold text-slate-900">{precioFactura(factura.total)}</p></div>
            <AccionesFila variante="tarjeta" nombre={factura.numero_factura} extras={accionesDe(factura)} />
          </article>
        ))}
      </div>
    </>
  );
}
