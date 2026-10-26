import { peticion } from '../compartido/clienteApi';

// Obtiene los movimientos del historial de ventas.
export const listarHistorialVentas = () => peticion('/ventas/historial/listar');
