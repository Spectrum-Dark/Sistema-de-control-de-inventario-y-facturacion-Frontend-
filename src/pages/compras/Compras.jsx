import { useState } from "react";
import { sileo } from "sileo";
import { useCompras } from "../../hooks/compras/useCompras";
import { useProveedores } from "../../hooks/proveedores/useProveedores";
import { useProductos } from "../../hooks/productos/useProductos";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { confirmarCompra } from "../../services/compras/comprasService";
import { FILTROS_INICIALES, filtrarCompras } from "../../utils/compras/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import FiltrosCompras from "../../components/compras/FiltrosCompras";
import TablaCompras from "../../components/compras/TablaCompras";
import ModalCompra from "../../components/compras/ModalCompra";
import ModalDetalleCompra from "../../components/compras/ModalDetalleCompra";

export default function Compras() {
  const { compras, cargando, error, recargar, actualizarEnLista } =
    useCompras();
  const { proveedores } = useProveedores();
  const { productos } = useProductos();
  const permisos = usePermisos();

  // Administrador y Operador registran, confirman y corrigen
  const puedeOperar = permisos.puedeCrear;

  const [detalle, setDetalle] = useState(null);
  const [confirmando, setConfirmando] = useState(null);

  // La ventana de crear/corregir usa el modal de useGestionCrud:
  // abrirModal() = nueva compra, abrirModal(compra) = corregir
  const g = useGestionCrud({
    items: compras,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCompras,
    recargar,
    actualizarEnLista,
    claveId: "id_compra",
  });

  // Si el backend rechaza, el error lo muestra la ventana de confirmación
  const confirmarSeleccionada = async () => {
    const respuesta = await confirmarCompra(confirmando.id_compra);
    sileo.success({
      title: "Compra confirmada",
      description: respuesta.message,
    });
    actualizarEnLista(respuesta.datos);
    setConfirmando(null);
  };

  return (
    <PaginaCrud
      titulo="Compras"
      subtitulo="Compras e inventario · Registro de compras a proveedores."
      textoNuevo="Nueva compra"
      textoCarga="Cargando compras..."
      mensajeVacio="Aún no hay compras registradas."
      mensajeSinResultados="Ninguna compra coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={compras.length > 0}
      puedeCrear={puedeOperar}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosCompras
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaCompras
          compras={g.paginacion.visibles}
          puedeOperar={puedeOperar}
          onVerDetalle={setDetalle}
          onConfirmar={setConfirmando}
          onCorregir={g.abrirModal}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalCompra
          key={g.modal.registro?.id_compra ?? "nueva"}
          compra={g.modal.registro}
          compras={compras}
          proveedores={proveedores}
          productos={productos}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}

      {detalle && (
        <ModalDetalleCompra
          compra={detalle}
          onCerrar={() => setDetalle(null)}
        />
      )}

      {confirmando && (
        <ModalConfirmacion
          titulo="Confirmar compra"
          mensaje={
            <>
              Al confirmar la compra{" "}
              <strong>{confirmando.numero_compra}</strong>, sus productos se
              sumarán al inventario. Después solo podrás modificarla con una
              corrección, que queda en el historial.
            </>
          }
          textoConfirmar="Confirmar compra"
          textoProceso="Confirmando..."
          variante="normal"
          onConfirmar={confirmarSeleccionada}
          onCerrar={() => setConfirmando(null)}
        />
      )}
    </PaginaCrud>
  );
}
