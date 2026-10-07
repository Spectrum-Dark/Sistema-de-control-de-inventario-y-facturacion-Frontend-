import { useState } from "react";

function Notificaciones({ cantidad = 0 }) {
  /* ========================================================================== */
  /* LÓGICA Y ESTADOS                                                           */
  /* ========================================================================== */

  // Estado para controlar la visibilidad del panel desplegable de notificaciones
  const [abierto, setAbierto] = useState(false);

  // Estado borrador para la lista de notificaciones (Listo para conectar con Laravel via Axios/Fetch)
  // Ejemplo de estructura esperada de la API: [{ id: 1, titulo: '...', mensaje: '...', fecha: '...' }]
  //const [listaNotificaciones, setListaNotificaciones] = useState([]);

  /**
   * Alterna la visibilidad del desplegable de notificaciones
   */
  const alternarNotificaciones = () => {
    setAbierto((estadoActual) => !estadoActual);
  };

  /**
   * Cierra el desplegable de notificaciones
   */
  const cerrarNotificaciones = () => {
    setAbierto(false);
  };

  /* 
    PUNTO DE CONEXIÓN FUTURO CON LARAVEL:
    Aquí puedes agregar tu useEffect para obtener notificaciones desde la API:
    
    useEffect(() => {
      fetch('/api/notificaciones')
        .then(res => res.json())
        .then(data => setListaNotificaciones(data));
    }, []);
  */

  /* ========================================================================== */
  /* DISEÑO E INTERFAZ DE USUARIO (UI)                                          */
  /* ========================================================================== */

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
        className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      >
        {/* Icono de Campana */}
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>

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
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg sm:w-96">
          {/* Encabezado del Panel */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Notificaciones
              </h2>
              {cantidad > 0 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {cantidad} nuevas
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={cerrarNotificaciones}
              aria-label="Cerrar panel de notificaciones"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cuerpo del Panel / Lista de Notificaciones */}
          <div className="max-h-80 overflow-y-auto p-4 [scrollbar-color:#cbd5e1_transparent] scrollbar-thin">
            {cantidad > 0 ? (
              <div className="space-y-3">
                {/* Mensaje informativo estático (Sustituir por el .map() de Laravel) */}
                <div className="rounded-md border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
                  <p className="font-medium text-slate-900">
                    Notificaciones del Sistema
                  </p>
                  <p className="mt-1 text-slate-500">
                    Tienes {cantidad} alerta(s) pendiente(s) de revisión.
                  </p>
                </div>
              </div>
            ) : (
              /* Estado vacío cuando no hay notificaciones */
              <div className="py-6 text-center">
                <svg
                  className="mx-auto h-8 w-8 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <p className="mt-2 text-xs font-medium text-slate-500">
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
