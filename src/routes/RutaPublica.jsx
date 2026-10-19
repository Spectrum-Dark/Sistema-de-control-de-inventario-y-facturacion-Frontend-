import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/sesion/useAuth";

export default function RutaPublica() {
  const { autenticado } = useAuth();
  return autenticado ? <Navigate to="/dashboard" replace /> : <Outlet />;
}