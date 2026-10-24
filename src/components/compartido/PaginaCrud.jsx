import { Loader2, Plus } from 'lucide-react';
import Paginacion from './Paginacion';
import ModalConfirmacion from './ModalConfirmacion';

// Componente plantilla genérico 'PaginaCrud' que centraliza la estructura estándar de una vista de gestión CRUD (título, filtros, tabla, paginación, estados de carga, errores y modal de eliminación).
export default function PaginaCrud({
  titulo,
  acento = 'neutro',
  subtitulo,
  resumen,
  textoNuevo,
  textoCarga,
  mensajeVacio,
  mensajeSinResultados,
  cargando,
  error,
  recargar,
  hayDatos,
  puedeCrear,
  onNuevo,
  nuevoEnFiltros = false,
  filtros,
  hayFiltros,
  hayResultados,
  tabla,
  paginacion,
  eliminando,
  tituloEliminar,
  mensajeEliminar,
  onConfirmarEliminar,
  onCancelarEliminar,
  children,
}) {
  return (
    // Contenedor principal con clase y atributo de acento personalizado para la página CRUD.
    <div className="pagina-crud space-y-5" data-acento={acento}>
      {/* Cabecera de la página que agrupa el título principal, subtítulo y el botón de creación principal (si procede) */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {titulo}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{subtitulo}</p>
        </div>

        {/* Botón de creación condicional (se oculta si el botón se maneja dentro de la barra de filtros o si no hay permisos) */}
        <div className="flex items-center gap-2">
          {puedeCrear && !nuevoEnFiltros && (
            <button
              onClick={() => onNuevo()}
              className="flex min-h-10 items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              <Plus size={16} />
              {/* Texto completo visible en pantallas medianas y grandes */}
              <span className="hidden sm:inline">{textoNuevo}</span>
              {/* En dispositivos móviles muestra únicamente la primera palabra (ej.: "Nuevo" o "Nueva") */}
              <span className="sm:hidden">{textoNuevo.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Componente opcional de resumen o métricas generales */}
      {resumen}

      {/* Renderizado condicional basado en el estado de la red/datos (Cargando, Error o Contenido Principal) */}
      {cargando && !hayDatos ? (
        // Estado de carga inicial con spinner animado
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          {textoCarga}
        </div>
      ) : error ? (
        // Estado de error con opción para reintentar la petición
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
        // Contenido principal: muestra filtros y tabla o mensajes si no hay registros/resultados
        <>
          {filtros}

          {!hayResultados ? (
            // Mensaje cuando la búsqueda o filtros no arrojan resultados, o cuando el listado general está vacío
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
              {hayFiltros ? mensajeSinResultados : mensajeVacio}
            </p>
          ) : (
            // Renderiza la tabla de datos y los controles de paginación
            <>
              {tabla}
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {/* Espacio reservado para inyectar las ventanas modales de creación o edición propias de cada módulo */}
      {children}

      {/* Modal de confirmación para eliminar registros, renderizado de forma condicional cuando existe un elemento seleccionado (eliminando) */}
      {eliminando && (
        <ModalConfirmacion
          titulo={tituloEliminar}
          mensaje={mensajeEliminar(eliminando)}
          onConfirmar={onConfirmarEliminar}
          onCerrar={onCancelarEliminar}
        />
      )}
    </div>
  );
}
