// Importación de componentes de enrutamiento y redirección de React Router DOM
import { Routes, Route, Navigate } from 'react-router-dom';
// Importación de las páginas de autenticación (sesión)
import Login from '../pages/sesion/Login';
import Register from '../pages/sesion/Register';
// Importación de la página principal del sistema
import Dashboard from '../pages/dashboard/Dashboard';
// Importación de páginas correspondientes a catálogos independientes
import Categorias from '../pages/categorias/Categorias';
import Marcas from '../pages/marcas/Marcas';
import Proveedores from '../pages/proveedores/Proveedores';
// Importación de páginas de gestión de vehículos y productos
import Modelos from '../pages/modelos/Modelos';
import Productos from '../pages/productos/Productos';
import Compatibilidades from '../pages/compatibilidades/Compatibilidades';
// Importación de la página de gestión de clientes
import Clientes from '../pages/clientes/Clientes';
// Importación de páginas del módulo de compras e inventario
import Compras from '../pages/compras/Compras';
import HistorialCompras from '../pages/compras/HistorialCompras';
import MovimientosInventario from '../pages/inventario/MovimientosInventario';
// Importación de páginas de ventas y facturación
import Ventas from '../pages/ventas/Ventas';
import HistorialVentas from '../pages/ventas/HistorialVentas';
import Facturacion from '../pages/facturacion/Facturacion';
// Importación de las diferentes vistas de reportes del sistema
import ReporteInventario from '../pages/reportes/ReporteInventario';
import ReporteCompras from '../pages/reportes/ReporteCompras';
import ReporteVentas from '../pages/reportes/ReporteVentas';
import ReporteFacturacion from '../pages/reportes/ReporteFacturacion';
import ReporteCatalogos from '../pages/reportes/ReporteCatalogos';
// Importación de páginas administrativas y de usuario
import Respaldo from '../pages/respaldo/Respaldo';
import Usuarios from '../pages/usuarios/Usuarios';
import Perfil from '../pages/perfil/Perfil';
import Proformas from '../pages/proformas/Proformas';
// Importación de componentes de diseño estructural (Layout) y HOCs/Wrappers de seguridad para rutas
import LayoutPrincipal from '../components/layout/LayoutPrincipal';
import RutaProtegida from './RutaProtegida';
import RutaPublica from './RutaPublica';
import RutaPorRol from './RutaPorRol';
// Importación de constantes de roles para la validación de permisos
import { ID_ROL } from '../utils/sesion/roles';

// Componente principal de enrutamiento que define la estructura jerárquica y de seguridad de la aplicación
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas: accesibles únicamente para usuarios sin sesión activa (ej. login y registro) */}
      <Route element={<RutaPublica />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Route>

      {/* Rutas Protegidas: requieren que el usuario haya iniciado sesión obligatoriamente */}
      <Route element={<RutaProtegida />}>
        {/* Layout Principal: estructura visual común (barra de navegación, sidebar) para las vistas internas */}
        <Route element={<LayoutPrincipal />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fase 2: Módulos de catálogos independientes */}
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/proveedores" element={<Proveedores />} />

          {/* Fase 3: Módulos de vehículos y productos */}
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/compatibilidades" element={<Compatibilidades />} />

          {/* Fase 4: Módulo de gestión de clientes */}
          <Route path="/clientes" element={<Clientes />} />

          {/* Fase 5: Módulos de compras y control de inventario */}
          <Route path="/compras" element={<Compras />} />
          <Route path="/historial-compras" element={<HistorialCompras />} />
          <Route
            path="/movimientos-inventario"
            element={<MovimientosInventario />}
          />

          {/* Fase 6: Módulos de ventas y facturación */}
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/historial-ventas" element={<HistorialVentas />} />
          <Route path="/facturacion" element={<Facturacion />} />

          {/* Fase 7: Módulos de reportes analíticos */}
          <Route path="/reportes/inventario" element={<ReporteInventario />} />
          <Route path="/reportes/compras" element={<ReporteCompras />} />
          <Route path="/reportes/ventas" element={<ReporteVentas />} />
          <Route
            path="/reportes/facturacion"
            element={<ReporteFacturacion />}
          />
          <Route path="/reportes/catalogos" element={<ReporteCatalogos />} />

          {/* Ruta protegida por rol: Módulo de respaldo exclusivo para el rol de Administrador */}
          <Route
            path="/respaldo"
            element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}
          >
            <Route index element={<Respaldo />} />
          </Route>

          {/* Fase 1: Módulo de gestión de usuarios exclusivo para Administradores */}
          <Route
            path="/usuarios"
            element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}
          >
            <Route index element={<Usuarios />} />
          </Route>

          {/* Ruta protegida por rol: Módulo de perfil con acceso restringido al Administrador */}
          <Route
            path="/perfil"
            element={<RutaPorRol rolesPermitidos={[ID_ROL.ADMINISTRADOR]} />}
          >
            <Route index element={<Perfil />} />
          </Route>

          {/* Ruta protegida por roles múltiples: Módulo de proformas accesible por Administrador, Operador y Consultor */}
          <Route
            path="/proformas"
            element={
              <RutaPorRol
                rolesPermitidos={[
                  ID_ROL.ADMINISTRADOR,
                  ID_ROL.OPERADOR,
                  ID_ROL.CONSULTOR,
                ]}
              />
            }
          >
            <Route index element={<Proformas />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta comodín (Wildcard): Redirige cualquier URL no coincidente hacia la vista de inicio de sesión */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
