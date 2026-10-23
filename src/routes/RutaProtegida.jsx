import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/sesion/useAuth";
import { ID_ROL } from "../utils/sesion/roles";

export default function RutaProtegida() {
  const { autenticado, usuario } = useAuth();
  const { pathname } = useLocation();

  if (!autenticado) return <Navigate to="/login" replace />;
  if (usuario?.id_rol === ID_ROL.CONSULTOR && pathname !== "/proformas") {
    return <Navigate to="/proformas" replace />;
  }

  return <Outlet />;
}
