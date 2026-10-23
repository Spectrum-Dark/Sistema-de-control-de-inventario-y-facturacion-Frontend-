import { Loader2, Plus } from "lucide-react";
import Paginacion from "./Paginacion";
import ModalConfirmacion from "./ModalConfirmacion";

export default function PaginaCrud({
  titulo,
  subtitulo,
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
    <div className="space-y-5">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{titulo}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitulo}</p>
        </div>

        <div className="flex items-center gap-2">
          {puedeCrear && (
            <button
              onClick={() => onNuevo()}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">{textoNuevo}</span>
              {/* En móvil solo la primera palabra: "Nueva" o "Nuevo" */}
              <span className="sm:hidden">{textoNuevo.split(" ")[0]}</span>
            </button>
          )}
        </div>
      </div>

      {cargando && !hayDatos ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          {textoCarga}
        </div>
      ) : error ? (
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
        <>
          {filtros}

          {!hayResultados ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
              {hayFiltros ? mensajeSinResultados : mensajeVacio}
            </p>
          ) : (
            <>
              {tabla}
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {/* Aquí van las ventanas propias de cada módulo (crear/editar) */}
      {children}

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
