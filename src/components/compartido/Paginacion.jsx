import { ChevronLeft, ChevronRight } from "lucide-react";

const claseBoton =
  "flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

export default function Paginacion({
  pagina,
  totalPaginas,
  total,
  desde,
  hasta,
  onCambiar,
}) {
  if (total === 0) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-slate-500">
        Mostrando {desde}–{hasta} de {total}
      </p>

      {totalPaginas > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onCambiar(pagina - 1)}
            disabled={pagina === 1}
            className={claseBoton}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <span className="px-2 text-sm text-slate-600">
            Página {pagina} de {totalPaginas}
          </span>

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
