import { CarFront, Check, CircleMinus, Tags } from 'lucide-react';
import { useMarcas } from '../../hooks/marcas/useMarcas';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import { eliminarMarca } from '../../services/marcas/marcasService';
import { FILTROS_INICIALES, filtrarMarcas } from '../../utils/marcas/filtros';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosMarcas from '../../components/marcas/FiltrosMarcas';
import TablaMarcas from '../../components/marcas/TablaMarcas';
import ModalMarca from '../../components/marcas/ModalMarca';

/**
 * COMPONENTE: ResumenMarcas
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave del módulo de marcas
 * (total de marcas registradas, activas e inactivas) mediante filtrados sobre el listado general.
 */
function ResumenMarcas({ marcas }) {
  const metricas = [
    { etiqueta: 'Marcas registradas', valor: marcas.length, Icono: Tags },
    {
      etiqueta: 'Activas',
      valor: marcas.filter((marca) => marca.estado === 'Activa').length,
      Icono: Check,
    },
    {
      etiqueta: 'Inactivas',
      valor: marcas.filter((marca) => marca.estado === 'Inactiva').length,
      Icono: CircleMinus,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de marcas"
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
 * COMPONENTE PRINCIPAL: Marcas
 * Explicación: Orquestador del módulo de marcas que se encarga de obtener la información mediante hooks,
 * administrar los permisos de usuario y gestionar todas las operaciones CRUD (crear, editar, filtrar, paginar y eliminar).
 */
export default function Marcas() {
  // Extracción del listado de marcas y funciones de control, junto con la verificación de permisos de usuario.
  const { marcas, cargando, error, recargar, actualizarEnLista } = useMarcas();
  const permisos = usePermisos();

  // Hook genérico de gestión CRUD adaptado para manejar el filtrado, paginación, modales y borrado seguro de marcas.
  const g = useGestionCrud({
    items: marcas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarMarcas,
    recargar,
    actualizarEnLista,
    claveId: 'id_marca',
    eliminar: eliminarMarca,
    tituloEliminado: 'Marca eliminada',
  });

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la interfaz de la página de administración de marcas 
      (títulos, panel de resumen, sección de filtros, tabla de datos y el flujo completo de diálogos de eliminación y modales).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <CarFront size={18} />
          </span>
          Marcas
        </span>
      }
      subtitulo="Administra las marcas relacionadas con los vehículos y repuestos."
      resumen={!cargando && !error ? <ResumenMarcas marcas={marcas} /> : null}
      textoNuevo="Nueva marca"
      textoCarga="Cargando marcas..."
      mensajeVacio="Aún no hay marcas registradas."
      mensajeSinResultados="Ninguna marca coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={marcas.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosMarcas
          filtros={g.filtros}
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
        <TablaMarcas
          marcas={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar marca"
      mensajeEliminar={(m) => (
        <>
          ¿Seguro que quieres eliminar la marca{' '}
          <strong>{m.nombre_marca}</strong>? Esta acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {/* Renderizado condicional del modal para crear o editar una marca */}
      {g.modal && (
        <ModalMarca
          key={g.modal.registro?.id_marca ?? 'nueva'}
          marca={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
