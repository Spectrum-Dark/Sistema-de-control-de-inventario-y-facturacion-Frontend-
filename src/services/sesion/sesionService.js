import { peticion } from '../compartido/clienteApi';

// Envía las credenciales para iniciar una sesión.
export const solicitarInicioSesion = (credenciales) =>
  peticion('/sesion', { metodo: 'POST', cuerpo: credenciales });

// Envía los datos para crear una cuenta.
export const solicitarRegistro = (datos) =>
  peticion('/registro', { metodo: 'POST', cuerpo: datos });

// Solicita al servidor cerrar la sesión actual.
export const solicitarCierreSesion = () =>
  peticion('/cerrar-sesion', { metodo: 'POST' });

// Obtiene los datos de la cuenta autenticada.
export const obtenerUsuarioAutenticado = () => peticion('/usuario');
