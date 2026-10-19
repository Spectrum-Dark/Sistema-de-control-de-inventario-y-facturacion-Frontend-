import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/sesion/Login";
import Register from "../pages/sesion/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Categorias from "../pages/categorias/Categorias";
import Marcas from "../pages/marcas/Marcas";
import Usuarios from "../pages/usuarios/Usuarios";
import LayoutPrincipal from "../components/layout/LayoutPrincipal";
import RutaProtegida from "./RutaProtegida";
import RutaPublica from "./RutaPublica";
import RutaPorRol from "./RutaPorRol";
import { ID_ROL } from "../utils/sesion/roles";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas: solo sin sesión */}
      <Route element={<RutaPublica />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Route>

      {/* Solo con sesión iniciada */}
      <Route element={<RutaProtegida />}>
        <Route element={<LayoutPrincipal />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/marcas" element={<Marcas />} />

          {/* Solo Administrador */}
          <Route element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}>
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}