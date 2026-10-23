import PanelReporte from "../../components/reportes/PanelReporte";
import {
  obtenerProductosMasVendidos,
  obtenerReporteVentas,
} from "../../services/reportes/reportesService";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function ReporteVentas() {
  return (
    <div className="space-y-5">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reportes de ventas</h1>
        <p className="mt-1 text-sm text-slate-500">Consulta ventas y productos más vendidos en el período seleccionado.</p>
      </header>
      <PanelReporte
        titulo="Ventas registradas"
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
    </div>
  );
}
