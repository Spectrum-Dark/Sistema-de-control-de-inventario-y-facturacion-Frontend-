const CLAVE_TOKEN = "token";
const CLAVE_USUARIO = "usuario";

export const guardarSesion = (token, usuario) => {
  localStorage.setItem(CLAVE_TOKEN, token);
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

export const guardarUsuario = (usuario) => {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

export const obtenerToken = () => localStorage.getItem(CLAVE_TOKEN);

export const obtenerUsuario = () => {
  const guardado = localStorage.getItem(CLAVE_USUARIO);
  try {
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
};

export const borrarSesion = () => {
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_USUARIO);
};