import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  guardarSesion,
  guardarUsuario,
  borrarSesion,
  obtenerToken,
  obtenerUsuario,
} from '../../utils/sesion/almacenSesion';
import { obtenerUsuarioAutenticado } from '../../services/sesion/sesionService';

// Componente proveedor 'AuthProvider' encargado de gestionar el contexto global de autenticación de la aplicación, controlando el token JWT, los datos de usuario y sincronizando la sesión con el backend al iniciar.
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(obtenerToken);
  const [usuario, setUsuario] = useState(obtenerUsuario);

  // Función para iniciar sesión, persistiendo el token y el perfil de usuario en el almacenamiento local y actualizando el estado.
  const iniciarSesion = (nuevoToken, nuevoUsuario) => {
    guardarSesion(nuevoToken, nuevoUsuario);
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
  };

  // Función para cerrar sesión, limpiando el almacenamiento local y reseteando los estados globales.
  const cerrarSesion = () => {
    borrarSesion();
    setToken(null);
    setUsuario(null);
  };

  // Efecto para verificar y confirmar la validez de la sesión con el backend al iniciar o recargar la aplicación.
  useEffect(() => {
    if (!token) return;
    let activo = true;

    obtenerUsuarioAutenticado()
      .then((datos) => {
        if (!activo) return;
        guardarUsuario(datos);
        setUsuario(datos);
      })
      .catch((error) => {
        // Maneja la expiración del token (401) o la desactivación de la cuenta (403), cerrando la sesión automáticamente.
        if (activo && (error.estado === 401 || error.estado === 403)) {
          borrarSesion();
          setToken(null);
          setUsuario(null);
        }
      });

    return () => {
      activo = false;
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        autenticado: Boolean(token),
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
