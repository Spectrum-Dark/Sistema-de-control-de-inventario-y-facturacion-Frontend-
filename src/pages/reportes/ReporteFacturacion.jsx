import PanelReporte from "../../components/reportes/PanelReporte";
import GrupoPanelesReporte from "../../components/reportes/GrupoPanelesReporte";
import EncabezadoReporte from "../../components/reportes/EncabezadoReporte";
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
      <EncabezadoReporte Icono={FileText} titulo="Reportes de facturación" descripcion="Consulta facturas y el consolidado financiero de compras confirmadas y ventas confirmadas." />
      <GrupoPanelesReporte>
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
      </GrupoPanelesReporte>
    </div>
  );
}
