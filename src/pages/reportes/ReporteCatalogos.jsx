import PanelReporte from "../../components/reportes/PanelReporte";
import {
  obtenerReporteClientes,
  obtenerReporteProveedores,
} from "../../services/reportes/reportesService";

export default function ReporteCatalogos() {
  return (
    <div className="space-y-5">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reportes de clientes y proveedores</h1>
        <p className="mt-1 text-sm text-slate-500">Consulta los registros de clientes y proveedores disponibles en el sistema.</p>
      </header>
      <PanelReporte
        titulo="Clientes"
        columnas={[
          { etiqueta: "Nombre", valor: (c) => c.nombre_cliente },
          { etiqueta: "Identificación", valor: (c) => c.identificacion ?? "—" },
          { etiqueta: "Teléfono", valor: (c) => c.telefono ?? "—" },
          { etiqueta: "Correo", valor: (c) => c.correo ?? "—" },
          { etiqueta: "Dirección", valor: (c) => c.direccion ?? "—" },
          { etiqueta: "Estado", valor: (c) => c.estado ?? "Activo" },
        ]}
        consultar={obtenerReporteClientes}
        busquedaPorCampo
        exportar
      />
      <PanelReporte
        titulo="Proveedores"
        columnas={[
          { etiqueta: "Nombre", valor: (p) => p.nombre_proveedor },
          { etiqueta: "Identificación", valor: (p) => p.identificacion ?? "—" },
          { etiqueta: "Teléfono", valor: (p) => p.telefono ?? "—" },
          { etiqueta: "Correo", valor: (p) => p.correo ?? "—" },
          { etiqueta: "Dirección", valor: (p) => p.direccion ?? "—" },
          { etiqueta: "Estado", valor: (p) => p.estado },
        ]}
        consultar={obtenerReporteProveedores}
        busquedaPorCampo
        exportar
      />
    </div>
  );
}
