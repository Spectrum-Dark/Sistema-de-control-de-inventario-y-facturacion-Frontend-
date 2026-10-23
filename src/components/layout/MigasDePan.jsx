import { ChevronRight, House } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { menuPrincipal, filtrarMenuPorRol } from "../../utils/layout/menu";
import { useAuth } from "../../hooks/sesion/useAuth";

export default function MigasDePan() {
  const { pathname } = useLocation();
  const { usuario } = useAuth();
  const opciones = filtrarMenuPorRol(menuPrincipal, usuario?.id_rol);
  let pagina = null;
  let seccion = null;

  for (const opcion of opciones) {
    if (opcion.ruta === pathname) pagina = opcion;
    const hijo = opcion.hijos?.find((item) => item.ruta === pathname);
    if (hijo) {
      pagina = hijo;
      seccion = opcion;
    }
  }

  if (pathname === "/perfil") {
    pagina = { nombre: "Mi perfil" };
  }

  return (
    <nav aria-label="Migas de pan" className="min-w-0">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-slate-900" aria-label="Panel principal">
            <House size={15} />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </li>
        {pathname !== "/dashboard" && (seccion || pagina) && (
          <>
            <li aria-hidden="true"><ChevronRight size={14} className="text-slate-400" /></li>
            {seccion && <li className="hidden text-slate-500 md:block">{seccion.nombre}</li>}
            {seccion && <li aria-hidden="true" className="hidden md:block"><ChevronRight size={14} className="text-slate-400" /></li>}
            <li aria-current="page" className="truncate font-medium text-slate-800">{pagina.nombre}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
