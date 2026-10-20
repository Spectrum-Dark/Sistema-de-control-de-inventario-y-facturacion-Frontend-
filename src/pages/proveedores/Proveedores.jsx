import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useProveedores } from "../../hooks/proveedores/useProveedores";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarProveedor } from "../../services/proveedores/proveedoresService";
import {
  FILTROS_INICIALES,
  filtrarProveedores,
  hayFiltrosActivos,
} from "../../utils/proveedores/filtros";
import {
  puedeCrearProveedor,
  puedeEditarProveedor,
  puedeEliminarProveedor,
} from "../../utils/proveedores/permisos";
import FiltrosProveedores from "../../components/proveedores/FiltrosProveedores";
import TablaProveedores from "../../components/proveedores/TablaProveedores";
import ModalProveedor from "../../components/proveedores/ModalProveedor";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Proveedores() {
  const { proveedores, cargando, error, recargar, actualizarEnLista } =
    useProveedores();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearProveedor(usuario?.id_rol);
  const puedeEditar = puedeEditarProveedor(usuario?.id_rol);
  const puedeEliminar = puedeEliminarProveedor(usuario?.id_rol);

  // null = ventana cerrada; { proveedor: null } = nuevo; { proveedor } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const filtrados = useMemo(
    () => filtrarProveedores(proveedores, filtros),
    [proveedores, filtros],
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
      // Se vuelve a pedir la lista para traer el proveedor con todos sus datos
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Si el backend rechaza, el error lo muestra la propia ventana de confirmación
  const confirmarEliminar = async () => {
    const respuesta = await eliminarProveedor(eliminando.id_proveedor);
    sileo.success({
      title: "Proveedor eliminado",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Proveedores</h1>
          <p className="mt-1 text-sm text-slate-500">
            Catálogos · Registro de proveedores.
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
              onClick={() => setModal({ proveedor: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nuevo proveedor</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          )}
        </div>
      </div>

      {cargando && proveedores.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando proveedores...
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
          <FiltrosProveedores
            filtros={filtros}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtrados.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ningún proveedor coincide con la búsqueda o el filtro."
                : "Aún no hay proveedores registrados."}
            </p>
          ) : (
            <>
              <TablaProveedores
                proveedores={paginacion.visibles}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(proveedor) => setModal({ proveedor })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalProveedor
          key={modal.proveedor?.id_proveedor ?? "nuevo"}
          proveedor={modal.proveedor}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_proveedor}
          titulo="Eliminar proveedor"
          mensaje={
            <>
              ¿Seguro que quieres eliminar al proveedor{" "}
              <strong>{eliminando.nombre_proveedor}</strong>? Esta acción no se
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
