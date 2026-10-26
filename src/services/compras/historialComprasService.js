import { peticion } from '../compartido/clienteApi';

// Obtiene los movimientos del historial de compras.
export const listarHistorialCompras = () =>
  peticion('/compras/historial/listar');
