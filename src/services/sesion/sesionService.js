import { peticion } from "../compartido/clienteApi";

export const solicitarInicioSesion = (credenciales) =>
  peticion("/sesion", { metodo: "POST", cuerpo: credenciales });

export const solicitarRegistro = (datos) =>
  peticion("/registro", { metodo: "POST", cuerpo: datos });

export const solicitarCierreSesion = () =>
  peticion("/cerrar-sesion", { metodo: "POST" });

export const obtenerUsuarioAutenticado = () => peticion("/usuario");