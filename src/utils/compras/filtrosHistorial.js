import { coincideTexto } from '../compartido/filtros';

// Objeto que define el estado inicial de los filtros.
// En este caso, empezamos con un campo de búsqueda vacío para que al inicio
// se muestre todo el historial sin filtrar.
export const FILTROS_INICIALES = { busqueda: '' };

/**
 * Función pura para filtrar el historial de operaciones según los criterios de búsqueda.
 * @param {Array} historial - El listado completo de registros de historial a filtrar.
 * @param {Object} filtros - El objeto que contiene los filtros actuales (ej. { busqueda: "texto" }).
 * @returns {Array} - Un nuevo array con los elementos que coinciden con la búsqueda.
 */
export const filtrarHistorial = (historial, filtros) =>
  // Iteramos sobre el array usando .filter() para evaluar cada elemento (h)
  historial.filter((h) =>
    // Utilizamos una función auxiliar reutilizable para verificar si el texto buscado
    // coincide con alguno de los campos clave del registro
    coincideTexto(filtros.busqueda, [
      h.compra?.numero_compra, // Número de la compra asociada (usando encadenamiento opcional ? por seguridad)
      h.motivo, // Motivo de la operación
      h.tipo_operacion, // Tipo de operación realizada
      h.usuario?.nombre_completo, // Nombre completo del usuario que realizó la acción
      h.usuario?.nombre_usuario, // Username del usuario
    ])
  );
