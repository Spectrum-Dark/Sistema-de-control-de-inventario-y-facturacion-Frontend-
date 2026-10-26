import { coincideTexto } from '../compartido/filtros';

/**
 * Estado inicial por defecto para los filtros de categorías.
 * Útil para inicializar estados (por ejemplo, en un useState de React)
 * o para restablecer los filtros a su valor vacío original.
 */
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura encargada de filtrar un array de categorías según los criterios especificados.
 *
 * @param {Array} categorias - Listado completo de categorías a filtrar.
 * @param {Object} filtros - Objeto que contiene los criterios de filtrado (busqueda y estado).
 * @returns {Array} - Subconjunto de categorías que cumplen con las condiciones.
 */
export const filtrarCategorias = (categorias, filtros) =>
  categorias.filter(
    (c) =>
      // 1. Filtro de búsqueda textual: reutiliza un helper genérico para buscar
      // la cadena de texto en múltiples campos (nombre y descripción de la categoría).
      coincideTexto(filtros.busqueda, [c.nombre_categoria, c.descripcion]) &&
      // 2. Filtro por estado: si no se especifica un estado (está vacío), pasa por defecto;
      // si se especifica, evalúa que coincida exactamente con el estado de la categoría.
      (!filtros.estado || c.estado === filtros.estado)
  );
