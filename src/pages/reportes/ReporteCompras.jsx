import PanelReporte from "../../components/reportes/PanelReporte";
import { ShoppingCart } from "lucide-react";
import { obtenerReporteCompras } from "../../services/reportes/reportesService";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function ReporteCompras() {
  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><ShoppingCart size={20} /></span><div><h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Reporte de compras</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Consulta compras por rango de fechas y estado, incluidos sus productos y totales.</p></div>
      </header>
      <PanelReporte
        titulo="Compras registradas"
        Icono={ShoppingCart}
        columnas={[
          { etiqueta: "Número", valor: (c) => c.numero_compra },
          { etiqueta: "Fecha", valor: (c) => formatearFechaHora(c.fecha_compra, { hora12: true }) },
          { etiqueta: "Proveedor", valor: (c) => c.proveedor?.nombre_proveedor ?? "—" },
          { etiqueta: "Productos", valor: (c) => (c.detalles ?? []).map((d) => `${d.producto?.codigo_producto ?? "—"} · ${d.producto?.nombre_producto ?? "Producto"} (${d.cantidad})`).join("\n") || "—" },
          { etiqueta: "Subtotal", valor: (c) => formatearPrecio(c.subtotal) },
          { etiqueta: "Impuesto", valor: (c) => formatearPrecio(c.impuesto) },
          { etiqueta: "Total", valor: (c) => formatearPrecio(c.total) },
          { etiqueta: "Estado", valor: (c) => c.estado },
          { etiqueta: "Usuario", valor: (c) => c.usuario?.nombre_completo ?? "—" },
        ]}
        consultar={obtenerReporteCompras}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
    </div>
  );
}
