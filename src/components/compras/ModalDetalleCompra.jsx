import Modal from '../compartido/Modal';
import InsigniaEstadoCompra from './InsigniaEstadoCompra';
import { formatearFechaHora } from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';

// Componente auxiliar interno para renderizar de forma uniforme cada etiqueta y su valor correspondiente.
function Dato({ etiqueta, children }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{etiqueta}</p>
      <div className="text-sm text-slate-900">{children}</div>
    </div>
  );
}

// Componente modal 'ModalDetalleCompra' para visualizar la información completa de una compra registrada, incluyendo datos generales, listado detallado de productos y resumen de montos.
export default function ModalDetalleCompra({ compra, onCerrar }) {
  return (
    <Modal
      titulo={`Compra ${compra.numero_compra}`}
      onCerrar={onCerrar}
      ancho="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Tarjeta con los datos generales y metadatos de la compra */}
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3 sm:grid-cols-2">
          <Dato etiqueta="Estado">
            <InsigniaEstadoCompra estado={compra.estado} />
          </Dato>
          <Dato etiqueta="Fecha de compra">
            {formatearFechaHora(compra.fecha_compra)}
          </Dato>
          <Dato etiqueta="Proveedor">
            {compra.proveedor?.nombre_proveedor ?? '—'}
          </Dato>
          <Dato etiqueta="Registrada por">
            {compra.usuario?.nombre_completo ?? '—'}
          </Dato>
        </div>

        {/* Sección de observaciones adicionales (se renderiza solo si existen) */}
        {compra.observaciones && (
          <Dato etiqueta="Observaciones">{compra.observaciones}</Dato>
        )}

        {/* Tabla con el detalle de productos asociados a la compra */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Producto</th>
                <th className="px-3 py-2 text-right font-medium">Cant.</th>
                <th className="px-3 py-2 text-right font-medium">
                  P. unitario
                </th>
                <th className="px-3 py-2 text-right font-medium">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(compra.detalles ?? []).map((d) => (
                <tr key={d.id_detalle_compra}>
                  <td className="px-3 py-2">
                    <p className="font-medium text-slate-900">
                      {d.producto?.nombre_producto ?? 'Producto no encontrado'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {d.producto?.codigo_producto ?? '—'}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">
                    {d.cantidad}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">
                    {formatearPrecio(d.precio_unitario)}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-900">
                    {formatearPrecio(d.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen de totales de la compra (subtotal, IVA y monto total definitivo) */}
        <div className="ml-auto w-full space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm sm:w-64">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatearPrecio(compra.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>IVA</span>
            <span>{formatearPrecio(compra.impuesto)}</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatearPrecio(compra.total)}</span>
          </div>
        </div>

        {/* Botón de cierre en el pie del modal */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
