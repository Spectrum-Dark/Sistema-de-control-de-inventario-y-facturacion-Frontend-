import { Loader2, Plus, RefreshCw } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{titulo}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitulo}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={recargar}
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw size={16} className={cargando ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          {puedeCrear && (
            <button
              onClick={() => onNuevo()}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
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
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
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
