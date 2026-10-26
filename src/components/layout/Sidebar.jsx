import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut,
  Moon,
  Package,
  Sun,
  UserRound,
  X,
  Loader2,
} from 'lucide-react';
import { sileo } from 'sileo';
import { menuPrincipal, filtrarMenuPorRol } from '../../utils/layout/menu';
import { useAuth } from '../../hooks/sesion/useAuth';
import { ID_ROL, ROLES } from '../../utils/sesion/roles';
import { solicitarCierreSesion } from '../../services/sesion/sesionService';
import ItemMenu from './ItemMenu';
import GrupoMenu from './GrupoMenu';

const CLAVE_TEMA = 'tema_interfaz';

// Componente principal de la barra de navegación lateral (Sidebar) que gestiona la navegación por roles, el cambio de tema de interfaz y el cierre de sesión del usuario.
export default function Sidebar({ abierto, onCerrar }) {
  const { usuario, cerrarSesion } = useAuth();
  const [cerrando, setCerrando] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(
    () => localStorage.getItem(CLAVE_TEMA) === 'oscuro'
  );

  // Filtra las opciones del menú principal según el ID de rol del usuario autenticado.
  const opcionesVisibles = filtrarMenuPorRol(menuPrincipal, usuario?.id_rol);

  // Efecto secundario que sincroniza el tema visual seleccionado con el DOM y lo almacena en el localStorage.
  useEffect(() => {
    document.documentElement.dataset.tema = temaOscuro ? 'oscuro' : 'claro';
    localStorage.setItem(CLAVE_TEMA, temaOscuro ? 'oscuro' : 'claro');
  }, [temaOscuro]);

  // Manejador asíncrono para procesar el cierre de sesión del usuario en el sistema.
  const handleCerrarSesion = async () => {
    setCerrando(true);
    try {
      await solicitarCierreSesion();
      sileo.success({ title: 'Sesión cerrada' });
    } catch (error) {
      if (error.estado === 401) sileo.success({ title: 'Sesión cerrada' });
      else
        sileo.warning({
          title: 'Sesión cerrada solo en este equipo',
          description: error.message,
        });
    } finally {
      cerrarSesion();
    }
  };

  return (
    <>
      {/* Fondo oscuro translúcido para dispositivos móviles cuando el menú lateral está abierto */}
      {abierto && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          onClick={onCerrar}
          aria-label="Cerrar menú"
        />
      )}

      {/* Barra lateral principal con transiciones y diseño responsivo */}
      <aside
        className={`app-sidebar fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#0F172B] transition-transform duration-200 lg:translate-x-0 ${abierto ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Cabecera del sidebar: logotipo, título del sistema y botón de cierre móvil */}
        <div className="flex h-19 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm">
              <Package size={20} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight text-white">
                Repuestos
              </span>
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[.12em] text-slate-400">
                Gestión comercial
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg p-2 text-white/55 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={19} />
          </button>
        </div>

        {/* Sección de navegación principal que mapea dinámicamente los menús y submenús permitidos */}
        <div className="px-5 pb-2 pt-6 text-[10px] font-bold uppercase tracking-[.15em] text-white/40">
          Menú principal
        </div>
        <nav className="sidebar-scroll min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {opcionesVisibles.map((item) =>
            item.hijos ? (
              <GrupoMenu key={item.nombre} {...item} onNavegar={onCerrar} />
            ) : (
              <ItemMenu key={item.ruta} {...item} onNavegar={onCerrar} />
            )
          )}
        </nav>

        {/* Pie del sidebar: información del usuario autenticado, selector de tema y botón de cierre de sesión */}
        <div className="flex min-h-16.5 shrink-0 items-center gap-2 border-t border-white/10 px-3 py-2.5">
          {usuario && (
            <>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white">
                {usuario.nombre_completo.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-slate-100">
                  {usuario.nombre_completo}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-white/50">
                  {ROLES[usuario.id_rol]}
                </span>
              </span>
            </>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-1">
            {/* Botón para alternar entre modo claro y oscuro */}
            <button
              type="button"
              onClick={() => setTemaOscuro((actual) => !actual)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"
              aria-label={
                temaOscuro ? 'Activar modo claro' : 'Activar modo oscuro'
              }
              title={temaOscuro ? 'Modo claro' : 'Modo oscuro'}
            >
              {temaOscuro ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Enlace al perfil de usuario (visible exclusivamente para administradores) */}
            {usuario?.id_rol === ID_ROL.ADMINISTRADOR && (
              <Link
                to="/perfil"
                onClick={onCerrar}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"
                aria-label="Mi perfil"
                title="Mi perfil"
              >
                <UserRound size={16} />
              </Link>
            )}

            {/* Botón de cierre de sesión con indicador de carga */}
            {usuario && (
              <button
                type="button"
                onClick={handleCerrarSesion}
                disabled={cerrando}
                className="sidebar-logout flex h-8 w-8 items-center justify-center rounded-lg text-white/55 transition hover:bg-red-950/60 hover:text-red-300 disabled:opacity-60"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                {cerrando ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
