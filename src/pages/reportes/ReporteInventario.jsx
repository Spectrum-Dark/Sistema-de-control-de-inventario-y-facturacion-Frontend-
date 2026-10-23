import PanelReporte from "../../components/reportes/PanelReporte";
import {
  obtenerInventarioActual,
  obtenerInventarioStockBajo,
  obtenerMovimientosInventario,
} from "../../services/reportes/reportesService";
import { formatearFechaHora } from "../../utils/compartido/fecha";

const columnasInventario = [
  { etiqueta: "Código", valor: (p) => p.codigo_producto },
  { etiqueta: "Producto", valor: (p) => p.nombre_producto },
  { etiqueta: "Categoría", valor: (p) => p.categoria?.nombre_categoria ?? "—" },
  { etiqueta: "Existencia", valor: (p) => p.existencia },
  { etiqueta: "Mínima", valor: (p) => p.existencia_minima },
  { etiqueta: "Máxima", valor: (p) => p.existencia_maxima ?? "—" },
  { etiqueta: "Estado", valor: (p) => p.estado },
];

export default function ReporteInventario() {
  return (
    <div className="space-y-5">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reportes de inventario</h1>
        <p className="mt-1 text-sm text-slate-500">Consulta existencias, alertas de stock y movimientos registrados.</p>
      </header>
      <PanelReporte titulo="Inventario actual" columnas={columnasInventario} consultar={obtenerInventarioActual} busquedaPorCampo exportar />
      <PanelReporte titulo="Productos con stock bajo" descripcion="Productos cuya existencia está en el nivel mínimo o por debajo." columnas={columnasInventario} consultar={obtenerInventarioStockBajo} busquedaPorCampo exportar />
      <PanelReporte
        titulo="Movimientos de inventario"
        columnas={[
          { etiqueta: "Fecha", valor: (m) => formatearFechaHora(m.fecha_movimiento, { hora12: true }) },
          { etiqueta: "Tipo", valor: (m) => m.tipo_movimiento },
          { etiqueta: "Producto", valor: (m) => `${m.producto?.codigo_producto ?? "—"} · ${m.producto?.nombre_producto ?? "—"}` },
          { etiqueta: "Cantidad", valor: (m) => m.cantidad },
          { etiqueta: "Existencia anterior", valor: (m) => m.existencia_anterior },
          { etiqueta: "Existencia nueva", valor: (m) => m.existencia_nueva },
          { etiqueta: "Origen", valor: (m) => m.compra?.numero_compra ?? m.venta?.numero_venta ?? m.motivo ?? "—" },
          { etiqueta: "Responsable", valor: (m) => m.usuario?.nombre_completo ?? "—" },
        ]}
        consultar={obtenerMovimientosInventario}
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
    </div>
  );
}
