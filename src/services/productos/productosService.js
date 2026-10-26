import { peticion } from '../compartido/clienteApi';

// Obtiene el catálogo de productos.
export const listarProductos = () => peticion('/productos/listar');

// Registra un producto con los datos proporcionados.
export const crearProducto = (datos) =>
  peticion('/productos/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados del producto existente.
export const actualizarProducto = (id, cambios) =>
  peticion(`/productos/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina el producto identificado por su ID.
export const eliminarProducto = (id) =>
  peticion(`/productos/eliminar/${id}`, { metodo: 'DELETE' });
