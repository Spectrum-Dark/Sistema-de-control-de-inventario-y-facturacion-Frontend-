// Definición de constantes para las claves estáticas utilizadas en el almacenamiento local del navegador
const CLAVE_TOKEN = 'token';
const CLAVE_USUARIO = 'usuario';

// Función para guardar simultáneamente la sesión del usuario (token de autenticación y datos de usuario)
export const guardarSesion = (token, usuario) => {
  // Almacena el token de acceso de manera directa como cadena de texto
  localStorage.setItem(CLAVE_TOKEN, token);
  // Serializa el objeto de usuario a formato JSON antes de almacenarlo en localStorage
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

// Función para actualizar o guardar únicamente la información del usuario actual
export const guardarUsuario = (usuario) => {
  // Serializa y guarda el objeto de usuario actualizado
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

// Función para recuperar y retornar el token de autenticación almacenado
export const obtenerToken = () => localStorage.getItem(CLAVE_TOKEN);

// Función para recuperar y parsear los datos del usuario almacenados de forma segura
export const obtenerUsuario = () => {
  // Obtiene la cadena JSON cruda desde el localStorage
  const guardado = localStorage.getItem(CLAVE_USUARIO);
  try {
    // Si existe información guardada, la deserializa; de lo contrario, retorna null
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    // Bloque catch defensivo para evitar fallos críticos si la cadena JSON está corrupta o malformada
    return null;
  }
};

// Función para cerrar sesión eliminando por completo las credenciales y datos del usuario del almacenamiento local
export const borrarSesion = () => {
  // Remueve tanto el token como el registro del usuario del localStorage
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_USUARIO);
};
