import { peticion } from '../compartido/clienteApi';

// Obtiene los movimientos registrados en el inventario.
export const listarMovimientos = () =>
  peticion('/inventario/movimientos/listar');
