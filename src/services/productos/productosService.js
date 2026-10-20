import { peticion } from "../compartido/clienteApi";

export const listarProductos = () => peticion("/productos/listar");

export const crearProducto = (datos) =>
  peticion("/productos/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarProducto = (id, cambios) =>
  peticion(`/productos/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const eliminarProducto = (id) =>
  peticion(`/productos/eliminar/${id}`, { metodo: "DELETE" });