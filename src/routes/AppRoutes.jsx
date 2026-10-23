import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/sesion/Login";
import Register from "../pages/sesion/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Categorias from "../pages/categorias/Categorias";
import Marcas from "../pages/marcas/Marcas";
import Proveedores from "../pages/proveedores/Proveedores";
import Modelos from "../pages/modelos/Modelos";
import Productos from "../pages/productos/Productos";
import Compatibilidades from "../pages/compatibilidades/Compatibilidades";
import Clientes from "../pages/clientes/Clientes";
import Compras from "../pages/compras/Compras";
import HistorialCompras from "../pages/compras/HistorialCompras";
import MovimientosInventario from "../pages/inventario/MovimientosInventario";
import Ventas from "../pages/ventas/Ventas";
import HistorialVentas from "../pages/ventas/HistorialVentas";
import Facturacion from "../pages/facturacion/Facturacion";
import ReporteInventario from "../pages/reportes/ReporteInventario";
import ReporteCompras from "../pages/reportes/ReporteCompras";
import ReporteVentas from "../pages/reportes/ReporteVentas";
import ReporteFacturacion from "../pages/reportes/ReporteFacturacion";
import ReporteCatalogos from "../pages/reportes/ReporteCatalogos";
import Respaldo from "../pages/respaldo/Respaldo";
import Usuarios from "../pages/usuarios/Usuarios";
import Perfil from "../pages/perfil/Perfil";
import Proformas from "../pages/proformas/Proformas";
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

          {/* Fase 2: catálogos independientes */}
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/proveedores" element={<Proveedores />} />

          {/* Fase 3: vehículos y productos */}
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/compatibilidades" element={<Compatibilidades />} />

          {/* Fase 4: clientes */}
          <Route path="/clientes" element={<Clientes />} />

          {/* Fase 5: compras e inventario */}
          <Route path="/compras" element={<Compras />} />
          <Route path="/historial-compras" element={<HistorialCompras />} />
          <Route
            path="/movimientos-inventario"
            element={<MovimientosInventario />}
          />

          {/* Fase 6: ventas y facturación */}
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/historial-ventas" element={<HistorialVentas />} />
          <Route path="/facturacion" element={<Facturacion />} />

          {/* Fase 7: reportes */}
          <Route path="/reportes/inventario" element={<ReporteInventario />} />
          <Route path="/reportes/compras" element={<ReporteCompras />} />
          <Route path="/reportes/ventas" element={<ReporteVentas />} />
          <Route path="/reportes/facturacion" element={<ReporteFacturacion />} />
          <Route path="/reportes/catalogos" element={<ReporteCatalogos />} />

          <Route path="/respaldo" element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}>
            <Route index element={<Respaldo />} />
          </Route>

          {/* Fase 1: solo Administrador */}
          <Route path="/usuarios" element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}>
            <Route index element={<Usuarios />} />
          </Route>

          <Route path="/perfil" element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}>
            <Route index element={<Perfil />} />
          </Route>

          <Route path="/proformas" element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR, ID_ROL.OPERADOR, ID_ROL.CONSULTOR]} />}>
            <Route index element={<Proformas />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
