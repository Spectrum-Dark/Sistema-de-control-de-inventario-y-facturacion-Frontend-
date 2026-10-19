import { peticion } from "../compartido/clienteApi";

export const listarUsuarios = () => peticion("/usuarios");

export const actualizarUsuario = (id, cambios) =>
  peticion(`/usuarios/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const restablecerContrasena = (id, datos) =>
  peticion(`/usuarios/actualizar/acceso/${id}`, {
    metodo: "PUT",
    cuerpo: datos,
  });