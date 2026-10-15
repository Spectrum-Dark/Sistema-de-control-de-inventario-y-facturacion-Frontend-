import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Componente de control para la navegación paginada de usuarios.
 * Muestra el rango de registros visibles (ej. 1 - 10 de 25) y gestiona los botones
 * de cambio de página con validaciones de límites (inicio/fin).
 */
function PaginacionUsuarios({
  pagina,
  totalPaginas,
  totalRegistros,
  inicio,
  fin,
  onCambiarPagina,
}) {
  // Si no existen registros en la lista o en el filtro, se oculta el control de paginación
  if (totalRegistros === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Resumen del conteo de registros */}
      <p className="text-sm text-slate-500">
        Mostrando <span className="font-semibold text-slate-800">{inicio}</span>
        {" - "}
        <span className="font-semibold text-slate-800">{fin}</span>
        {" de "}
        <span className="font-semibold text-slate-800">{totalRegistros}</span>
        {" usuarios"}
      </p>

      {/* Botones de navegación y contador de página */}
      <div className="flex items-center gap-2">
        {/* Botón Página Anterior */}
        <button
          type="button"
          disabled={pagina <= 1}
          onClick={() => onCambiarPagina(pagina - 1)}
          aria-label="Página anterior"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {/* Indicador de página actual / total */}
        <span className="min-w-24 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
          Pág. {pagina} de {totalPaginas}
        </span>

        {/* Botón Página Siguiente */}
        <button
          type="button"
          disabled={pagina >= totalPaginas}
          onClick={() => onCambiarPagina(pagina + 1)}
          aria-label="Página siguiente"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default PaginacionUsuarios;
