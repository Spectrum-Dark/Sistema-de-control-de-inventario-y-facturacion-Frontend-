import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useProductos } from "../../hooks/productos/useProductos";
import { useCategorias } from "../../hooks/categorias/useCategorias";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarProducto } from "../../services/productos/productosService";
import {
  FILTROS_INICIALES,
  filtrarProductos,
  hayFiltrosActivos,
} from "../../utils/productos/filtros";
import {
  puedeCrearProducto,
  puedeEditarProducto,
  puedeEliminarProducto,
} from "../../utils/productos/permisos";
import FiltrosProductos from "../../components/productos/FiltrosProductos";
import TablaProductos from "../../components/productos/TablaProductos";
import ModalProducto from "../../components/productos/ModalProducto";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Productos() {
  const { productos, cargando, error, recargar, actualizarEnLista } =
    useProductos();
  const { categorias } = useCategorias();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearProducto(usuario?.id_rol);
  const puedeEditar = puedeEditarProducto(usuario?.id_rol);
  const puedeEliminar = puedeEliminarProducto(usuario?.id_rol);

  // null = ventana cerrada; { producto: null } = nuevo; { producto } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const nombresCategorias = useMemo(
    () =>
      Object.fromEntries(
        categorias.map((c) => [c.id_categoria, c.nombre_categoria]),
      ),
    [categorias],
  );

  const filtrados = useMemo(
    () => filtrarProductos(productos, filtros, nombresCategorias),
    [productos, filtros, nombresCategorias],
  );
  const paginacion = usePaginacion(filtrados, 10);
  const hayFiltros = hayFiltrosActivos(filtros);

  const cambiarFiltro = (campo, valor) => {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
    paginacion.irAPagina(1);
  };

  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    paginacion.irAPagina(1);
  };

  const handleGuardado = (datos, esNuevo) => {
    if (esNuevo) {
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Si el backend rechaza (409), el error lo muestra la ventana de confirmación
  const confirmarEliminar = async () => {
    const respuesta = await eliminarProducto(eliminando.id_producto);
    sileo.success({
      title: "Producto eliminado",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Productos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Vehículos y productos · Repuestos del inventario.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={recargar}
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw size={16} className={cargando ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          {puedeCrear && (
            <button
              onClick={() => setModal({ producto: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nuevo producto</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          )}
        </div>
      </div>

      {cargando && productos.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando productos...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={recargar}
            className="mt-3 text-sm font-medium text-red-700 underline"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <FiltrosProductos
            filtros={filtros}
            categorias={categorias}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtrados.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ningún producto coincide con la búsqueda o los filtros."
                : "Aún no hay productos registrados."}
            </p>
          ) : (
            <>
              <TablaProductos
                productos={paginacion.visibles}
                nombresCategorias={nombresCategorias}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(producto) => setModal({ producto })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalProducto
          key={modal.producto?.id_producto ?? "nuevo"}
          producto={modal.producto}
          categorias={categorias}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_producto}
          titulo="Eliminar producto"
          mensaje={
            <>
              ¿Seguro que quieres eliminar el producto{" "}
              <strong>{eliminando.nombre_producto}</strong>? Esta acción no se
              puede deshacer.
            </>
          }
          onConfirmar={confirmarEliminar}
          onCerrar={() => setEliminando(null)}
        />
      )}
    </div>
  );
}
