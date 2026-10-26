import {
  CalendarDays,
  Check,
  Eye,
  PencilLine,
  ReceiptText,
  UserRound,
  XCircle,
} from 'lucide-react';
import AccionesFila from '../compartido/AccionesFila';
import InsigniaEstado from '../compartido/InsigniaEstado';
import { formatearFechaHora } from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';

// Componente 'TablaVentas' encargado de listar el registro de transacciones de venta del sistema, soportando un diseño dual responsivo (tabla clásica y tarjetas móviles) con opciones condicionales para ver detalles, confirmar, corregir y anular.
export default function TablaVentas({
  ventas,
  puedeOperar,
  onVerDetalle,
  onConfirmar,
  onCorregir,
  onAnular,
}) {
  // Construye dinámicamente las acciones y operaciones permitidas para cada fila de venta según su estado operativo actual.
  const extrasDe = (venta) => {
    const extras = [
      {
        titulo: 'Ver detalle',
        textoCorto: 'Detalle',
        icono: Eye,
        onClick: () => onVerDetalle(venta),
      },
    ];
    if (puedeOperar && venta.estado === 'Registrada')
      extras.push({
        titulo: 'Confirmar venta',
        textoCorto: 'Confirmar',
        icono: Check,
        onClick: () => onConfirmar(venta),
      });
    if (puedeOperar && venta.estado === 'Confirmada')
      extras.push({
        titulo: 'Corregir venta',
        textoCorto: 'Corregir',
        icono: PencilLine,
        onClick: () => onCorregir(venta),
      });
    if (puedeOperar && venta.estado !== 'Cancelada')
      extras.push({
        titulo: 'Anular venta',
        textoCorto: 'Anular',
        icono: XCircle,
        onClick: () => onAnular(venta),
      });
    return extras;
  };

  const cantidadProductos = (venta) => venta.detalles?.length ?? 0;

  return (
    <>
      {/* Vista de tabla tradicional para pantallas extra grandes (XL en adelante) */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-255 text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Venta</th>
              <th className="px-5 py-3.5 font-semibold">Cliente</th>
              <th className="px-5 py-3.5 font-semibold">Productos</th>
              <th className="px-5 py-3.5 text-right font-semibold">Total</th>
              <th className="px-5 py-3.5 font-semibold">Estado</th>
              <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ventas.map((venta) => (
              <tr
                key={venta.id_venta}
                className="table-row-hover transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <ReceiptText size={17} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {venta.numero_venta}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                        <CalendarDays size={12} />
                        {formatearFechaHora(venta.fecha_venta, {
                          hora12: true,
                        })}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <UserRound size={15} className="shrink-0 text-slate-400" />
                    {venta.cliente?.nombre_cliente ?? '—'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600">
                  {cantidadProductos(venta)} producto(s)
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="block font-semibold text-slate-900">
                    {formatearPrecio(venta.total)}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    IVA {formatearPrecio(venta.impuesto)}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <InsigniaEstado estado={venta.estado} />
                </td>
                <td className="px-5 py-3.5">
                  <AccionesFila
                    nombre={venta.numero_venta}
                    extras={extrasDe(venta)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas adaptables para dispositivos móviles y pantallas medianas */}
      <div className="space-y-3 xl:hidden">
        {ventas.map((venta) => (
          <article
            key={venta.id_venta}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <ReceiptText size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {venta.numero_venta}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <CalendarDays size={12} />
                    {formatearFechaHora(venta.fecha_venta, { hora12: true })}
                  </span>
                </span>
              </div>
              <InsigniaEstado estado={venta.estado} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Cliente
                </p>
                <p className="mt-1 truncate text-sm text-slate-700">
                  {venta.cliente?.nombre_cliente ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Productos
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {cantidadProductos(venta)} producto(s)
                </p>
              </div>
              <div className="col-span-2 flex items-end justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Total
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {formatearPrecio(venta.total)}
                </span>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-100 pt-1">
              <AccionesFila
                variante="tarjeta"
                nombre={venta.numero_venta}
                extras={extrasDe(venta)}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
