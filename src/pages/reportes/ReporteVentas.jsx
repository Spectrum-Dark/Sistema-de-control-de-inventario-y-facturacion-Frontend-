import PanelReporte from "../../components/reportes/PanelReporte";
import GrupoPanelesReporte from "../../components/reportes/GrupoPanelesReporte";
import EncabezadoReporte from "../../components/reportes/EncabezadoReporte";
import { ReceiptText, TrendingUp } from "lucide-react";
import {
  obtenerProductosMasVendidos,
  obtenerReporteVentas,
} from "../../services/reportes/reportesService";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function ReporteVentas() {
  return (
    <div className="space-y-5">
      <EncabezadoReporte Icono={ReceiptText} titulo="Reportes de ventas" descripcion="Consulta ventas y productos más vendidos en el período seleccionado." />
      <GrupoPanelesReporte>
      <PanelReporte
        titulo="Ventas registradas"
        Icono={ReceiptText}
        columnas={[
          { etiqueta: "Número", valor: (v) => v.numero_venta },
          { etiqueta: "Fecha", valor: (v) => formatearFechaHora(v.fecha_venta, { hora12: true }) },
          { etiqueta: "Cliente", valor: (v) => v.cliente?.nombre_cliente ?? "—" },
          { etiqueta: "Productos", valor: (v) => (v.detalles ?? []).map((d) => `${d.producto?.codigo_producto ?? "—"} · ${d.producto?.nombre_producto ?? "Producto"} (${d.cantidad})`).join("\n") || "—" },
          { etiqueta: "Subtotal", valor: (v) => formatearPrecio(v.subtotal) },
          { etiqueta: "Impuesto", valor: (v) => formatearPrecio(v.impuesto) },
          { etiqueta: "Total", valor: (v) => formatearPrecio(v.total) },
          { etiqueta: "Estado", valor: (v) => v.estado },
          { etiqueta: "Usuario", valor: (v) => v.usuario?.nombre_completo ?? "—" },
        ]}
        consultar={obtenerReporteVentas}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
      <PanelReporte
        titulo="Productos más vendidos"
        Icono={TrendingUp}
        columnas={[
          { etiqueta: "Código", valor: (d) => d.producto?.codigo_producto ?? "—" },
          { etiqueta: "Producto", valor: (d) => d.producto?.nombre_producto ?? "—" },
          { etiqueta: "Cantidad vendida", valor: (d) => d.total_vendido },
          { etiqueta: "Ingresos", valor: (d) => formatearPrecio(d.ingreso_total) },
        ]}
        consultar={obtenerProductosMasVendidos}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
      </GrupoPanelesReporte>
    </div>
  );
}
