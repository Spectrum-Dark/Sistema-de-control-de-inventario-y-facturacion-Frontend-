import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useMarcas } from "../../hooks/marcas/useMarcas";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarMarca } from "../../services/marcas/marcasService";
import {
  FILTROS_INICIALES,
  filtrarMarcas,
  hayFiltrosActivos,
} from "../../utils/marcas/filtros";
import {
  puedeCrearMarca,
  puedeEditarMarca,
  puedeEliminarMarca,
} from "../../utils/marcas/permisos";
import FiltrosMarcas from "../../components/marcas/FiltrosMarcas";
import TablaMarcas from "../../components/marcas/TablaMarcas";
import ModalMarca from "../../components/marcas/ModalMarca";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Marcas() {
  const { marcas, cargando, error, recargar, actualizarEnLista } = useMarcas();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearMarca(usuario?.id_rol);
  const puedeEditar = puedeEditarMarca(usuario?.id_rol);
  const puedeEliminar = puedeEliminarMarca(usuario?.id_rol);

  // null = ventana cerrada; { marca: null } = nueva; { marca } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const filtradas = useMemo(
    () => filtrarMarcas(marcas, filtros),
    [marcas, filtros],
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
      // Se vuelve a pedir la lista para traer la marca con todos sus datos
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Si el backend rechaza (409), el error lo muestra la propia ventana de confirmación
  const confirmarEliminar = async () => {
    const respuesta = await eliminarMarca(eliminando.id_marca);
    sileo.success({
      title: "Marca eliminada",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Marcas</h1>
          <p className="mt-1 text-sm text-slate-500">Marcas de vehículos.</p>
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
              onClick={() => setModal({ marca: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nueva marca</span>
              <span className="sm:hidden">Nueva</span>
            </button>
          )}
        </div>
      </div>

      {cargando && marcas.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando marcas...
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
          <FiltrosMarcas
            filtros={filtros}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtradas.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ninguna marca coincide con la búsqueda o el filtro."
                : "Aún no hay marcas registradas."}
            </p>
          ) : (
            <>
              <TablaMarcas
                marcas={paginacion.visibles}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(marca) => setModal({ marca })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalMarca
          key={modal.marca?.id_marca ?? "nueva"}
          marca={modal.marca}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_marca}
          titulo="Eliminar marca"
          mensaje={
            <>
              ¿Seguro que quieres eliminar la marca{" "}
              <strong>{eliminando.nombre_marca}</strong>? Esta acción no se
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
