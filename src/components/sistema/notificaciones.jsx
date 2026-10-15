import { useState } from "react";
import { Bell, X, BellOff } from "lucide-react";

/**
 * Componente Notificaciones.
 * Muestra un botón con icono de campana y un badge indicador del número de alertas.
 * Al hacer clic, despliega un panel flotante con la lista de notificaciones pendientes del sistema.
 */
function Notificaciones({ cantidad = 0 }) {
  // Estado para controlar la visibilidad del panel desplegable
  const [abierto, setAbierto] = useState(false);

  /**
   * Alterna la visibilidad del panel desplegable de notificaciones.
   */
  const alternarNotificaciones = () => {
    setAbierto((estadoActual) => !estadoActual);
  };

  /**
   * Cierra el panel desplegable de notificaciones.
   */
  const cerrarNotificaciones = () => {
    setAbierto(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón activador con icono de campana e indicador numérico */}
      <button
        type="button"
        onClick={alternarNotificaciones}
        aria-label={`Notificaciones${
          cantidad > 0 ? ` (${cantidad} nuevas)` : ""
        }`}
        aria-expanded={abierto}
        className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      >
        {/* Icono de Campana */}
        <Bell size={20} aria-hidden="true" />

        {/* Badge / Indicador de notificaciones pendientes */}
        {cantidad > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {cantidad > 99 ? "99+" : cantidad}
          </span>
        )}
      </button>

      {/* Overlay transparente para cerrar el panel al hacer clic fuera */}
      {abierto && (
        <div
          onClick={cerrarNotificaciones}
          className="fixed inset-0 z-40 bg-transparent"
          aria-hidden="true"
        />
      )}

      {/* Panel Desplegable (Dropdown) de Notificaciones */}
      {abierto && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:w-96 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Encabezado del Panel */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Notificaciones
              </h2>
              {cantidad > 0 && (
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 ring-1 ring-blue-100">
                  {cantidad} nuevas
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={cerrarNotificaciones}
              aria-label="Cerrar panel de notificaciones"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Cuerpo del Panel / Lista de Notificaciones */}
          <div className="max-h-80 overflow-y-auto p-4 scrollbar-thin">
            {cantidad > 0 ? (
              <div className="space-y-3">
                {/* Mensaje informativo estático (Listo para integrar el .map() con Laravel) */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">
                    Notificaciones del Sistema
                  </p>
                  <p className="mt-1 text-slate-500">
                    Tienes {cantidad} alerta(s) pendiente(s) de revisión en la
                    plataforma.
                  </p>
                </div>
              </div>
            ) : (
              /* Estado vacío cuando no hay notificaciones */
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                  <BellOff size={22} aria-hidden="true" />
                </div>
                <p className="text-xs font-medium text-slate-500">
                  No tienes notificaciones pendientes
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notificaciones;
