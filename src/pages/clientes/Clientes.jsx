import { useClientes } from "../../hooks/clientes/useClientes";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarCliente } from "../../services/clientes/clientesService";
import {
  FILTROS_INICIALES,
  filtrarClientes,
} from "../../utils/clientes/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosClientes from "../../components/clientes/FiltrosClientes";
import TablaClientes from "../../components/clientes/TablaClientes";
import ModalCliente from "../../components/clientes/ModalCliente";

export default function Clientes() {
  const { clientes, cargando, error, recargar, actualizarEnLista } =
    useClientes();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: clientes,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarClientes,
    recargar,
    actualizarEnLista,
    claveId: "id_cliente",
    eliminar: eliminarCliente,
    tituloEliminado: "Cliente eliminado",
  });

  return (
    <PaginaCrud
      titulo="Clientes"
      subtitulo="Clientes · Registro de clientes para las ventas."
      textoNuevo="Nuevo cliente"
      textoCarga="Cargando clientes..."
      mensajeVacio="Aún no hay clientes registrados."
      mensajeSinResultados="Ningún cliente coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={clientes.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosClientes
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaClientes
          clientes={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar cliente"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar al cliente{" "}
          <strong>{c.nombre_cliente}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalCliente
          key={g.modal.registro?.id_cliente ?? "nuevo"}
          cliente={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}