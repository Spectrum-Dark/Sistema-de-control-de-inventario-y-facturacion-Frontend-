import { peticion } from '../compartido/clienteApi';

// Obtiene las facturas disponibles.
export const listarFacturas = () => peticion('/facturas/listar');

// Obtiene el detalle de una factura por su ID.
export const mostrarFactura = (id) => peticion(`/facturas/mostrar/${id}`);

// Emite una factura con los datos enviados.
export const emitirFactura = (datos) =>
  peticion('/facturas/emitir', { metodo: 'POST', cuerpo: datos });

// Anula una factura y envía la información requerida para la anulación.
export const anularFactura = (id, datos) =>
  peticion(`/facturas/anular/${id}`, { metodo: 'PUT', cuerpo: datos });
