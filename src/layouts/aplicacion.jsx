import { useState } from "react";
import { Outlet } from "react-router-dom";
import Encabezados from "../components/sistema/encabezados";
import BarraLateral from "../components/sistema/barra_lateral";

function Aplicacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Encabezado (header) */}
      <Encabezados
        menuAbierto={menuAbierto}
        alAlternarMenu={() => setMenuAbierto(!menuAbierto)}
      />

      {/* Barra lateral (Sidebar) */}
      <BarraLateral
        abierto={menuAbierto}
        alCerrar={() => setMenuAbierto(false)}
      />

      {/* Vistas de la app (Outlet) */}
      <main className="px-4 pb-8 pt-20 sm:px-6 lg:pl-72 lg:pr-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Aplicacion;
