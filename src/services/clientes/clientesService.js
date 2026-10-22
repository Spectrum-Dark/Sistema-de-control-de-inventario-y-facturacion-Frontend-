import { peticion } from "../compartido/clienteApi";

export const listarClientes = () => peticion("/clientes/listar");

export const crearCliente = (datos) =>
  peticion("/clientes/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarCliente = (id, cambios) =>
  peticion(`/clientes/actualizar/${id}`, { metodo: "PUT", cuerpo: cambios });

export const eliminarCliente = (id) =>
  peticion(`/clientes/eliminar/${id}`, { metodo: "DELETE" });