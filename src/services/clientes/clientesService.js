import { peticion } from '../compartido/clienteApi';

// Obtiene el listado de clientes.
export const listarClientes = () => peticion('/clientes/listar');

// Registra un cliente con los datos proporcionados.
export const crearCliente = (datos) =>
  peticion('/clientes/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados del cliente seleccionado.
export const actualizarCliente = (id, cambios) =>
  peticion(`/clientes/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina el cliente indicado por su ID.
export const eliminarCliente = (id) =>
  peticion(`/clientes/eliminar/${id}`, { metodo: 'DELETE' });
