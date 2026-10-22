import { useCategorias } from "../../hooks/categorias/useCategorias";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarCategoria } from "../../services/categorias/categoriasService";
import {
  FILTROS_INICIALES,
  filtrarCategorias,
} from "../../utils/categorias/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosCategorias from "../../components/categorias/FiltrosCategorias";
import TablaCategorias from "../../components/categorias/TablaCategorias";
import ModalCategoria from "../../components/categorias/ModalCategoria";

export default function Categorias() {
  const { categorias, cargando, error, recargar, actualizarEnLista } =
    useCategorias();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: categorias,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCategorias,
    recargar,
    actualizarEnLista,
    claveId: "id_categoria",
    eliminar: eliminarCategoria,
    tituloEliminado: "Categoría eliminada",
  });

  return (
    <PaginaCrud
      titulo="Categorías"
      subtitulo="Categorías de los repuestos."
      textoNuevo="Nueva categoría"
      textoCarga="Cargando categorías..."
      mensajeVacio="Aún no hay categorías registradas."
      mensajeSinResultados="Ninguna categoría coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={categorias.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosCategorias
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaCategorias
          categorias={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar categoría"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar la categoría{" "}
          <strong>{c.nombre_categoria}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalCategoria
          key={g.modal.registro?.id_categoria ?? "nueva"}
          categoria={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
