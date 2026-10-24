import { ChevronLeft, ChevronRight } from 'lucide-react';

// Constante que define las clases CSS reutilizables para los botones de navegación de la paginación (con soporte para estados desactivados y hover).
const claseBoton =
  'flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50';

// Componente reutilizable de Paginación que muestra el recuento de registros actuales y los controles de página anterior/siguiente.
export default function Paginacion({
  pagina,
  totalPaginas,
  total,
  desde,
  hasta,
  onCambiar,
}) {
  // Si no hay registros (total es 0), el componente no se renderiza (retorna null).
  if (total === 0) return null;

  return (
    // Contenedor principal con diseño responsivo (en columna para móviles y en fila para pantallas medianas/grandes).
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row">
      {/* Texto informativo que indica el rango de elementos mostrados actualmente respecto al total */}
      <p className="text-sm text-slate-500">
        Mostrando {desde}–{hasta} de {total}
      </p>

      {/* Renderizado condicional: los controles de botones de página solo se muestran si hay más de una página en total */}
      {totalPaginas > 1 && (
        <div className="flex items-center gap-2">
          {/* Botón para retroceder a la página anterior, deshabilitado si se encuentra en la primera página */}
          <button
            onClick={() => onCambiar(pagina - 1)}
            disabled={pagina === 1}
            className={claseBoton}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          {/* Texto que muestra la página actual y el número total de páginas disponibles */}
          <span className="px-2 text-sm text-slate-600">
            Página {pagina} de {totalPaginas}
          </span>

          {/* Botón para avanzar a la página siguiente, deshabilitado si se encuentra en la última página */}
          <button
            onClick={() => onCambiar(pagina + 1)}
            disabled={pagina === totalPaginas}
            className={claseBoton}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
