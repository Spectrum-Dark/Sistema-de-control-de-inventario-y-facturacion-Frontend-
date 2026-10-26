import { createContext } from 'react';

// Contexto global 'AuthContext' para compartir el estado de autenticación (token, usuario actual, funciones de acceso y cierre de sesión) a través de toda la jerarquía de componentes de la aplicación.
export const AuthContext = createContext(null);
