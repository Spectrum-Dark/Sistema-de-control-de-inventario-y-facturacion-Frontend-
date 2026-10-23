import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Loader2, Menu, Moon, Sun, UserRound } from "lucide-react";
import { sileo } from "sileo";
import { useAuth } from "../../hooks/sesion/useAuth";
import { ID_ROL, ROLES } from "../../utils/sesion/roles";
import { solicitarCierreSesion } from "../../services/sesion/sesionService";
import MigasDePan from "./MigasDePan";
import { Link } from "react-router-dom";

const CLAVE_TEMA = "tema_interfaz";

export default function Encabezado({ onAbrirMenu }) {
  const { usuario, cerrarSesion } = useAuth();
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(() => localStorage.getItem(CLAVE_TEMA) === "oscuro");
  const perfilRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.tema = temaOscuro ? "oscuro" : "claro";
    localStorage.setItem(CLAVE_TEMA, temaOscuro ? "oscuro" : "claro");
  }, [temaOscuro]);

  useEffect(() => {
    const cerrarAlHacerClickFuera = (evento) => {
      if (!perfilRef.current?.contains(evento.target)) setPerfilAbierto(false);
    };
    const cerrarConEscape = (evento) => {
      if (evento.key === "Escape") setPerfilAbierto(false);
    };
    document.addEventListener("mousedown", cerrarAlHacerClickFuera);
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, []);

  const handleCerrarSesion = async () => {
    setCerrando(true);
    try {
      await solicitarCierreSesion();
      sileo.success({ title: "Sesión cerrada" });
    } catch (error) {
      if (error.estado === 401) sileo.success({ title: "Sesión cerrada" });
      else sileo.warning({ title: "Sesión cerrada solo en este equipo", description: error.message });
    } finally {
      cerrarSesion();
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button onClick={onAbrirMenu} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden" aria-label="Abrir menú">
        <Menu size={21} />
      </button>
      <MigasDePan />

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => setTemaOscuro((actual) => !actual)}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label={temaOscuro ? "Activar modo claro" : "Activar modo oscuro"}
          title={temaOscuro ? "Modo claro" : "Modo oscuro"}
        >
          {temaOscuro ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {usuario && (
          <div className="relative" ref={perfilRef}>
            <button
              type="button"
              onClick={() => setPerfilAbierto((actual) => !actual)}
              aria-expanded={perfilAbierto}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-slate-100"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
                {usuario.nombre_completo.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-right sm:block">
                <span className="block max-w-36 truncate text-sm font-medium text-slate-900">{usuario.nombre_completo}</span>
                <span className="block text-xs text-slate-500">{ROLES[usuario.id_rol]}</span>
              </span>
              <ChevronDown size={15} className="hidden text-slate-500 sm:block" />
            </button>

            {perfilAbierto && (
              <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <div className="border-b border-slate-100 px-3 py-2.5">
                  <p className="truncate text-sm font-semibold text-slate-900">{usuario.nombre_completo}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{ROLES[usuario.id_rol]}</p>
                </div>
                <div className="px-1 pt-1">
                  <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-500"><UserRound size={16} /> Cuenta activa</div>
                  {usuario.id_rol === ID_ROL.ADMINISTRADOR && (
                    <Link
                      role="menuitem"
                      to="/perfil"
                      onClick={() => setPerfilAbierto(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <UserRound size={16} /> Mi perfil
                    </Link>
                  )}
                  <button role="menuitem" type="button" onClick={handleCerrarSesion} disabled={cerrando} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60">
                    {cerrando ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                    {cerrando ? "Cerrando sesión..." : "Cerrar sesión"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
