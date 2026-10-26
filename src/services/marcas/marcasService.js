import { peticion } from '../compartido/clienteApi';

// Obtiene el listado de marcas.
export const listarMarcas = () => peticion('/marcas/listar');

// Registra una marca con los datos proporcionados.
export const crearMarca = (datos) =>
  peticion('/marcas/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados de una marca existente.
export const actualizarMarca = (id, cambios) =>
  peticion(`/marcas/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina la marca identificada por su ID.
export const eliminarMarca = (id) =>
  peticion(`/marcas/eliminar/${id}`, { metodo: 'DELETE' });
