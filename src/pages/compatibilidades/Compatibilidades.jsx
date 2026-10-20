import { useMemo, useState } from "react";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { sileo } from "sileo";
import { useCompatibilidades } from "../../hooks/compatibilidades/useCompatibilidades";
import { useProductos } from "../../hooks/productos/useProductos";
import { useModelos } from "../../hooks/modelos/useModelos";
import { useMarcas } from "../../hooks/marcas/useMarcas";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { eliminarCompatibilidad } from "../../services/compatibilidades/compatibilidadesService";
import {
  FILTROS_INICIALES,
  filtrarCompatibilidades,
  hayFiltrosActivos,
} from "../../utils/compatibilidades/filtros";
import {
  puedeCrearCompatibilidad,
  puedeEditarCompatibilidad,
  puedeEliminarCompatibilidad,
} from "../../utils/compatibilidades/permisos";
import FiltrosCompatibilidades from "../../components/compatibilidades/FiltrosCompatibilidades";
import TablaCompatibilidades from "../../components/compatibilidades/TablaCompatibilidades";
import ModalCompatibilidad from "../../components/compatibilidades/ModalCompatibilidad";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import Paginacion from "../../components/compartido/Paginacion";

export default function Compatibilidades() {
  const { compatibilidades, cargando, error, recargar, actualizarEnLista } =
    useCompatibilidades();
  const { productos } = useProductos();
  const { modelos } = useModelos();
  const { marcas } = useMarcas();
  const { usuario } = useAuth();

  const puedeCrear = puedeCrearCompatibilidad(usuario?.id_rol);
  const puedeEditar = puedeEditarCompatibilidad(usuario?.id_rol);
  const puedeEliminar = puedeEliminarCompatibilidad(usuario?.id_rol);

  // null = ventana cerrada; { compatibilidad: null } = nueva; { compatibilidad } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas],
  );

  // Cada compatibilidad se completa con su producto, su modelo y el nombre de la marca
  const filas = useMemo(() => {
    const productosPorId = Object.fromEntries(
      productos.map((p) => [p.id_producto, p]),
    );
    const modelosPorId = Object.fromEntries(
      modelos.map((m) => [m.id_modelo, m]),
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

  const filtradas = useMemo(
    () => filtrarCompatibilidades(filas, filtros),
    [filas, filtros],
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
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  const confirmarEliminar = async () => {
    const respuesta = await eliminarCompatibilidad(
      eliminando.id_compatibilidad,
    );
    sileo.success({
      title: "Compatibilidad eliminada",
      description: respuesta.message,
    });
    setEliminando(null);
    recargar();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Compatibilidades
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Vehículos y productos · Productos compatibles con cada modelo.
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
              onClick={() => setModal({ compatibilidad: null })}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nueva compatibilidad</span>
              <span className="sm:hidden">Nueva</span>
            </button>
          )}
        </div>
      </div>

      {cargando && compatibilidades.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando compatibilidades...
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
          <FiltrosCompatibilidades
            filtros={filtros}
            marcas={marcas}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtradas.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ninguna compatibilidad coincide con la búsqueda o el filtro."
                : "Aún no hay compatibilidades registradas."}
            </p>
          ) : (
            <>
              <TablaCompatibilidades
                filas={paginacion.visibles}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={(compatibilidad) => setModal({ compatibilidad })}
                onEliminar={setEliminando}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {modal && (
        <ModalCompatibilidad
          key={modal.compatibilidad?.id_compatibilidad ?? "nueva"}
          compatibilidad={modal.compatibilidad}
          productos={productos}
          modelos={modelos}
          nombresMarcas={nombresMarcas}
          onCerrar={() => setModal(null)}
          onGuardado={handleGuardado}
        />
      )}

      {eliminando && (
        <ModalConfirmacion
          key={eliminando.id_compatibilidad}
          titulo="Eliminar compatibilidad"
          mensaje={
            <>
              ¿Seguro que quieres eliminar la compatibilidad de{" "}
              <strong>
                {eliminando.producto?.nombre_producto ?? "este producto"}
              </strong>{" "}
              con{" "}
              <strong>
                {eliminando.modelo?.nombre_modelo ?? "este modelo"}
              </strong>
              ? Esta acción no se puede deshacer.
            </>
          }
          onConfirmar={confirmarEliminar}
          onCerrar={() => setEliminando(null)}
        />
      )}
    </div>
  );
}
