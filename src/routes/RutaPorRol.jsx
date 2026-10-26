// Importación de componentes de navegación condicional y renderizado de subrutas en React Router DOM
import { Navigate, Outlet } from 'react-router-dom';
// Importación del hook personalizado de autenticación para obtener el estado y los datos del usuario actual
import { useAuth } from '../hooks/sesion/useAuth';

// Componente de orden superior (Route Wrapper) encargado de la autorización basada en roles (Control de Acceso Basado en Roles - RBAC)
export default function RutaPorRol({ rolesPermitidos }) {
  // Extracción del objeto usuario autenticado desde el hook de contexto de sesión
  const { usuario } = useAuth();

  // Validación: Comprueba si el rol del usuario actual se encuentra dentro del array de roles permitidos para la ruta
  return rolesPermitidos.includes(usuario?.id_rol) ? (
    // Si tiene permisos, renderiza el componente hijo anidado correspondiente mediante <Outlet />
    <Outlet />
  ) : (
    // Si no está autorizado, realiza una redirección segura hacia el dashboard reemplazando el historial actual
    <Navigate to="/dashboard" replace />
  );
}
