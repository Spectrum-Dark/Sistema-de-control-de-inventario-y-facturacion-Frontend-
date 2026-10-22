import { useMemo } from "react";
import { useCompatibilidades } from "../../hooks/compatibilidades/useCompatibilidades";
import { useProductos } from "../../hooks/productos/useProductos";
import { useModelos } from "../../hooks/modelos/useModelos";
import { useMarcas } from "../../hooks/marcas/useMarcas";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarCompatibilidad } from "../../services/compatibilidades/compatibilidadesService";
import {
  FILTROS_INICIALES,
  filtrarCompatibilidades,
} from "../../utils/compatibilidades/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosCompatibilidades from "../../components/compatibilidades/FiltrosCompatibilidades";
import TablaCompatibilidades from "../../components/compatibilidades/TablaCompatibilidades";
import ModalCompatibilidad from "../../components/compatibilidades/ModalCompatibilidad";

export default function Compatibilidades() {
  const { compatibilidades, cargando, error, recargar, actualizarEnLista } =
    useCompatibilidades();
  const { productos } = useProductos();
  const { modelos } = useModelos();
  const { marcas } = useMarcas();
  const permisos = usePermisos();

  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas]
  );

  // Cada compatibilidad se completa con su producto, su modelo y el nombre de la marca
  const filas = useMemo(() => {
    const productosPorId = Object.fromEntries(
      productos.map((p) => [p.id_producto, p])
    );
    const modelosPorId = Object.fromEntries(
      modelos.map((m) => [m.id_modelo, m])
    );

    return compatibilidades.map((c) => {
      const modelo = modelosPorId[c.id_modelo];
      return {
        ...c,
        producto: productosPorId[c.id_producto],
        modelo,
        nombre_marca: modelo ? nombresMarcas[modelo.id_marca] : undefined,
      };
    });
  }, [compatibilidades, productos, modelos, nombresMarcas]);

  const g = useGestionCrud({
    items: filas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCompatibilidades,
    recargar,
    actualizarEnLista,
    claveId: "id_compatibilidad",
    eliminar: eliminarCompatibilidad,
    tituloEliminado: "Compatibilidad eliminada",
  });

  return (
    <PaginaCrud
      titulo="Compatibilidades"
      subtitulo="Vehículos y productos · Productos compatibles con cada modelo."
      textoNuevo="Nueva compatibilidad"
      textoCarga="Cargando compatibilidades..."
      mensajeVacio="Aún no hay compatibilidades registradas."
      mensajeSinResultados="Ninguna compatibilidad coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={compatibilidades.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosCompatibilidades
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
        <TablaCompatibilidades
          filas={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar compatibilidad"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar la compatibilidad de{" "}
          <strong>{c.producto?.nombre_producto ?? "este producto"}</strong> con{" "}
          <strong>{c.modelo?.nombre_modelo ?? "este modelo"}</strong>? Esta
          acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalCompatibilidad
          key={g.modal.registro?.id_compatibilidad ?? "nueva"}
          compatibilidad={g.modal.registro}
          productos={productos}
          modelos={modelos}
          nombresMarcas={nombresMarcas}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}