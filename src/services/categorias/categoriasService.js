import { peticion } from "../compartido/clienteApi";

export const listarCategorias = () => peticion("/categorias/listar");

export const crearCategoria = (datos) =>
  peticion("/categorias/crear", { metodo: "POST", cuerpo: datos });

export const actualizarCategoria = (id, cambios) =>
  peticion(`/categorias/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });