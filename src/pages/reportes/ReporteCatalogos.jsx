import PanelReporte from "../../components/reportes/PanelReporte";
import { UsersRound, Truck } from "lucide-react";
import {
  obtenerReporteClientes,
  obtenerReporteProveedores,
} from "../../services/reportes/reportesService";

export default function ReporteCatalogos() {
  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><UsersRound size={20} /></span><div><h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Reportes de clientes y proveedores</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Consulta los registros de clientes y proveedores disponibles en el sistema.</p></div>
      </header>
      <PanelReporte
        titulo="Clientes"
        Icono={UsersRound}
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
        Icono={Truck}
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
