import { useMemo } from "react";
import { useModelos } from "../../hooks/modelos/useModelos";
import { useMarcas } from "../../hooks/marcas/useMarcas";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarModelo } from "../../services/modelos/modelosService";
import {
  FILTROS_INICIALES,
  filtrarModelos,
} from "../../utils/modelos/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosModelos from "../../components/modelos/FiltrosModelos";
import TablaModelos from "../../components/modelos/TablaModelos";
import ModalModelo from "../../components/modelos/ModalModelo";

export default function Modelos() {
  const { modelos, cargando, error, recargar, actualizarEnLista } = useModelos();
  const { marcas } = useMarcas();
  const permisos = usePermisos();

  // { id_marca: "Toyota", ... } para mostrar el nombre de cada marca
  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas]
  );

  const g = useGestionCrud({
    items: modelos,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: (lista, filtros) => filtrarModelos(lista, filtros, nombresMarcas),
    recargar,
    actualizarEnLista,
    claveId: "id_modelo",
    eliminar: eliminarModelo,
    tituloEliminado: "Modelo eliminado",
  });

  return (
    <PaginaCrud
      titulo="Modelos"
      subtitulo="Vehículos y productos · Modelos de vehículos por marca."
      textoNuevo="Nuevo modelo"
      textoCarga="Cargando modelos..."
      mensajeVacio="Aún no hay modelos registrados."
      mensajeSinResultados="Ningún modelo coincide con la búsqueda o los filtros."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={modelos.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosModelos
          filtros={g.filtros}
          marcas={marcas}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaModelos
          modelos={g.paginacion.visibles}
          nombresMarcas={nombresMarcas}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar modelo"
      mensajeEliminar={(m) => (
        <>
          ¿Seguro que quieres eliminar el modelo{" "}
          <strong>{m.nombre_modelo}</strong>? Esta acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalModelo
          key={g.modal.registro?.id_modelo ?? "nuevo"}
          modelo={g.modal.registro}
          marcas={marcas}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}