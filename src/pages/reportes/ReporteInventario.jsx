import PanelReporte from "../../components/reportes/PanelReporte";
import GrupoPanelesReporte from "../../components/reportes/GrupoPanelesReporte";
import EncabezadoReporte from "../../components/reportes/EncabezadoReporte";
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

const columnasMovimientos = [
  { etiqueta: "Fecha", valor: (m) => formatearFechaHora(m.fecha_movimiento, { hora12: true }) },
  { etiqueta: "Tipo", valor: (m) => m.tipo_movimiento },
  { etiqueta: "Producto", valor: (m) => `${m.producto?.codigo_producto ?? "—"} · ${m.producto?.nombre_producto ?? "—"}` },
  { etiqueta: "Cantidad", valor: (m) => m.cantidad },
  { etiqueta: "Existencia anterior", valor: (m) => m.existencia_anterior },
  { etiqueta: "Existencia nueva", valor: (m) => m.existencia_nueva },
  { etiqueta: "Origen", valor: (m) => m.compra?.numero_compra ?? m.venta?.numero_venta ?? m.motivo ?? "—" },
  { etiqueta: "Responsable", valor: (m) => m.usuario?.nombre_completo ?? "—" },
];

export default function ReporteInventario() {
  return (
    <div className="space-y-5">
      <EncabezadoReporte Icono={Boxes} titulo="Reportes de inventario" descripcion="Consulta existencias, alertas de stock y movimientos registrados." />
      <GrupoPanelesReporte>
      <PanelReporte titulo="Inventario actual" Icono={Boxes} columnas={columnasInventario} consultar={obtenerInventarioActual} busquedaPorCampo exportar />
      <PanelReporte titulo="Productos con stock bajo" Icono={TriangleAlert} descripcion="Productos cuya existencia está en el nivel mínimo o por debajo." columnas={columnasInventario} consultar={obtenerInventarioStockBajo} busquedaPorCampo exportar />
      <PanelReporte
        titulo="Movimientos de inventario"
        Icono={ArrowLeftRight}
        columnas={columnasMovimientos}
        columnasBusqueda={columnasMovimientos.filter((columna) => columna.etiqueta !== "Fecha")}
        consultar={obtenerMovimientosInventario}
        cargarSiempreActualizado
        filtrosPorFecha
        busquedaPorCampo
        exportar
      />
      </GrupoPanelesReporte>
    </div>
  );
}
