import { useMemo } from 'react';
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine } from 'lucide-react';
import { useMovimientos } from '../../hooks/inventario/useMovimientos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import {
  FILTROS_INICIALES,
  filtrarMovimientos,
} from '../../utils/inventario/filtros';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosMovimientos from '../../components/inventario/FiltrosMovimientos';
import TablaMovimientos from '../../components/inventario/TablaMovimientos';

/**
 * COMPONENTE: ResumenMovimientos
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave de los movimientos de inventario
 * (total de movimientos, entradas y salidas) mediante filtrados sobre el listado general.
 */
function ResumenMovimientos({ movimientos }) {
  const metricas = [
    {
      etiqueta: 'Movimientos registrados',
      valor: movimientos.length,
      Icono: ArrowLeftRight,
    },
    {
      etiqueta: 'Entradas',
      valor: movimientos.filter((m) => m.tipo_movimiento === 'Entrada').length,
      Icono: ArrowDownToLine,
    },
    {
      etiqueta: 'Salidas',
      valor: movimientos.filter((m) => m.tipo_movimiento === 'Salida').length,
      Icono: ArrowUpFromLine,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de movimientos de inventario"
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
 * COMPONENTE PRINCIPAL: MovimientosInventario
 * Explicación: Orquestador del módulo de movimientos de inventario, encargado de obtener los registros,
 * extraer dinámicamente los tipos disponibles y gestionar el estado general de filtros, paginación y visualización.
 */
export default function MovimientosInventario() {
  // Extracción del listado de movimientos y funciones de control mediante el hook personalizado.
  const { movimientos, cargando, error, recargar, actualizarEnLista } =
    useMovimientos();

  // Extracción optimizada y memorizada mediante useMemo de los tipos de movimiento únicos presentes en el listado.
  const tipos = useMemo(
    () =>
      [...new Set(movimientos.map((m) => m.tipo_movimiento))].filter(Boolean),
    [movimientos]
  );

  // Hook genérico de gestión CRUD adaptado para manejar los filtros, paginación y datos de los movimientos.
  const g = useGestionCrud({
    items: movimientos,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarMovimientos,
    recargar,
    actualizarEnLista,
    claveId: 'id_movimiento',
  });

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la vista principal del módulo de movimientos de inventario 
      (títulos, panel de resumen de métricas, sección de filtros, tabla de datos y paginación).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <ArrowLeftRight size={18} />
          </span>
          Movimientos de inventario
        </span>
      }
      subtitulo="Compras e inventario · Entradas, salidas y existencias."
      resumen={
        !cargando && !error ? (
          <ResumenMovimientos movimientos={movimientos} />
        ) : null
      }
      textoCarga="Cargando movimientos..."
      mensajeVacio="Aún no hay movimientos de inventario."
      mensajeSinResultados="Ningún movimiento coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={movimientos.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosMovimientos
          filtros={g.filtros}
          tipos={tipos}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={<TablaMovimientos movimientos={g.paginacion.visibles} />}
      paginacion={g.paginacion}
    />
  );
}
