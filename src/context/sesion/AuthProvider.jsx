import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  guardarSesion,
  guardarUsuario,
  borrarSesion,
  obtenerToken,
  obtenerUsuario,
} from "../../utils/sesion/almacenSesion";
import { obtenerUsuarioAutenticado } from "../../services/sesion/sesionService";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(obtenerToken);
  const [usuario, setUsuario] = useState(obtenerUsuario);

  const iniciarSesion = (nuevoToken, nuevoUsuario) => {
    guardarSesion(nuevoToken, nuevoUsuario);
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
  };

  const cerrarSesion = () => {
    borrarSesion();
    setToken(null);
    setUsuario(null);
  };

  // Al abrir la app, se confirma con el backend quién es el usuario
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
        // Token vencido o revocado (401) o cuenta inactiva (403)
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
