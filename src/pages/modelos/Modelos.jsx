import { useMemo } from 'react';
import { CarFront, Check, CircleMinus, Car } from 'lucide-react';
import { useModelos } from '../../hooks/modelos/useModelos';
import { useMarcas } from '../../hooks/marcas/useMarcas';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import { eliminarModelo } from '../../services/modelos/modelosService';
import { FILTROS_INICIALES, filtrarModelos } from '../../utils/modelos/filtros';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosModelos from '../../components/modelos/FiltrosModelos';
import TablaModelos from '../../components/modelos/TablaModelos';
import ModalModelo from '../../components/modelos/ModalModelo';

/**
 * COMPONENTE: ResumenModelos
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave del módulo de modelos de vehículos
 * (total de modelos, activos e inactivos) mediante filtrados sobre el listado general.
 */
function ResumenModelos({ modelos }) {
  const metricas = [
    { etiqueta: 'Modelos registrados', valor: modelos.length, Icono: Car },
    {
      etiqueta: 'Activos',
      valor: modelos.filter((modelo) => modelo.estado === 'Activo').length,
      Icono: Check,
    },
    {
      etiqueta: 'Inactivos',
      valor: modelos.filter((modelo) => modelo.estado === 'Inactivo').length,
      Icono: CircleMinus,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de modelos"
    >
      {metricas.map(({ etiqueta, valor, Icono }) => (
        <article
          key={etiqueta}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Icono size={18} />
          </span>
          <span>
            <span className="block text-[11px] font-medium text-slate-500">
              {etiqueta}
            </span>
            <span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">
              {valor}
            </span>
          </span>
        </article>
      ))}
    </section>
  );
}

/**
 * COMPONENTE PRINCIPAL: Modelos
 * Explicación: Orquestador del módulo de modelos que obtiene los catálogos mediante hooks, mapea los nombres de marcas
 * para su búsqueda y visualización, y administra el flujo completo de operaciones CRUD y permisos.
 */
export default function Modelos() {
  // Extracción del listado de modelos, marcas y verificación de los permisos del usuario actual.
  const { modelos, cargando, error, recargar, actualizarEnLista } =
    useModelos();
  const { marcas } = useMarcas();
  const permisos = usePermisos();

  // Mapeo optimizado mediante useMemo para asociar cada ID de marca con su respectivo nombre comercial.
  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas]
  );

  // Hook genérico de gestión CRUD adaptado para manejar el filtrado personalizado por nombres de marcas, paginación y borrado.
  const g = useGestionCrud({
    items: modelos,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: (lista, filtros) => filtrarModelos(lista, filtros, nombresMarcas),
    recargar,
    actualizarEnLista,
    claveId: 'id_modelo',
    eliminar: eliminarModelo,
    tituloEliminado: 'Modelo eliminado',
  });

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la interfaz de la página de administración de modelos 
      (títulos, panel de resumen, sección de filtros avanzados, tabla de datos y diálogos de eliminación y modales).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <CarFront size={18} />
          </span>
          Modelos
        </span>
      }
      subtitulo="Organiza los modelos de vehículo y sus años de fabricación por marca."
      resumen={
        !cargando && !error ? <ResumenModelos modelos={modelos} /> : null
      }
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
      nuevoEnFiltros
      filtros={
        <FiltrosModelos
          filtros={g.filtros}
          marcas={marcas}
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
          ¿Seguro que quieres eliminar el modelo{' '}
          <strong>{m.nombre_modelo}</strong>? Esta acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {/* Renderizado condicional del modal para crear o editar un modelo de vehículo */}
      {g.modal && (
        <ModalModelo
          key={g.modal.registro?.id_modelo ?? 'nuevo'}
          modelo={g.modal.registro}
          marcas={marcas}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
