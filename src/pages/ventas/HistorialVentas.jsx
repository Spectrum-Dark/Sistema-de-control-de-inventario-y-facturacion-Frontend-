import { useMemo } from "react";
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
      titulo="Correcciones"
      subtitulo="Ventas y facturación · Correcciones y anulaciones registradas."
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
