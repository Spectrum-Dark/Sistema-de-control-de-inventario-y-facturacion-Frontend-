import { coincideTexto } from '../compartido/filtros';

/**
 * Estado inicial por defecto para los filtros de la vista de movimientos.
 * Se define como constante para reutilizarlo al limpiar o resetear los filtros.
 */
export const FILTROS_INICIALES = { busqueda: '', tipo: '' };

/**
 * Función pura encargada de filtrar el arreglo de movimientos según los criterios
 * establecidos por el usuario (texto de búsqueda y tipo de movimiento).
 */
export const filtrarMovimientos = (movimientos, filtros) =>
  movimientos.filter(
    (m) =>
      // 1. Filtro por texto: Comprueba si la cadena de búsqueda coincide con alguna
      // de las propiedades clave del movimiento.
      // Se utiliza el operador de encadenamiento opcional (?.) para evitar errores
      // si alguna relación (producto, usuario, compra) viene nula o indefinida.
      coincideTexto(filtros.busqueda, [
        m.producto?.codigo_producto,
        m.producto?.nombre_producto,
        m.motivo,
        m.usuario?.nombre_completo,
        m.usuario?.nombre_usuario,
        m.compra?.numero_compra,
      ]) &&
      // 2. Filtro por tipo: Si 'filtros.tipo' está vacío, se omite esta condición (!filtros.tipo es true).
      // Si tiene valor, evalúa que el tipo del movimiento coincida exactamente.
      (!filtros.tipo || m.tipo_movimiento === filtros.tipo)
  );
