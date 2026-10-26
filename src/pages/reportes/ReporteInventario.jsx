import PanelReporte from '../../components/reportes/PanelReporte';
import GrupoPanelesReporte from '../../components/reportes/GrupoPanelesReporte';
import EncabezadoReporte from '../../components/reportes/EncabezadoReporte';
import { Boxes, ArrowLeftRight, TriangleAlert } from 'lucide-react';
import {
  obtenerInventarioActual,
  obtenerInventarioStockBajo,
  obtenerMovimientosInventario,
} from '../../services/reportes/reportesService';
import { formatearFechaHora } from '../../utils/compartido/fecha';

// Definición constante de las columnas comunes para los paneles de inventario actual y stock bajo.
const columnasInventario = [
  { etiqueta: 'Código', valor: (p) => p.codigo_producto },
  { etiqueta: 'Producto', valor: (p) => p.nombre_producto },
  { etiqueta: 'Categoría', valor: (p) => p.categoria?.nombre_categoria ?? '—' },
  { etiqueta: 'Existencia', valor: (p) => p.existencia },
  { etiqueta: 'Mínima', valor: (p) => p.existencia_minima },
  { etiqueta: 'Máxima', valor: (p) => p.existencia_maxima ?? '—' },
  { etiqueta: 'Estado', valor: (p) => p.estado },
];

// Definición constante de las columnas para estructurar los datos del panel de movimientos de inventario.
const columnasMovimientos = [
  {
    etiqueta: 'Fecha',
    valor: (m) => formatearFechaHora(m.fecha_movimiento, { hora12: true }),
  },
  { etiqueta: 'Tipo', valor: (m) => m.tipo_movimiento },
  {
    etiqueta: 'Producto',
    valor: (m) =>
      `${m.producto?.codigo_producto ?? '—'} · ${m.producto?.nombre_producto ?? '—'}`,
  },
  { etiqueta: 'Cantidad', valor: (m) => m.cantidad },
  { etiqueta: 'Existencia anterior', valor: (m) => m.existencia_anterior },
  { etiqueta: 'Existencia nueva', valor: (m) => m.existencia_nueva },
  {
    etiqueta: 'Origen',
    valor: (m) =>
      m.compra?.numero_compra ?? m.venta?.numero_venta ?? m.motivo ?? '—',
  },
  { etiqueta: 'Responsable', valor: (m) => m.usuario?.nombre_completo ?? '—' },
];

/**
 * COMPONENTE PRINCIPAL: ReporteInventario
 * Explicación: Orquestador de la vista de reportes de inventario que muestra un encabezado descriptivo
 * y agrupa tres paneles de reporte independientes para consultar existencias generales, alertas de stock bajo
 * y el registro detallado de movimientos de inventario con filtros por fecha y búsqueda.
 */
export default function ReporteInventario() {
  return (
    <div className="space-y-5">
      {/* Componente de encabezado que define el título y la descripción general del módulo de reportes de inventario */}
      <EncabezadoReporte
        Icono={Boxes}
        titulo="Reportes de inventario"
        descripcion="Consulta existencias, alertas de stock y movimientos registrados."
      />

      {/* Contenedor que agrupa los paneles de reportes en una distribución estructurada */}
      <GrupoPanelesReporte>
        {/* Panel de reportes para consultar el estado actual del inventario de productos */}
        <PanelReporte
          titulo="Inventario actual"
          Icono={Boxes}
          columnas={columnasInventario}
          consultar={obtenerInventarioActual}
          busquedaPorCampo
          exportar
        />

        {/* Panel de reportes enfocado en mostrar los productos que se encuentran en nivel de existencia mínimo o por debajo */}
        <PanelReporte
          titulo="Productos con stock bajo"
          Icono={TriangleAlert}
          descripcion="Productos cuya existencia está en el nivel mínimo o por debajo."
          columnas={columnasInventario}
          consultar={obtenerInventarioStockBajo}
          busquedaPorCampo
          exportar
        />

        {/* Panel de reportes detallado para consultar los movimientos de inventario con carga actualizada, filtros por fecha y búsqueda */}
        <PanelReporte
          titulo="Movimientos de inventario"
          Icono={ArrowLeftRight}
          columnas={columnasMovimientos}
          columnasBusqueda={columnasMovimientos.filter(
            (columna) => columna.etiqueta !== 'Fecha'
          )}
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
