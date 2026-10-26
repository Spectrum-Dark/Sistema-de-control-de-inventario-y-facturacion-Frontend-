import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Componente principal de estructura y diseño 'LayoutPrincipal' que envuelve las rutas del sistema, controlando la barra de navegación lateral (Sidebar) y el botón flotante de apertura para dispositivos móviles.
export default function LayoutPrincipal() {
  // Estado local para controlar la apertura y cierre del menú lateral en pantallas móviles.
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Componente de la barra lateral (Sidebar) con control de visibilidad mediante props */}
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      {/* Contenedor principal que ajusta el espaciado izquierdo en pantallas grandes (lg en adelante) */}
      <div className="min-h-screen lg:pl-72">
        <main className="relative min-h-screen p-4 pt-4 sm:p-6 sm:pt-6 lg:pt-7">
          {/* Botón flotante móvil para abrir el menú lateral, con los tonos neutros de la aplicación. */}
          <button
            type="button"
            onClick={() => setMenuAbierto(true)}
            className="fixed right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md transition hover:bg-slate-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 lg:hidden"
            aria-label="Abrir menú lateral"
          >
            <Menu size={21} strokeWidth={2} />
          </button>

          {/* Renderizado dinámico de las subrutas hijas del sistema */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
