import {
  CalendarDays,
  Eye,
  FileText,
  ShoppingCart,
  UserRound,
  XCircle,
} from 'lucide-react';
import AccionesFila from '../compartido/AccionesFila';
import InsigniaEstado from '../compartido/InsigniaEstado';
import { fechaFactura, precioFactura } from '../../utils/facturacion/formato';

// Componente de tabla o tarjetas 'TablaFacturas' para listar y gestionar las facturas emitidas, soportando una vista de cuadrícula adaptable y acciones contextuales según el estado (ver factura, imprimir o anular).
export default function TablaFacturas({
  facturas,
  puedeAnular,
  onVer,
  onAnular,
}) {
  // Función auxiliar para generar de forma dinámica las acciones permitidas para cada factura según su estado actual y permisos del usuario.
  const accionesDe = (factura) => {
    const acciones = [
      {
        titulo: 'Ver factura e imprimir',
        textoCorto: 'Ver',
        icono: Eye,
        onClick: () => onVer(factura),
      },
    ];
    if (puedeAnular && factura.estado === 'Emitida') {
      acciones.push({
        titulo: 'Anular factura',
        textoCorto: 'Anular',
        icono: XCircle,
        onClick: () => onAnular(factura),
      });
    }
    return acciones;
  };

  return (
    // Contenedor principal en formato de cuadrícula (grid) adaptable para tablets y pantallas grandes (escritorio).
    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
      {facturas.map((factura) => (
        <article
          key={factura.id_factura}
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          {/* Cabecera de la tarjeta: número de factura, fecha de emisión e insignia de estado */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FileText size={17} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-900">
                  {factura.numero_factura}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                  <CalendarDays size={12} />
                  {fechaFactura(factura.fecha_emision)}
                </span>
              </span>
            </div>
            <InsigniaEstado estado={factura.estado} />
          </div>

          {/* Sección de datos internos de la factura: cliente, venta asociada y monto total */}
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-100 pt-3">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Cliente
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-700">
                <UserRound size={12} className="shrink-0 text-slate-400" />
                {factura.venta?.cliente?.nombre_cliente ?? '—'}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Venta asociada
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-700">
                <ShoppingCart size={12} className="shrink-0 text-slate-400" />
                {factura.venta?.numero_venta ?? '—'}
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Total
              </span>
              <span className="text-base font-semibold text-slate-900">
                {precioFactura(factura.total)}
              </span>
            </div>
          </div>

          {/* Barra de acciones inferiores para cada tarjeta de factura */}
          <div className="mt-2 border-t border-slate-100 pt-1">
            <AccionesFila
              variante="tarjeta"
              nombre={factura.numero_factura}
              extras={accionesDe(factura)}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
