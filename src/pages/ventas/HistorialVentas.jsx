import { useMemo } from "react";
import { ClipboardList, FileClock, OctagonX } from "lucide-react";
import { useHistorialVentas } from "../../hooks/ventas/useHistorialVentas";
import { useClientes } from "../../hooks/clientes/useClientes";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  FILTROS_INICIALES,
  filtrarHistorial,
} from "../../utils/ventas/filtrosHistorial";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosHistorialVentas from "../../components/ventas/FiltrosHistorialVentas";
import TablaHistorialVentas from "../../components/ventas/TablaHistorialVentas";
import ModalCambiosVenta from "../../components/ventas/ModalCambiosVenta";

function ResumenHistorialVentas({ historial }) {
  const metricas = [
    { etiqueta: "Movimientos registrados", valor: historial.length, Icono: ClipboardList },
    { etiqueta: "Correcciones", valor: historial.filter((r) => r.tipo_operacion === "Correccion").length, Icono: FileClock },
    { etiqueta: "Anulaciones", valor: historial.filter((r) => r.tipo_operacion === "Anulacion").length, Icono: OctagonX },
  ];
  return <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen del historial de ventas">{metricas.map(({ etiqueta, valor, Icono }) => <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span><span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span></article>)}</section>;
}

export default function HistorialVentas() {
  const { historial, cargando, error, recargar, actualizarEnLista } =
    useHistorialVentas();
  const { clientes } = useClientes();
  const nombresClientes = useMemo(
    () => Object.fromEntries(clientes.map((cliente) => [cliente.id_cliente, cliente.nombre_cliente])),
    [clientes],
  );

  const g = useGestionCrud({
    items: historial,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarHistorial,
    recargar,
    actualizarEnLista,
    claveId: "id_historial_venta",
  });

  return (
    <PaginaCrud
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><FileClock size={18} /></span>Correcciones</span>}
      subtitulo="Ventas y facturación · Correcciones y anulaciones registradas."
      resumen={!cargando && !error ? <ResumenHistorialVentas historial={historial} /> : null}
      textoCarga="Cargando historial de ventas..."
      mensajeVacio="Aún no hay correcciones o anulaciones de ventas registradas."
      mensajeSinResultados="Ningún registro coincide con la búsqueda."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={historial.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosHistorialVentas
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaHistorialVentas
          historial={g.paginacion.visibles}
          onVerCambios={g.abrirModal}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalCambiosVenta
          registro={g.modal.registro}
          nombresClientes={nombresClientes}
          onCerrar={g.cerrarModal}
        />
      )}
    </PaginaCrud>
  );
}
