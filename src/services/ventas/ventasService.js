import { peticion } from '../compartido/clienteApi';

// Obtiene las ventas registradas.
export const listarVentas = () => peticion('/ventas/listar');

// Registra una venta con los datos y productos seleccionados.
export const registrarVenta = (datos) =>
  peticion('/ventas/registrar', { metodo: 'POST', cuerpo: datos });

// Confirma la venta identificada por su ID.
export const confirmarVenta = (id) =>
  peticion(`/ventas/confirmar/${id}`, { metodo: 'POST' });

// Envía los datos de corrección para una venta existente.
export const corregirVenta = (id, datos) =>
  peticion(`/ventas/corregir/${id}`, { metodo: 'PUT', cuerpo: datos });

// Anula la venta indicada con la información requerida.
export const anularVenta = (id, datos) =>
  peticion(`/ventas/anular/${id}`, { metodo: 'PUT', cuerpo: datos });
