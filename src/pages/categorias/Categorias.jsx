// Importación de iconos vectoriales de la librería lucide-react para la interfaz visual
import { Tags, Check, CircleMinus, Layers3 } from 'lucide-react';
// Importación de hooks personalizados para la gestión de datos, permisos de usuario y lógica CRUD genérica
import { useCategorias } from '../../hooks/categorias/useCategorias';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
// Importación del servicio de red encargado de ejecutar la eliminación de categorías en la API o base de datos
import { eliminarCategoria } from '../../services/categorias/categoriasService';
// Importación de constantes iniciales y funciones de filtrado específicas para el módulo de categorías
import {
  FILTROS_INICIALES,
  filtrarCategorias,
} from '../../utils/categorias/filtros';
// Importación del componente de plantilla reutilizable para páginas CRUD y componentes visuales específicos del módulo
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosCategorias from '../../components/categorias/FiltrosCategorias';
import TablaCategorias from '../../components/categorias/TablaCategorias';
import ModalCategoria from '../../components/categorias/ModalCategoria';

// Componente interno para renderizar las tarjetas métricas de resumen (KPIs) del estado de las categorías
function ResumenCategorias({ categorias }) {
  // Cálculo derivado: filtra y cuenta las categorías que se encuentran activas e inactivas
  const activas = categorias.filter(
    (categoria) => categoria.estado === 'Activa'
  ).length;
  const inactivas = categorias.filter(
    (categoria) => categoria.estado === 'Inactiva'
  ).length;
  // Arreglo estructural que define las métricas a mostrar en la interfaz
  const metricas = [
    {
      etiqueta: 'Categorías registradas',
      valor: categorias.length,
      icono: Tags,
    },
    { etiqueta: 'Activas', valor: activas, icono: Check },
    { etiqueta: 'Inactivas', valor: inactivas, icono: CircleMinus },
  ];

  return (
    // Contenedor responsivo en retícula (grid) para organizar las tarjetas de métricas
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de categorías"
    >
      {metricas.map(({ etiqueta, valor, icono: Icono }) => (
        <article
          key={etiqueta}
          className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:bg-slate-100">
            <Icono size={18} strokeWidth={1.8} />
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

// Componente principal de la vista de gestión de categorías
export default function Categorias() {
  // Extracción del estado y funciones de sincronización del hook de categorías
  const { categorias, cargando, error, recargar, actualizarEnLista } =
    useCategorias();
  // Obtención de los permisos de control de acceso del usuario actual
  const permisos = usePermisos();

  // Inicialización del hook genérico para encapsular toda la lógica de control CRUD (filtros, paginación, modales, eliminación)
  const g = useGestionCrud({
    items: categorias,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCategorias,
    recargar,
    actualizarEnLista,
    claveId: 'id_categoria',
    eliminar: eliminarCategoria,
    tituloEliminado: 'Categoría eliminada',
  });

  return (
    // Componente contenedor que estandariza la estructura visual de las páginas con operaciones CRUD
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Layers3 size={18} />
          </span>
          Categorías
        </span>
      }
      subtitulo="Organiza los repuestos en grupos fáciles de encontrar y administrar."
      resumen={
        !cargando && !error ? (
          <ResumenCategorias categorias={categorias} />
        ) : null
      }
      textoNuevo="Nueva categoría"
      textoCarga="Cargando categorías..."
      mensajeVacio="Aún no hay categorías registradas."
      mensajeSinResultados="Ninguna categoría coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={categorias.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosCategorias
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
        <TablaCategorias
          categorias={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar categoría"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar la categoría{' '}
          <strong>{c.nombre_categoria}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {/* Renderizado condicional del modal para crear o editar registros, asegurando un remontaje limpio mediante la clave (key) */}
      {g.modal && (
        <ModalCategoria
          key={g.modal.registro?.id_categoria ?? 'nueva'}
          categoria={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
