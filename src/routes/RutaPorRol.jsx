import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/sesion/useAuth";

export default function RutaPorRol({ rolesPermitidos }) {
  const { usuario } = useAuth();

  return rolesPermitidos.includes(usuario?.id_rol) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}