import PanelReporte from "../../components/reportes/PanelReporte";
import { Boxes, ArrowLeftRight, TriangleAlert } from "lucide-react";
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
      <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><Boxes size={20} /></span><div><h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Reportes de inventario</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Consulta existencias, alertas de stock y movimientos registrados.</p></div>
      </header>
      <PanelReporte titulo="Inventario actual" Icono={Boxes} columnas={columnasInventario} consultar={obtenerInventarioActual} busquedaPorCampo exportar />
      <PanelReporte titulo="Productos con stock bajo" Icono={TriangleAlert} descripcion="Productos cuya existencia está en el nivel mínimo o por debajo." columnas={columnasInventario} consultar={obtenerInventarioStockBajo} busquedaPorCampo exportar />
      <PanelReporte
        titulo="Movimientos de inventario"
        Icono={ArrowLeftRight}
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
