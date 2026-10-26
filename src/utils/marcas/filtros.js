import { coincideTexto } from '../compartido/filtros';

// Definimos los valores iniciales para los filtros de marcas (búsqueda por texto y filtro por estado).
// Esto ayuda a mantener un estado limpio y predecible en la interfaz o en el formulario de búsqueda.
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura que filtra un array de marcas en base a los criterios seleccionados.
 * @param {Array} marcas - Listado completo de marcas a filtrar.
 * @param {Object} filtros - Objeto con los criterios actuales (busqueda, estado).
 * @returns {Array} - Nuevo array con las marcas que cumplen las condiciones.
 */
export const filtrarMarcas = (marcas, filtros) =>
  marcas.filter(
    (m) =>
      // 1. Filtro de búsqueda por texto: utiliza una utilidad compartida para buscar
      // coincidencias tanto en el nombre como en la descripción de la marca.
      coincideTexto(filtros.busqueda, [m.nombre_marca, m.descripcion]) &&
      // 2. Filtro por estado: evalúa si no se ha seleccionado ningún estado (!filtros.estado)
      // o si el estado de la marca coincide exactamente con el filtro activo.
      (!filtros.estado || m.estado === filtros.estado)
  );
