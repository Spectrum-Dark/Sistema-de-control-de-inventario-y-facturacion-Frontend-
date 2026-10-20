import { peticion } from "../compartido/clienteApi";

export const listarProveedores = () => peticion("/proveedores/listar");

export const crearProveedor = (datos) =>
  peticion("/proveedores/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarProveedor = (id, cambios) =>
  peticion(`/proveedores/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const eliminarProveedor = (id) =>
  peticion(`/proveedores/eliminar/${id}`, { metodo: "DELETE" });