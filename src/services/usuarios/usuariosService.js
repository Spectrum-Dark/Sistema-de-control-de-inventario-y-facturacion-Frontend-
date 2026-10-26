import { peticion } from '../compartido/clienteApi';

// Obtiene las cuentas de usuario disponibles.
export const listarUsuarios = () => peticion('/usuarios');

// Actualiza los datos del usuario indicado.
export const actualizarUsuario = (id, cambios) =>
  peticion(`/usuarios/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Actualiza las credenciales o datos de acceso del usuario indicado.
export const restablecerContrasena = (id, datos) =>
  peticion(`/usuarios/actualizar/acceso/${id}`, {
    metodo: 'PUT',
    cuerpo: datos,
  });

// Actualiza la información del perfil de la sesión actual.
export const actualizarPerfilPropio = (cambios) =>
  peticion('/perfil', { metodo: 'PUT', cuerpo: cambios });

// Cambia la contraseña de la sesión actual.
export const cambiarContrasenaPropia = (datos) =>
  peticion('/perfil/contrasena', { metodo: 'PUT', cuerpo: datos });
