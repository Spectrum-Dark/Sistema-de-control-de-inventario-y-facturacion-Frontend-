import { NavLink } from "react-router-dom";

function BarraLateral() {
  return (
    <aside>
      <h2>Menú</h2>

      <nav>
        <NavLink to="/app/dashboard">Dashboard</NavLink>

        <h3>Gestión</h3>

        <NavLink to="/app/gestion/productos">Productos</NavLink>

        <NavLink to="/app/gestion/categorias">Categorías</NavLink>

        <NavLink to="/app/gestion/marcas">Marcas</NavLink>

        <NavLink to="/app/gestion/modelos">Modelos</NavLink>

        <NavLink to="/app/gestion/compatibilidades">Compatibilidades</NavLink>

        <NavLink to="/app/gestion/proveedores">Proveedores</NavLink>

        <NavLink to="/app/gestion/clientes">Clientes</NavLink>

        <h3>Operaciones</h3>

        <NavLink to="/app/operaciones/compras">Compras</NavLink>

        <NavLink to="/app/operaciones/inventario">Inventario</NavLink>

        <NavLink to="/app/operaciones/ventas">Ventas</NavLink>

        <h3>Facturación</h3>

        <NavLink to="/app/facturacion/facturas">Facturas</NavLink>

        <h3>Análisis</h3>

        <NavLink to="/app/reportes">Reportes</NavLink>

        <h3>Administración</h3>

        <NavLink to="/app/administracion/usuarios">Usuarios</NavLink>

        <NavLink to="/app/administracion/roles-permisos">
          Roles y permisos
        </NavLink>

        <NavLink to="/app/administracion/respaldo">Respaldo</NavLink>
      </nav>
    </aside>
  );
}

export default BarraLateral;
