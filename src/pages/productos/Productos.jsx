import { useMemo } from "react";
import { useProductos } from "../../hooks/productos/useProductos";
import { useCategorias } from "../../hooks/categorias/useCategorias";
import { useProveedores } from "../../hooks/proveedores/useProveedores";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarProducto } from "../../services/productos/productosService";
import {
  FILTROS_INICIALES,
  filtrarProductos,
} from "../../utils/productos/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosProductos from "../../components/productos/FiltrosProductos";
import TablaProductos from "../../components/productos/TablaProductos";
import ModalProducto from "../../components/productos/ModalProducto";

export default function Productos() {
  const { productos, cargando, error, recargar, actualizarEnLista } =
    useProductos();
  const { categorias } = useCategorias();
  const { proveedores } = useProveedores();
  const permisos = usePermisos();

  // { id_categoria: "Frenos", ... } para mostrar el nombre de cada categoría
  const nombresCategorias = useMemo(
    () =>
      Object.fromEntries(
        categorias.map((c) => [c.id_categoria, c.nombre_categoria])
      ),
    [categorias]
  );

  const g = useGestionCrud({
    items: productos,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: (lista, filtros) =>
      filtrarProductos(lista, filtros, nombresCategorias),
    recargar,
    actualizarEnLista,
    claveId: "id_producto",
    eliminar: eliminarProducto,
    tituloEliminado: "Producto eliminado",
  });

  return (
    <PaginaCrud
      titulo="Productos"
      subtitulo="Vehículos y productos · Repuestos del inventario."
      textoNuevo="Nuevo producto"
      textoCarga="Cargando productos..."
      mensajeVacio="Aún no hay productos registrados."
      mensajeSinResultados="Ningún producto coincide con la búsqueda o los filtros."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={productos.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      filtros={
        <FiltrosProductos
          filtros={g.filtros}
          categorias={categorias}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaProductos
          productos={g.paginacion.visibles}
          nombresCategorias={nombresCategorias}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar producto"
      mensajeEliminar={(p) => (
        <>
          ¿Seguro que quieres eliminar el producto{" "}
          <strong>{p.nombre_producto}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalProducto
          key={g.modal.registro?.id_producto ?? "nuevo"}
          producto={g.modal.registro}
          categorias={categorias}
          proveedores={proveedores}
          productos={productos}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
