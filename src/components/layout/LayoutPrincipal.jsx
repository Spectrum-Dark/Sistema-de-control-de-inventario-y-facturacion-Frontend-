import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutPrincipal() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      <div className="min-h-screen lg:pl-72">
        <main className="relative min-h-screen p-4 pt-16 sm:p-6 sm:pt-16 lg:pt-7">
          <button
            type="button"
            onClick={() => setMenuAbierto(true)}
            className="fixed left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={19} />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
