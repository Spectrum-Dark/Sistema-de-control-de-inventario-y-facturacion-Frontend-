import {
  CalendarDays,
  Check,
  Eye,
  PencilLine,
  ReceiptText,
  Truck,
} from 'lucide-react';
import InsigniaEstadoCompra from './InsigniaEstadoCompra';
import AccionesFila from '../compartido/AccionesFila';
import { formatearFechaHora } from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';

// Componente de tabla 'TablaCompras' para listar y gestionar las compras de mercancía, soportando vistas de tabla para escritorio y tarjetas para dispositivos móviles, junto con opciones contextuales según el estado (ver detalle, confirmar, corregir).
export default function TablaCompras({
  compras,
  puedeOperar,
  onVerDetalle,
  onConfirmar,
  onCorregir,
}) {
  // Función auxiliar para generar de forma dinámica las acciones extras disponibles para cada compra según su estado actual y permisos.
  const extrasDe = (compra) => {
    const extras = [
      {
        titulo: 'Ver detalle',
        textoCorto: 'Detalle',
        icono: Eye,
        onClick: () => onVerDetalle(compra),
      },
    ];
    if (puedeOperar && compra.estado === 'Registrada')
      extras.push({
        titulo: 'Confirmar compra',
        textoCorto: 'Confirmar',
        icono: Check,
        onClick: () => onConfirmar(compra),
      });
    if (puedeOperar && compra.estado === 'Confirmada')
      extras.push({
        titulo: 'Corregir compra',
        textoCorto: 'Corregir',
        icono: PencilLine,
        onClick: () => onCorregir(compra),
      });
    return extras;
  };

  // Calcula la cantidad total de productos asociados en una compra.
  const cantidadProductos = (compra) => compra.detalles?.length ?? 0;

  return (
    <>
      {/* Vista de tabla tradicional, optimizada para pantallas grandes (escritorio / xl en adelante) */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-900px text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Compra</th>
              <th className="px-5 py-3.5 font-semibold">Proveedor</th>
              <th className="px-5 py-3.5 font-semibold">Productos</th>
              <th className="px-5 py-3.5 text-right font-semibold">Total</th>
              <th className="px-5 py-3.5 font-semibold">Estado</th>
              <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {compras.map((compra) => (
              <tr
                key={compra.id_compra}
                className="table-row-hover transition-colors"
              >
                {/* Columna de identificación de la compra y fecha de registro */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <ReceiptText size={17} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {compra.numero_compra}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                        <CalendarDays size={12} />
                        {formatearFechaHora(compra.fecha_compra)}
                      </span>
                    </span>
                  </div>
                </td>

                {/* Columna del proveedor asociado */}
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <Truck size={15} className="shrink-0 text-slate-400" />
                    {compra.proveedor?.nombre_proveedor ?? '—'}
                  </span>
                </td>

                {/* Columna de recuento de productos */}
                <td className="px-5 py-3.5 text-sm text-slate-600">
                  {cantidadProductos(compra)} producto(s)
                </td>

                {/* Columna del monto total y detalle de IVA */}
                <td className="px-5 py-3.5 text-right">
                  <span className="block font-semibold text-slate-900">
                    {formatearPrecio(compra.total)}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    IVA {formatearPrecio(compra.impuesto)}
                  </span>
                </td>

                {/* Columna con la insignia del estado actual de la compra */}
                <td className="px-5 py-3.5">
                  <InsigniaEstadoCompra estado={compra.estado} />
                </td>

                {/* Columna de acciones operativas para cada registro */}
                <td className="px-5 py-3.5">
                  <AccionesFila
                    nombre={compra.numero_compra}
                    extras={extrasDe(compra)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista alternativa en formato de tarjetas (Cards), adaptada para dispositivos móviles (oculta en xl) */}
      <div className="space-y-3 xl:hidden">
        {compras.map((compra) => (
          <article
            key={compra.id_compra}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <ReceiptText size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {compra.numero_compra}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <CalendarDays size={12} />
                    {formatearFechaHora(compra.fecha_compra)}
                  </span>
                </span>
              </div>
              <InsigniaEstadoCompra estado={compra.estado} />
            </div>

            {/* Datos detallados en cuadrícula interna para la tarjeta móvil */}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Proveedor
                </p>
                <p className="mt-1 truncate text-sm text-slate-700">
                  {compra.proveedor?.nombre_proveedor ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Productos
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {cantidadProductos(compra)} producto(s)
                </p>
              </div>
              <div className="col-span-2 flex items-end justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Total
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {formatearPrecio(compra.total)}
                </span>
              </div>
            </div>

            {/* Sección de acciones para la tarjeta móvil */}
            <div className="mt-3 border-t border-slate-100 pt-1">
              <AccionesFila variante="tarjeta" extras={extrasDe(compra)} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
