import PanelReporte from "../../components/reportes/PanelReporte";
import { FileText, Scale } from "lucide-react";
import {
  obtenerReporteFacturacion,
  obtenerReporteFinanciero,
} from "../../services/reportes/reportesService";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function ReporteFacturacion() {
  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><FileText size={20} /></span><div><h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Reportes de facturación</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Consulta facturas y el consolidado financiero de compras confirmadas y ventas confirmadas.</p></div>
      </header>
      <PanelReporte
        titulo="Facturas"
        Icono={FileText}
        columnas={[
          { etiqueta: "Número de factura", valor: (f) => f.numero_factura },
          { etiqueta: "Emisión", valor: (f) => formatearFechaHora(f.fecha_emision, { hora12: true }) },
          { etiqueta: "Venta", valor: (f) => f.venta?.numero_venta ?? "—" },
          { etiqueta: "Cliente", valor: (f) => f.venta?.cliente?.nombre_cliente ?? "—" },
          { etiqueta: "Subtotal", valor: (f) => formatearPrecio(f.subtotal) },
          { etiqueta: "Impuesto", valor: (f) => formatearPrecio(f.impuesto) },
          { etiqueta: "Total", valor: (f) => formatearPrecio(f.total) },
          { etiqueta: "Estado", valor: (f) => f.estado },
        ]}
        consultar={obtenerReporteFacturacion}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
      <PanelReporte
        titulo="Consolidado financiero"
        Icono={Scale}
        descripcion="Compara ingresos por ventas confirmadas con egresos por compras confirmadas."
        columnas={[
          { etiqueta: "Ingresos por ventas", valor: (r) => formatearPrecio(r.total_ingresos_ventas) },
          { etiqueta: "Egresos por compras", valor: (r) => formatearPrecio(r.total_egresos_compras) },
          { etiqueta: "Balance neto", valor: (r) => formatearPrecio(r.balance_neto) },
        ]}
        consultar={obtenerReporteFinanciero}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
    </div>
  );
}
