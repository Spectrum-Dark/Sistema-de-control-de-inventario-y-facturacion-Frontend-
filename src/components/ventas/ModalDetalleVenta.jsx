import Modal from "../compartido/Modal";
import InsigniaEstado from "../compartido/InsigniaEstado";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

function Dato({ etiqueta, children }) {
  return <div><p className="text-xs text-slate-500">{etiqueta}</p><div className="text-sm text-slate-900">{children}</div></div>;
}

export default function ModalDetalleVenta({ venta, onCerrar }) {
  return (
    <Modal titulo={`Venta ${venta.numero_venta}`} onCerrar={onCerrar} ancho="max-w-2xl">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dato etiqueta="Estado"><InsigniaEstado estado={venta.estado} /></Dato>
          <Dato etiqueta="Fecha de venta">{formatearFechaHora(venta.fecha_venta, { hora12: true })}</Dato>
          <Dato etiqueta="Cliente">{venta.cliente?.nombre_cliente ?? "—"}</Dato>
          <Dato etiqueta="Registrada por">{venta.usuario?.nombre_completo ?? "—"}</Dato>
        </div>
        {venta.observaciones && <Dato etiqueta="Observaciones">{venta.observaciones}</Dato>}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>
              <th className="px-3 py-2 font-medium">Producto</th>
              <th className="px-3 py-2 text-right font-medium">Cant.</th>
              <th className="px-3 py-2 text-right font-medium">P. unitario</th>
              <th className="px-3 py-2 text-right font-medium">Subtotal</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {(venta.detalles ?? []).map((detalle, indice) => (
                <tr key={detalle.id_detalle_venta ?? `${detalle.id_producto}-${indice}`}>
                  <td className="px-3 py-2">
                    <p className="font-medium text-slate-900">{detalle.producto?.nombre_producto ?? "Producto no encontrado"}</p>
                    <p className="text-xs text-slate-500">{detalle.producto?.codigo_producto ?? "—"}</p>
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">{detalle.cantidad}</td>
                  <td className="px-3 py-2 text-right text-slate-700">{formatearPrecio(detalle.precio_unitario)}</td>
                  <td className="px-3 py-2 text-right text-slate-900">{formatearPrecio(detalle.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ml-auto w-full space-y-1 rounded-lg bg-slate-50 p-4 text-sm sm:w-64">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatearPrecio(venta.subtotal)}</span></div>
          <div className="flex justify-between text-slate-600"><span>IVA</span><span>{formatearPrecio(venta.impuesto)}</span></div>
          <div className="flex justify-between font-semibold text-slate-900"><span>Total</span><span>{formatearPrecio(venta.total)}</span></div>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onCerrar} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cerrar</button>
        </div>
      </div>
    </Modal>
  );
}
