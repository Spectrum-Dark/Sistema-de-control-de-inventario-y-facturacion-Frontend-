import { useMemo } from "react";
import { Package, Check, CircleMinus, TriangleAlert } from "lucide-react";
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
import { tieneStockBajo } from "../../utils/productos/formato";

function ResumenProductos({ productos }) {
  const metricas = [
    { etiqueta: "Productos registrados", valor: productos.length, Icono: Package },
    { etiqueta: "Activos", valor: productos.filter((producto) => producto.estado === "Activo").length, Icono: Check },
    { etiqueta: "Stock bajo", valor: productos.filter(tieneStockBajo).length, Icono: TriangleAlert },
    { etiqueta: "Inactivos", valor: productos.filter((producto) => producto.estado === "Inactivo").length, Icono: CircleMinus },
  ];
  return <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen de productos">{metricas.map(({ etiqueta, valor, Icono }) => <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span><span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span></article>)}</section>;
}

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
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><Package size={18} /></span>Productos</span>}
      subtitulo="Administra el catálogo de repuestos, precios y niveles de inventario."
      resumen={!cargando && !error ? <ResumenProductos productos={productos} /> : null}
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
      nuevoEnFiltros
      filtros={
        <FiltrosProductos
          filtros={g.filtros}
          categorias={categorias}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
          puedeCrear={permisos.puedeCrear}
          onNuevo={g.abrirModal}
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
