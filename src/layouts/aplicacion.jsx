import { Outlet } from "react-router-dom";
import Encabezados from "../components/encabezados";
import BarraLateral from "../components/barralateral";

function Aplicacion() {
  return (
    <div>
      {/* Encabezado (header) */}
      <Encabezados />

      {/* Barra lateral (Sidebar) */}
      <BarraLateral />

      {/* Vistas de la app (Outlet) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Aplicacion;
