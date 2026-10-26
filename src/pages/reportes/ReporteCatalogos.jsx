import PanelReporte from '../../components/reportes/PanelReporte';
import GrupoPanelesReporte from '../../components/reportes/GrupoPanelesReporte';
import EncabezadoReporte from '../../components/reportes/EncabezadoReporte';
import { UsersRound, Truck } from 'lucide-react';
import {
  obtenerReporteClientes,
  obtenerReporteProveedores,
} from '../../services/reportes/reportesService';

/**
 * COMPONENTE PRINCIPAL: ReporteCatalogos
 * Explicación: Orquestador de la vista de reportes de catálogos que renderiza un encabezado descriptivo
 * y agrupa dos paneles de reporte independientes para la consulta, búsqueda y exportación de datos de clientes y proveedores.
 */
export default function ReporteCatalogos() {
  return (
    <div className="space-y-5">
      {/* Componente de encabezado que define el título y la descripción general del módulo de reportes de catálogos */}
      <EncabezadoReporte
        Icono={UsersRound}
        titulo="Reportes de clientes y proveedores"
        descripcion="Consulta los registros de clientes y proveedores disponibles en el sistema."
      />

      {/* Contenedor que agrupa los paneles de reportes en una distribución estructurada */}
      <GrupoPanelesReporte>
        {/* Panel de reportes específico para el catálogo de clientes con definición de columnas y servicio asociado */}
        <PanelReporte
          titulo="Clientes"
          Icono={UsersRound}
          columnas={[
            { etiqueta: 'Nombre', valor: (c) => c.nombre_cliente },
            {
              etiqueta: 'Identificación',
              valor: (c) => c.identificacion ?? '—',
            },
            { etiqueta: 'Teléfono', valor: (c) => c.telefono ?? '—' },
            { etiqueta: 'Correo', valor: (c) => c.correo ?? '—' },
            { etiqueta: 'Dirección', valor: (c) => c.direccion ?? '—' },
            { etiqueta: 'Estado', valor: (c) => c.estado ?? 'Activo' },
          ]}
          consultar={obtenerReporteClientes}
          busquedaPorCampo
          exportar
        />

        {/* Panel de reportes específico para el catálogo de proveedores con definición de columnas y servicio asociado */}
        <PanelReporte
          titulo="Proveedores"
          Icono={Truck}
          columnas={[
            { etiqueta: 'Nombre', valor: (p) => p.nombre_proveedor },
            {
              etiqueta: 'Identificación',
              valor: (p) => p.identificacion ?? '—',
            },
            { etiqueta: 'Teléfono', valor: (p) => p.telefono ?? '—' },
            { etiqueta: 'Correo', valor: (p) => p.correo ?? '—' },
            { etiqueta: 'Dirección', valor: (p) => p.direccion ?? '—' },
            { etiqueta: 'Estado', valor: (p) => p.estado },
          ]}
          consultar={obtenerReporteProveedores}
          busquedaPorCampo
          exportar
        />
      </GrupoPanelesReporte>
    </div>
  );
}
