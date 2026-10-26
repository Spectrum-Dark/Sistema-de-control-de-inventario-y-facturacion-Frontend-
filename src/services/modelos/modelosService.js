import { peticion } from '../compartido/clienteApi';

// Obtiene los modelos de vehículos registrados.
export const listarModelos = () => peticion('/modelos/listar');

// Registra un modelo con los datos del vehículo.
export const crearModelo = (datos) =>
  peticion('/modelos/registrar', { metodo: 'POST', cuerpo: datos });

// Actualiza los campos indicados del modelo seleccionado.
export const actualizarModelo = (id, cambios) =>
  peticion(`/modelos/actualizar/${id}`, { metodo: 'PUT', cuerpo: cambios });

// Elimina el modelo identificado por su ID.
export const eliminarModelo = (id) =>
  peticion(`/modelos/eliminar/${id}`, { metodo: 'DELETE' });
