import { useProveedores } from "../../hooks/proveedores/useProveedores";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarProveedor } from "../../services/proveedores/proveedoresService";
import {
  FILTROS_INICIALES,
  filtrarProveedores,
} from "../../utils/proveedores/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosProveedores from "../../components/proveedores/FiltrosProveedores";
import TablaProveedores from "../../components/proveedores/TablaProveedores";
import ModalProveedor from "../../components/proveedores/ModalProveedor";

export default function Proveedores() {
  const { proveedores, cargando, error, recargar, actualizarEnLista } =
    useProveedores();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: proveedores,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarProveedores,
    recargar,
    actualizarEnLista,
    claveId: "id_proveedor",
    eliminar: eliminarProveedor,
    tituloEliminado: "Proveedor eliminado",
  });

  return (
    <PaginaCrud
      titulo="Proveedores"
      subtitulo="Catálogos · Registro de proveedores."
      textoNuevo="Nuevo proveedor"
      textoCarga="Cargando proveedores..."
      mensajeVacio="Aún no hay proveedores registrados."
      mensajeSinResultados="Ningún proveedor coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={proveedores.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosProveedores
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaProveedores
          proveedores={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar proveedor"
      mensajeEliminar={(p) => (
        <>
          ¿Seguro que quieres eliminar al proveedor{" "}
          <strong>{p.nombre_proveedor}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalProveedor
          key={g.modal.registro?.id_proveedor ?? "nuevo"}
          proveedor={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
