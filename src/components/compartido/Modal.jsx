import { useEffect } from 'react';
import { X } from 'lucide-react';

// Componente contenedor Modal reutilizable con soporte para bloqueo de UI, cierre con tecla Escape, clic fuera del contenido y diseño adaptativo.
export default function Modal({
  titulo,
  onCerrar,
  bloqueado = false,
  ancho = 'max-w-md',
  children,
}) {
  // Efecto secundario que gestiona los escuchadores globales de eventos (tecla Escape) y el bloqueo del scroll del body.
  useEffect(() => {
    const alPresionar = (e) => {
      // Cierra el modal al presionar la tecla Escape siempre y cuando no esté bloqueado.
      if (e.key === 'Escape' && !bloqueado) onCerrar();
    };

    document.addEventListener('keydown', alPresionar);
    // Bloquea el desplazamiento (scroll) de la página principal mientras el modal esté abierto.
    document.body.style.overflow = 'hidden';

    // Función de limpieza (cleanup) que se ejecuta al desmontar el componente.
    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = '';
    };
  }, [bloqueado, onCerrar]);

  return (
    // Capa de fondo oscura (backdrop) fija que cubre toda la pantalla con desenfoque y centrado responsivo.
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-3 backdrop-blur-[2px] sm:items-center sm:p-5"
      onMouseDown={(e) => {
        // Permite cerrar el modal haciendo clic directamente en el fondo oscuro, si no se encuentra bloqueado.
        if (e.target === e.currentTarget && !bloqueado) onCerrar();
      }}
    >
      {/* Contenedor principal de la ventana modal con atributos de accesibilidad y ancho dinámico. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={`w-full ${ancho} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15`}
      >
        {/* Cabecera del modal que incluye el título dinámico y el botón de cierre. */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            {titulo}
          </h2>
          <button
            onClick={onCerrar}
            disabled={bloqueado}
            aria-label="Cerrar"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo o contenido interno del modal (children) con límite de altura y desplazamiento vertical independiente. */}
        <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
