import { useState } from "react";
import { sileo } from "sileo";
import { useVentas } from "../../hooks/ventas/useVentas";
import { useClientes } from "../../hooks/clientes/useClientes";
import { useProductos } from "../../hooks/productos/useProductos";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  confirmarVenta,
  anularVenta,
} from "../../services/ventas/ventasService";
import {
  FILTROS_INICIALES,
  filtrarVentas,
} from "../../utils/ventas/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import FiltrosVentas from "../../components/ventas/FiltrosVentas";
import TablaVentas from "../../components/ventas/TablaVentas";
import ModalVenta from "../../components/ventas/ModalVenta";
import ModalDetalleVenta from "../../components/ventas/ModalDetalleVenta";
import ModalMotivoVenta from "../../components/ventas/ModalMotivoVenta";

export default function Ventas() {
  const { ventas, cargando, error, recargar, actualizarEnLista } = useVentas();
  const { clientes } = useClientes();
  const { productos } = useProductos();
  const permisos = usePermisos();
  const puedeOperar = permisos.puedeCrear;

  const [detalle, setDetalle] = useState(null);
  const [confirmando, setConfirmando] = useState(null);
  const [anulando, setAnulando] = useState(null);

  const g = useGestionCrud({
    items: ventas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarVentas,
    recargar,
    actualizarEnLista,
    claveId: "id_venta",
  });

  const confirmarSeleccionada = async () => {
    const respuesta = await confirmarVenta(confirmando.id_venta);
    sileo.success({ title: "Venta confirmada", description: respuesta.message });
    actualizarEnLista(respuesta.datos);
    setConfirmando(null);
  };

  const anularSeleccionada = async (motivo) => {
    const respuesta = await anularVenta(anulando.id_venta, { motivo });
    sileo.success({ title: "Venta anulada", description: respuesta.message });
    actualizarEnLista(respuesta.datos);
    setAnulando(null);
  };

  return (
    <PaginaCrud
      titulo="Ventas"
      subtitulo="Ventas y facturación · Registro y seguimiento de ventas."
      textoNuevo="Nueva venta"
      textoCarga="Cargando ventas..."
      mensajeVacio="Aún no hay ventas registradas."
      mensajeSinResultados="Ninguna venta coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={ventas.length > 0}
      puedeCrear={puedeOperar}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosVentas
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaVentas
          ventas={g.paginacion.visibles}
          puedeOperar={puedeOperar}
          onVerDetalle={setDetalle}
          onConfirmar={setConfirmando}
          onCorregir={g.abrirModal}
          onAnular={setAnulando}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalVenta
          key={g.modal.registro?.id_venta ?? "nueva"}
          venta={g.modal.registro}
          ventas={ventas}
          clientes={clientes}
          productos={productos}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
      {detalle && (
        <ModalDetalleVenta venta={detalle} onCerrar={() => setDetalle(null)} />
      )}
      {confirmando && (
        <ModalConfirmacion
          titulo="Confirmar venta"
          mensaje={
            <>
              Al confirmar la venta <strong>{confirmando.numero_venta}</strong>,
              se validarán las existencias y se descontarán los productos del inventario.
            </>
          }
          textoConfirmar="Confirmar venta"
          textoProceso="Confirmando..."
          variante="normal"
          onConfirmar={confirmarSeleccionada}
          onCerrar={() => setConfirmando(null)}
        />
      )}
      {anulando && (
        <ModalMotivoVenta
          venta={anulando}
          onConfirmar={anularSeleccionada}
          onCerrar={() => setAnulando(null)}
        />
      )}
    </PaginaCrud>
  );
}
