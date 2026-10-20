import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useCategorias } from "../../hooks/categorias/useCategorias";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarCategoria } from "../../services/categorias/categoriasService";
import {
  FILTROS_INICIALES,
  filtrarCategorias,
  hayFiltrosActivos,
} from "../../utils/categorias/filtros";
import {
  puedeCrearCategoria,
  puedeEditarCategoria,
  puedeEliminarCategoria,
} from "../../utils/categorias/permisos";
import FiltrosCategorias from "../../components/categorias/FiltrosCategorias";
import TablaCategorias from "../../components/categorias/TablaCategorias";
import ModalCategoria from "../../components/categorias/ModalCategoria";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Categorias() {
  const { categorias, cargando, error, recargar, actualizarEnLista } =
    useCategorias();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearCategoria(usuario?.id_rol);
  const puedeEditar = puedeEditarCategoria(usuario?.id_rol);
  const puedeEliminar = puedeEliminarCategoria(usuario?.id_rol);

  // null = ventana cerrada; { categoria: null } = nueva; { categoria } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const filtradas = useMemo(
    () => filtrarCategorias(categorias, filtros),
    [categorias, filtros],
  );
  const paginacion = usePaginacion(filtradas, 10);
  const hayFiltros = hayFiltrosActivos(filtros);

  const cambiarFiltro = (campo, valor) => {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
    paginacion.irAPagina(1);
  };

  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    paginacion.irAPagina(1);
  };

  const handleGuardado = (datos, esNueva) => {
    if (esNueva) {
      // Se vuelve a pedir la lista para traer la categoría con todos sus datos
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Si el backend rechaza (409), el error lo muestra la propia ventana de confirmación
  const confirmarEliminar = async () => {
    const respuesta = await eliminarCategoria(eliminando.id_categoria);
    sileo.success({
      title: "Categoría eliminada",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Categorías</h1>
          <p className="mt-1 text-sm text-slate-500">
            Categorías de los repuestos.
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
              onClick={() => setModal({ categoria: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nueva categoría</span>
              <span className="sm:hidden">Nueva</span>
            </button>
          )}
        </div>
      </div>

      {cargando && categorias.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando categorías...
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
          <FiltrosCategorias
            filtros={filtros}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtradas.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ninguna categoría coincide con la búsqueda o el filtro."
                : "Aún no hay categorías registradas."}
            </p>
          ) : (
            <>
              <TablaCategorias
                categorias={paginacion.visibles}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(categoria) => setModal({ categoria })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalCategoria
          key={modal.categoria?.id_categoria ?? "nueva"}
          categoria={modal.categoria}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_categoria}
          titulo="Eliminar categoría"
          mensaje={
            <>
              ¿Seguro que quieres eliminar la categoría{" "}
              <strong>{eliminando.nombre_categoria}</strong>? Esta acción no se
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
