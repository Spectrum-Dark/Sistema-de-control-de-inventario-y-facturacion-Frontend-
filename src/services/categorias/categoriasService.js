import { peticion } from '../compartido/clienteApi';

// Obtiene el catálogo de categorías registrado.
export const listarCategorias = () => peticion('/categorias/listar');

// Registra una categoría con los datos enviados por el formulario.
export const crearCategoria = (datos) =>
  peticion('/categorias/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados para una categoría existente.
export const actualizarCategoria = (id, cambios) =>
  peticion(`/categorias/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina la categoría identificada por su ID.
export const eliminarCategoria = (id) =>
  peticion(`/categorias/eliminar/${id}`, { metodo: 'DELETE' });
