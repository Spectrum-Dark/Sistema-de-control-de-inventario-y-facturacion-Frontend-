import { coincideTexto } from '../compartido/filtros';

// Objeto que define el estado inicial de los filtros (vacíos por defecto)
export const FILTROS_INICIALES = { busqueda: '', marca: '' };

/**
 * Función pura que filtra el listado de compatibilidades.
 * Recibe el array completo de filas y el objeto con los criterios de filtrado actuales.
 * Nota: Las filas llegan previamente enriquecidas con datos de producto, modelo y marca desde la página.
 */
export const filtrarCompatibilidades = (filas, filtros) =>
  filas.filter(
    (c) =>
      // 1. Filtro de búsqueda por texto: utiliza una función auxiliar compartida
      // para buscar de forma flexible en múltiples propiedades relacionadas usando optional chaining (?.)
      // para evitar errores si alguna propiedad es null o undefined.
      coincideTexto(filtros.busqueda, [
        c.producto?.codigo_producto,
        c.producto?.nombre_producto,
        c.modelo?.nombre_modelo,
        c.nombre_marca,
        c.observaciones,
      ]) &&
      // 2. Filtro por marca: si no hay marca seleccionada pasa de largo (!filtros.marca),
      // de lo contrario, compara el ID de la marca del modelo con el filtro seleccionado
      // convirtiéndolo a String para evitar problemas de tipos (ej. number vs string).
      (!filtros.marca || String(c.modelo?.id_marca) === filtros.marca)
  );
