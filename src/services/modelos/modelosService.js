import { peticion } from "../compartido/clienteApi";

export const listarModelos = () => peticion("/modelos/listar");

export const crearModelo = (datos) =>
  peticion("/modelos/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarModelo = (id, cambios) =>
  peticion(`/modelos/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const eliminarModelo = (id) =>
  peticion(`/modelos/eliminar/${id}`, { metodo: "DELETE" });