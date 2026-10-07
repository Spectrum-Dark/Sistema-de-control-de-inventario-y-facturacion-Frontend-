import { Navigate, Route, Routes } from "react-router-dom";

/* Vistas de Autenticación */
import Sesion from "./pages/autenticacion/sesion";
import Registro from "./pages/autenticacion/registro";

/* Layout Principal */
import Aplicacion from "./layouts/aplicacion";

/* Vistas de la Aplicación */
import Dashboard from "./pages/dashboard/dashboard";
import Productos from "./pages/gestion/productos";
import Categorias from "./pages/gestion/categorias";
import Marcas from "./pages/gestion/marcas";
import Modelos from "./pages/gestion/modelos";
import Compatibilidades from "./pages/gestion/compatibilidades";
import Proveedores from "./pages/gestion/proveedores";
import Clientes from "./pages/gestion/clientes";
import Compras from "./pages/operaciones/compras";
import Inventario from "./pages/operaciones/inventario";
import Ventas from "./pages/operaciones/ventas";
import Usuarios from "./pages/administracion/usuarios";
import RolesPermisos from "./pages/administracion/roles_permisos";
import Respaldo from "./pages/administracion/respaldo";
import Facturas from "./pages/facturacion/facturas";
import Reportes from "./pages/reportes/reportes";

function App() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Autenticación */}
      <Route path="/login" element={<Sesion />} />
      <Route path="/register" element={<Registro />} />

      {/* Aplicación principal con Layout anidado */}
      <Route path="/app" element={<Aplicacion />}>
        {/* Redirecciona /app automáticamente al dashboard */}
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Gestión */}
        <Route path="gestion/productos" element={<Productos />} />
        <Route path="gestion/categorias" element={<Categorias />} />
        <Route path="gestion/marcas" element={<Marcas />} />
        <Route path="gestion/modelos" element={<Modelos />} />
        <Route path="gestion/compatibilidades" element={<Compatibilidades />} />
        <Route path="gestion/proveedores" element={<Proveedores />} />
        <Route path="gestion/clientes" element={<Clientes />} />

        {/* Operaciones */}
        <Route path="operaciones/compras" element={<Compras />} />
        <Route path="operaciones/inventario" element={<Inventario />} />
        <Route path="operaciones/ventas" element={<Ventas />} />

        {/* Administración */}
        <Route path="administracion/usuarios" element={<Usuarios />} />
        <Route path="administracion/roles-permisos" element={<RolesPermisos />} />
        <Route path="administracion/respaldo" element={<Respaldo />} />

        {/* Facturación */}
        <Route path="facturacion/facturas" element={<Facturas />} />

        {/* Reportes */}
        <Route path="reportes" element={<Reportes />} />
      </Route>

      {/* Ruta 404 / Comodín */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;