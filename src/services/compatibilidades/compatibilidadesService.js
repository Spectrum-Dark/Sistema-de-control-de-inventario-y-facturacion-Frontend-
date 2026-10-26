import { peticion } from '../compartido/clienteApi';

// Obtiene las compatibilidades registradas entre productos y modelos.
export const listarCompatibilidades = () =>
  peticion('/compatibilidades/listar');

// Registra una nueva compatibilidad con los datos recibidos.
export const crearCompatibilidad = (datos) =>
  peticion('/compatibilidades/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza la compatibilidad identificada por su ID.
export const actualizarCompatibilidad = (id, cambios) =>
  peticion(`/compatibilidades/actualizar/${id}`, {
    metodo: 'PUT',
    cuerpo: cambios,
  });

// Elimina la compatibilidad indicada por su ID.
export const eliminarCompatibilidad = (id) =>
  peticion(`/compatibilidades/eliminar/${id}`, { metodo: 'DELETE' });
