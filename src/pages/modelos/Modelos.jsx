import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useModelos } from "../../hooks/modelos/useModelos";
import { useMarcas } from "../../hooks/marcas/useMarcas";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarModelo } from "../../services/modelos/modelosService";
import {
  FILTROS_INICIALES,
  filtrarModelos,
  hayFiltrosActivos,
} from "../../utils/modelos/filtros";
import {
  puedeCrearModelo,
  puedeEditarModelo,
  puedeEliminarModelo,
} from "../../utils/modelos/permisos";
import FiltrosModelos from "../../components/modelos/FiltrosModelos";
import TablaModelos from "../../components/modelos/TablaModelos";
import ModalModelo from "../../components/modelos/ModalModelo";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Modelos() {
  const { modelos, cargando, error, recargar, actualizarEnLista } =
    useModelos();
  const { marcas } = useMarcas();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearModelo(usuario?.id_rol);
  const puedeEditar = puedeEditarModelo(usuario?.id_rol);
  const puedeEliminar = puedeEliminarModelo(usuario?.id_rol);

  // null = ventana cerrada; { modelo: null } = nuevo; { modelo } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  // { id_marca: "Toyota", ... } para mostrar el nombre de cada marca
  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas],
  );

  const filtrados = useMemo(
    () => filtrarModelos(modelos, filtros, nombresMarcas),
    [modelos, filtros, nombresMarcas],
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
    const respuesta = await eliminarModelo(eliminando.id_modelo);
    sileo.success({
      title: "Modelo eliminado",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Modelos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Vehículos y productos · Modelos de vehículos por marca.
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
              onClick={() => setModal({ modelo: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nuevo modelo</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          )}
        </div>
      </div>

      {cargando && modelos.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando modelos...
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
          <FiltrosModelos
            filtros={filtros}
            marcas={marcas}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtrados.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ningún modelo coincide con la búsqueda o los filtros."
                : "Aún no hay modelos registrados."}
            </p>
          ) : (
            <>
              <TablaModelos
                modelos={paginacion.visibles}
                nombresMarcas={nombresMarcas}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(modelo) => setModal({ modelo })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalModelo
          key={modal.modelo?.id_modelo ?? "nuevo"}
          modelo={modal.modelo}
          marcas={marcas}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_modelo}
          titulo="Eliminar modelo"
          mensaje={
            <>
              ¿Seguro que quieres eliminar el modelo{" "}
              <strong>{eliminando.nombre_modelo}</strong>? Esta acción no se
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
