// Importación del hook useMemo de React para la memorización y optimización de cálculos costosos
import { useMemo } from 'react';
// Importación de iconos vectoriales de la librería lucide-react para la interfaz visual
import { Link2, Package, CarFront } from 'lucide-react';
// Importación de hooks personalizados para la gestión de datos (compatibilidades, productos, modelos, marcas) y permisos
import { useCompatibilidades } from '../../hooks/compatibilidades/useCompatibilidades';
import { useProductos } from '../../hooks/productos/useProductos';
import { useModelos } from '../../hooks/modelos/useModelos';
import { useMarcas } from '../../hooks/marcas/useMarcas';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
// Importación del servicio de red encargado de ejecutar la eliminación de registros de compatibilidad
import { eliminarCompatibilidad } from '../../services/compatibilidades/compatibilidadesService';
// Importación de constantes iniciales y funciones de filtrado específicas para el módulo de compatibilidades
import {
  FILTROS_INICIALES,
  filtrarCompatibilidades,
} from '../../utils/compatibilidades/filtros';
// Importación del componente de plantilla reutilizable para páginas CRUD y componentes visuales del módulo
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosCompatibilidades from '../../components/compatibilidades/FiltrosCompatibilidades';
import TablaCompatibilidades from '../../components/compatibilidades/TablaCompatibilidades';
import ModalCompatibilidad from '../../components/compatibilidades/ModalCompatibilidad';

// Componente interno para renderizar las tarjetas métricas de resumen (KPIs) de las relaciones de compatibilidad
function ResumenCompatibilidades({ filas }) {
  // Cálculo derivado: cuenta la cantidad de productos y modelos únicos vinculados mediante la estructura Set
  const productosVinculados = new Set(filas.map((fila) => fila.id_producto))
    .size;
  const modelosVinculados = new Set(filas.map((fila) => fila.id_modelo)).size;
  // Arreglo estructural de las métricas que se mostrarán en la interfaz
  const metricas = [
    { etiqueta: 'Compatibilidades', valor: filas.length, Icono: Link2 },
    {
      etiqueta: 'Productos vinculados',
      valor: productosVinculados,
      Icono: Package,
    },
    {
      etiqueta: 'Modelos vinculados',
      valor: modelosVinculados,
      Icono: CarFront,
    },
  ];
  // Renderizado responsivo en retícula (grid) iterando sobre las métricas
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de compatibilidades"
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

// Componente principal de la vista de gestión de compatibilidades
export default function Compatibilidades() {
  // Extracción de estados de múltiples hooks para cruzar información relacionada
  const { compatibilidades, cargando, error, recargar, actualizarEnLista } =
    useCompatibilidades();
  const { productos } = useProductos();
  const { modelos } = useModelos();
  const { marcas } = useMarcas();
  const permisos = usePermisos();

  // Memorización de un mapa (diccionario) para asociar el ID de la marca con su nombre de forma eficiente ($O(1)$)
  const nombresMarcas = useMemo(
    () => Object.fromEntries(marcas.map((m) => [m.id_marca, m.nombre_marca])),
    [marcas]
  );

  // Cada compatibilidad se completa de forma enriquecida con su producto, su modelo y el nombre de su respectiva marca
  const filas = useMemo(() => {
    // Creación de diccionarios por ID para optimizar la búsqueda de relaciones cruzadas sin necesidad de recorridos anidados ($O(n)$)
    const productosPorId = Object.fromEntries(
      productos.map((p) => [p.id_producto, p])
    );
    const modelosPorId = Object.fromEntries(
      modelos.map((m) => [m.id_modelo, m])
    );

    // Mapeo y enriquecimiento de cada registro de compatibilidad con sus entidades relacionadas
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

  // Inicialización del hook genérico para encapsular toda la lógica de control CRUD (filtros, paginación, modales, eliminación)
  const g = useGestionCrud({
    items: filas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCompatibilidades,
    recargar,
    actualizarEnLista,
    claveId: 'id_compatibilidad',
    eliminar: eliminarCompatibilidad,
    tituloEliminado: 'Compatibilidad eliminada',
  });

  return (
    // Componente contenedor que estandariza la estructura visual de las páginas con operaciones CRUD
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Link2 size={18} />
          </span>
          Compatibilidades
        </span>
      }
      subtitulo="Relaciona repuestos con los modelos de vehículo para consultar su compatibilidad."
      resumen={
        !cargando && !error ? <ResumenCompatibilidades filas={filas} /> : null
      }
      textoNuevo="Nueva compatibilidad"
      textoCarga="Cargando compatibilidades..."
      mensajeVacio="Aún no hay compatibilidades registradas."
      mensajeSinResultados="Ninguna compatibilidad coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={compatibilidades.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosCompatibilidades
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
        <TablaCompatibilidades
          filas={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar compatibilidad"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar la compatibilidad de{' '}
          <strong>{c.producto?.nombre_producto ?? 'este producto'}</strong> con{' '}
          <strong>{c.modelo?.nombre_modelo ?? 'este modelo'}</strong>? Esta
          acción no se puede deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {/* Renderizado condicional del modal para crear o editar registros, asegurando un remontaje limpio mediante la clave (key) */}
      {g.modal && (
        <ModalCompatibilidad
          key={g.modal.registro?.id_compatibilidad ?? 'nueva'}
          compatibilidad={g.modal.registro}
          productos={productos}
          modelos={modelos}
          nombresMarcas={nombresMarcas}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
