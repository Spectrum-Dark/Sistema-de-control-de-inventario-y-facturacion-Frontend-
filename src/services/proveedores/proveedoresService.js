import { peticion } from '../compartido/clienteApi';

// Obtiene el listado de proveedores.
export const listarProveedores = () => peticion('/proveedores/listar');

// Registra un proveedor con los datos proporcionados.
export const crearProveedor = (datos) =>
  peticion('/proveedores/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados del proveedor seleccionado.
export const actualizarProveedor = (id, cambios) =>
  peticion(`/proveedores/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina el proveedor identificado por su ID.
export const eliminarProveedor = (id) =>
  peticion(`/proveedores/eliminar/${id}`, { metodo: 'DELETE' });
