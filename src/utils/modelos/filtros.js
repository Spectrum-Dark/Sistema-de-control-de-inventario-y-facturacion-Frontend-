import { coincideTexto } from '../compartido/filtros';

/**
 * Objeto que define el estado inicial de los filtros.
 * Se utiliza para inicializar formularios o estados de React (como useState).
 */
export const FILTROS_INICIALES = { busqueda: '', marca: '', estado: '' };

/**
 * Función pura que filtra un array de modelos de vehículos según múltiples criterios.
 *
 * @param {Array} modelos - Lista de modelos a filtrar.
 * @param {Object} filtros - Objeto con los criterios actuales (busqueda, marca, estado).
 * @param {Object} nombresMarcas - Diccionario/mapa para relacionar el ID de la marca con su nombre (ej: { 1: "Toyota" }).
 * @returns {Array} - Nueva lista con los modelos que cumplen todos los filtros.
 */
export const filtrarModelos = (modelos, filtros, nombresMarcas) =>
  modelos.filter(
    (m) =>
      // 1. Filtro de búsqueda por texto general:
      // Utiliza una función auxiliar para comprobar si el texto de búsqueda coincide
      // con el nombre del modelo, su descripción o el nombre de su marca correspondiente.
      coincideTexto(filtros.busqueda, [
        m.nombre_modelo,
        m.descripcion,
        nombresMarcas[m.id_marca],
      ]) &&
      // 2. Filtro específico por marca:
      // Si no hay filtro de marca seleccionado (!filtros.marca), pasa por defecto.
      // Si hay marca seleccionada, compara convirtiendo el ID a String para evitar problemas de tipos.
      (!filtros.marca || String(m.id_marca) === filtros.marca) &&
      // 3. Filtro específico por estado:
      // Si no hay estado seleccionado, pasa por defecto.
      // De lo contrario, evalúa que coincida exactamente con el estado del modelo.
      (!filtros.estado || m.estado === filtros.estado)
  );
