import { useMarcas } from "../../hooks/marcas/useMarcas";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarMarca } from "../../services/marcas/marcasService";
import { FILTROS_INICIALES, filtrarMarcas } from "../../utils/marcas/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosMarcas from "../../components/marcas/FiltrosMarcas";
import TablaMarcas from "../../components/marcas/TablaMarcas";
import ModalMarca from "../../components/marcas/ModalMarca";

export default function Marcas() {
  const { marcas, cargando, error, recargar, actualizarEnLista } = useMarcas();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: marcas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarMarcas,
    recargar,
    actualizarEnLista,
    claveId: "id_marca",
    eliminar: eliminarMarca,
    tituloEliminado: "Marca eliminada",
  });

  return (
    <PaginaCrud
      titulo="Marcas"
      subtitulo="Marcas de vehículos."
      textoNuevo="Nueva marca"
      textoCarga="Cargando marcas..."
      mensajeVacio="Aún no hay marcas registradas."
      mensajeSinResultados="Ninguna marca coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={marcas.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosMarcas
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaMarcas
          marcas={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar marca"
      mensajeEliminar={(m) => (
        <>
          ¿Seguro que quieres eliminar la marca{" "}
          <strong>{m.nombre_marca}</strong>? Esta acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalMarca
          key={g.modal.registro?.id_marca ?? "nueva"}
          marca={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
