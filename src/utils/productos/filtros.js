import { coincideTexto } from '../compartido/filtros';

// Objeto que define el estado inicial de los filtros.
// Se inicializan vacíos para que al arrancar la vista no se aplique ningún filtro restrictivo.
export const FILTROS_INICIALES = { busqueda: '', categoria: '', estado: '' };

/**
 * Función pura encargada de filtrar un listado de productos según los criterios especificados.
 * @param {Array} productos - Listado completo de productos a filtrar.
 * @param {Object} filtros - Objeto con los valores actuales de búsqueda, categoría y estado.
 * @param {Object} nombresCategorias - Diccionario o mapa que relaciona el ID de la categoría con su nombre legible.
 * @returns {Array} - Nuevo array con los productos que cumplen todas las condiciones.
 */
export const filtrarProductos = (productos, filtros, nombresCategorias) =>
  productos.filter(
    (p) =>
      // 1. Filtro de búsqueda por texto: comprueba si el texto ingresado
      // coincide con alguno de los campos del producto (código, nombre, descripción)
      // o incluso con el nombre de su categoría correspondiente usando un diccionario.
      coincideTexto(filtros.busqueda, [
        p.codigo_producto,
        p.nombre_producto,
        p.descripcion,
        nombresCategorias[p.id_categoria],
      ]) &&
      // 2. Filtro por categoría: si se seleccionó una categoría (no está vacía),
      // compara el ID del producto convirtiéndolo a cadena para asegurar una comparación estricta y segura.
      (!filtros.categoria || String(p.id_categoria) === filtros.categoria) &&
      // 3. Filtro por estado: si hay un estado seleccionado,
      // verifica que el estado del producto coincida exactamente con él.
      (!filtros.estado || p.estado === filtros.estado)
  );
