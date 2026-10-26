import PanelReporte from '../../components/reportes/PanelReporte';
import GrupoPanelesReporte from '../../components/reportes/GrupoPanelesReporte';
import EncabezadoReporte from '../../components/reportes/EncabezadoReporte';
import { ReceiptText, TrendingUp } from 'lucide-react';
import {
  obtenerProductosMasVendidos,
  obtenerReporteVentas,
} from '../../services/reportes/reportesService';
import { formatearFechaHora } from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';

/**
 * COMPONENTE PRINCIPAL: ReporteVentas
 * Explicación: Orquestador de la vista de reportes de ventas que muestra un encabezado descriptivo
 * y agrupa dos paneles de reporte independientes para consultar las ventas registradas con sus detalles e importes,
 * así como el ranking de los productos más vendidos por período, ambos con filtros de fecha, búsqueda y exportación.
 */
export default function ReporteVentas() {
  return (
    <div className="space-y-5">
      {/* Componente de encabezado que define el título y la descripción general del módulo de reportes de ventas */}
      <EncabezadoReporte
        Icono={ReceiptText}
        titulo="Reportes de ventas"
        descripcion="Consulta ventas y productos más vendidos en el período seleccionado."
      />

      {/* Contenedor que agrupa los paneles de reportes en una distribución estructurada */}
      <GrupoPanelesReporte>
        {/* Panel de reportes para consultar el listado detallado de ventas con fecha, cliente, productos, totales y estado */}
        <PanelReporte
          titulo="Ventas registradas"
          Icono={ReceiptText}
          columnas={[
            { etiqueta: 'Número', valor: (v) => v.numero_venta },
            {
              etiqueta: 'Fecha',
              valor: (v) => formatearFechaHora(v.fecha_venta, { hora12: true }),
            },
            {
              etiqueta: 'Cliente',
              valor: (v) => v.cliente?.nombre_cliente ?? '—',
            },
            {
              etiqueta: 'Productos',
              valor: (v) =>
                (v.detalles ?? [])
                  .map(
                    (d) =>
                      `${d.producto?.codigo_producto ?? '—'} · ${d.producto?.nombre_producto ?? 'Producto'} (${d.cantidad})`
                  )
                  .join('\n') || '—',
            },
            { etiqueta: 'Subtotal', valor: (v) => formatearPrecio(v.subtotal) },
            { etiqueta: 'Impuesto', valor: (v) => formatearPrecio(v.impuesto) },
            { etiqueta: 'Total', valor: (v) => formatearPrecio(v.total) },
            { etiqueta: 'Estado', valor: (v) => v.estado },
            {
              etiqueta: 'Usuario',
              valor: (v) => v.usuario?.nombre_completo ?? '—',
            },
          ]}
          consultar={obtenerReporteVentas}
          filtrosPorFecha
          busquedaPorCampo
          exportar
        />

        {/* Panel de reportes para consultar el rendimiento y volumen de venta por producto (más vendidos e ingresos generados) */}
        <PanelReporte
          titulo="Productos más vendidos"
          Icono={TrendingUp}
          columnas={[
            {
              etiqueta: 'Código',
              valor: (d) => d.producto?.codigo_producto ?? '—',
            },
            {
              etiqueta: 'Producto',
              valor: (d) => d.producto?.nombre_producto ?? '—',
            },
            { etiqueta: 'Cantidad vendida', valor: (d) => d.total_vendido },
            {
              etiqueta: 'Ingresos',
              valor: (d) => formatearPrecio(d.ingreso_total),
            },
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
