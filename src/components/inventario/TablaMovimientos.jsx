import { CalendarDays, Package, UserRound, Warehouse } from "lucide-react";
import InsigniaTipoMovimiento from "./InsigniaTipoMovimiento";
import { formatearFechaHora } from "../../utils/compartido/fecha";

const signo = (tipo) => (tipo === "Entrada" ? "+" : tipo === "Salida" ? "−" : "");
const colorCantidad = (tipo) => tipo === "Entrada" ? "text-emerald-700" : tipo === "Salida" ? "text-red-600" : "text-slate-700";

function IdentidadProducto({ movimiento }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Package size={15} /></span>
      <span className="min-w-0"><span className="block truncate text-[13px] font-semibold text-slate-900">{movimiento.producto?.nombre_producto ?? "Producto no encontrado"}</span><span className="block truncate text-[10px] text-slate-400">{movimiento.producto?.codigo_producto ?? "Sin código"}</span></span>
    </div>
  );
}

function DetalleMovimiento({ movimiento }) {
  return (
    <div className="min-w-0">
      <p className="line-clamp-1 break-words text-xs text-slate-600">{movimiento.motivo || "Sin detalle"}</p>
      <p className="mt-0.5 truncate text-[10px] text-slate-500">{movimiento.usuario?.nombre_completo ?? "Usuario no disponible"}{movimiento.compra && ` · Compra ${movimiento.compra.numero_compra}`}</p>
    </div>
  );
}

export default function TablaMovimientos({ movimientos }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {movimientos.map((movimiento, indice) => (
          <article key={movimiento.id_movimiento ?? indice} className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
            <div className="flex min-w-0 items-center justify-between gap-2"><IdentidadProducto movimiento={movimiento} /><InsigniaTipoMovimiento tipo={movimiento.tipo_movimiento} /></div>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
              <p className={`text-sm font-semibold ${colorCantidad(movimiento.tipo_movimiento)}`}>{signo(movimiento.tipo_movimiento)}{movimiento.cantidad} <span className="text-[10px] font-medium text-slate-400">unid.</span></p>
              <p className="flex items-center gap-1 text-xs text-slate-600"><Warehouse size={12} className="text-slate-400" /><span>{movimiento.existencia_anterior}</span><span className="text-slate-400">→</span><span className="font-semibold text-slate-900">{movimiento.existencia_nueva}</span></p>
            </div>
            <div className="mt-2 flex min-w-0 items-start gap-1.5 border-t border-slate-100 pt-2">
              <CalendarDays size={12} className="mt-0.5 shrink-0 text-slate-400" />
              <div className="min-w-0 flex-1"><p className="truncate text-[10px] text-slate-500">{formatearFechaHora(movimiento.fecha_movimiento, { hora12: true })}</p><div className="mt-1"><DetalleMovimiento movimiento={movimiento} /></div></div>
            </div>
          </article>
        ))}
    </div>
  );
}
