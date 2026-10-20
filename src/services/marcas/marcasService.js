import { peticion } from "../compartido/clienteApi";

export const listarMarcas = () => peticion("/marcas/listar");

export const crearMarca = (datos) =>
  peticion("/marcas/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarMarca = (id, cambios) =>
  peticion(`/marcas/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const eliminarMarca = (id) =>
  peticion(`/marcas/eliminar/${id}`, { metodo: "DELETE" });