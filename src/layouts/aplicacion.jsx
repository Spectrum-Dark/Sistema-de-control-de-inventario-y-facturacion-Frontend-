import { Outlet } from "react-router-dom";
import Encabezados from "../components/encabezados";
import BarraLateral from "../components/barra_lateral";
import MigasPan from "../components/migajas_pan";

function Aplicacion() {
  return (
    <div>
      {/* Encabezado (header) */}
      <Encabezados />

      {/* Barra lateral (Sidebar) */}
      <BarraLateral />

      {/* Vistas de la app (Outlet) */}
      <main>
        <MigasPan />
        <Outlet />
      </main>
    </div>
  );
}

export default Aplicacion;
