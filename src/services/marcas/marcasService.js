import { peticion } from "../compartido/clienteApi";

export const listarMarcas = () => peticion("/marcas/listar");

export const crearMarca = (datos) =>
  peticion("/marcas/crear", { metodo: "POST", cuerpo: datos });

export const actualizarMarca = (id, cambios) =>
  peticion(`/marcas/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });