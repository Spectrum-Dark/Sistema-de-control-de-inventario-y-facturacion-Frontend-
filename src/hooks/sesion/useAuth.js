import { useContext } from 'react';
import { AuthContext } from '../../context/sesion/AuthContext';

/**
 * Custom Hook para consumir el contexto de autenticación de forma sencilla.
 * Centraliza el acceso al estado de la sesión (usuario, token, login, logout)
 * evitando repetir la importación de 'useContext' y 'AuthContext' en cada componente.
 */
export const useAuth = () => {
  // Utilizamos el hook nativo useContext pasándole nuestro AuthContext
  // para obtener los datos y funciones de sesión disponibles en el árbol de componentes.
  return useContext(AuthContext);
};
