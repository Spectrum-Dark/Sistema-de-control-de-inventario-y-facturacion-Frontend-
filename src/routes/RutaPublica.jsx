// Importación de componentes de navegación condicional y renderizado de subrutas en React Router DOM
import { Navigate, Outlet } from 'react-router-dom';
// Importación del hook personalizado de autenticación para consultar el estado actual de la sesión
import { useAuth } from '../hooks/sesion/useAuth';

// Componente de orden superior (Ruta Pública) encargado de evitar que un usuario autenticado vuelva a acceder a vistas de acceso (login/registro)
export default function RutaPublica() {
  // Extracción de la bandera booleana de autenticación desde el contexto de sesión
  const { autenticado } = useAuth();

  // Validación condicional: Si el usuario ya cuenta con una sesión activa, se le redirige automáticamente al dashboard
  // Si no está autenticado, permite visualizar las rutas públicas hijas correspondientes mediante <Outlet />
  return autenticado ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
