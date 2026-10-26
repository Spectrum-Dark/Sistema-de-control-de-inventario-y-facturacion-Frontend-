import { Truck, Check, CircleMinus, UsersRound } from 'lucide-react';
import { useProveedores } from '../../hooks/proveedores/useProveedores';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import { eliminarProveedor } from '../../services/proveedores/proveedoresService';
import {
  FILTROS_INICIALES,
  filtrarProveedores,
} from '../../utils/proveedores/filtros';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosProveedores from '../../components/proveedores/FiltrosProveedores';
import TablaProveedores from '../../components/proveedores/TablaProveedores';
import ModalProveedor from '../../components/proveedores/ModalProveedor';

/**
 * COMPONENTE: ResumenProveedores
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave del módulo de proveedores
 * (total de proveedores registrados, activos e inactivos) mediante filtrados sobre el listado general.
 */
function ResumenProveedores({ proveedores }) {
  const metricas = [
    {
      etiqueta: 'Proveedores registrados',
      valor: proveedores.length,
      Icono: UsersRound,
    },
    {
      etiqueta: 'Activos',
      valor: proveedores.filter((proveedor) => proveedor.estado === 'Activo')
        .length,
      Icono: Check,
    },
    {
      etiqueta: 'Inactivos',
      valor: proveedores.filter((proveedor) => proveedor.estado === 'Inactivo')
        .length,
      Icono: CircleMinus,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de proveedores"
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
 * COMPONENTE PRINCIPAL: Proveedores
 * Explicación: Orquestador del módulo de proveedores que se encarga de obtener la información mediante hooks,
 * administrar los permisos del usuario y gestionar todas las operaciones CRUD (crear, editar, filtrar, paginar y eliminar).
 */
export default function Proveedores() {
  // Extracción del listado de proveedores y funciones de control, junto con la verificación de permisos del usuario actual.
  const { proveedores, cargando, error, recargar, actualizarEnLista } =
    useProveedores();
  const permisos = usePermisos();

  // Hook genérico de gestión CRUD adaptado para manejar el filtrado, paginación, modales y borrado seguro de proveedores.
  const g = useGestionCrud({
    items: proveedores,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarProveedores,
    recargar,
    actualizarEnLista,
    claveId: 'id_proveedor',
    eliminar: eliminarProveedor,
    tituloEliminado: 'Proveedor eliminado',
  });

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la interfaz de la página de administración de proveedores 
      (títulos, panel de resumen, sección de filtros, tabla de datos y el flujo completo de diálogos de eliminación y modales).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Truck size={18} />
          </span>
          Proveedores
        </span>
      }
      subtitulo="Administra los contactos y datos de las empresas que abastecen tu inventario."
      resumen={
        !cargando && !error ? (
          <ResumenProveedores proveedores={proveedores} />
        ) : null
      }
      textoNuevo="Nuevo proveedor"
      textoCarga="Cargando proveedores..."
      mensajeVacio="Aún no hay proveedores registrados."
      mensajeSinResultados="Ningún proveedor coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={proveedores.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosProveedores
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
        <TablaProveedores
          proveedores={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar proveedor"
      mensajeEliminar={(p) => (
        <>
          ¿Seguro que quieres eliminar al proveedor{' '}
          <strong>{p.nombre_proveedor}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {/* Renderizado condicional del modal para crear o editar un proveedor */}
      {g.modal && (
        <ModalProveedor
          key={g.modal.registro?.id_proveedor ?? 'nuevo'}
          proveedor={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
