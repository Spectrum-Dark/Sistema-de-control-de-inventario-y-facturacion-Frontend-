// Importación de componentes de navegación, subrutas y el hook para obtener la ruta actual (pathname) desde React Router DOM
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Importación del hook personalizado de autenticación para consultar el estado de sesión y los datos del usuario
import { useAuth } from '../hooks/sesion/useAuth';
// Importación de las constantes de roles del sistema para validaciones de negocio específicas
import { ID_ROL } from '../utils/sesion/roles';

// Componente de orden superior (Ruta Protegida) que valida autenticación y restringe accesos según reglas de negocio por rol
export default function RutaProtegida() {
  // Extracción del estado de autenticación y del objeto de usuario actual del hook de sesión
  const { autenticado, usuario } = useAuth();
  // Obtención de la ruta actual (URL path) para evaluar restricciones basadas en navegación
  const { pathname } = useLocation();

  // Validación 1: Si el usuario no ha iniciado sesión, se le redirige de forma segura al formulario de login
  if (!autenticado) return <Navigate to="/login" replace />;

  // El consultor solo puede acceder al Dashboard y a las vistas de reportes.
  const esConsultor = Number(usuario?.id_rol) === ID_ROL.CONSULTOR;
  const rutaPermitidaConsultor =
    pathname === '/dashboard' || pathname.startsWith('/reportes/');

  if (esConsultor && !rutaPermitidaConsultor) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si pasa todas las validaciones de seguridad y negocio, se renderizan los componentes hijos correspondientes mediante <Outlet />
  return <Outlet />;
}
