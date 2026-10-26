import { coincideTexto } from '../compartido/filtros';

/**
 * Estado inicial de los filtros. Se utiliza para inicializar los estados
 * del componente o para restablecer los filtros a sus valores por defecto.
 */
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura que filtra el listado de proveedores basándose en múltiples criterios
 * (búsqueda de texto generalizada y filtrado exacto por estado).
 *
 * @param {Array} proveedores - Lista completa de proveedores a filtrar.
 * @param {Object} filtros - Objeto que contiene los criterios actuales (busqueda, estado).
 * @returns {Array} - Nueva lista con los proveedores que cumplen las condiciones.
 */
export const filtrarProveedores = (proveedores, filtros) =>
  proveedores.filter(
    (p) =>
      // 1. Filtro de búsqueda por texto: utiliza una utilidad compartida para buscar
      // la cadena en múltiples campos del proveedor (nombre, identificación, teléfono, etc.).
      coincideTexto(filtros.busqueda, [
        p.nombre_proveedor,
        p.identificacion,
        p.telefono,
        p.correo,
        p.direccion,
      ]) &&
      // 2. Filtro por estado: utiliza evaluación de cortocircuito.
      // Si no hay estado seleccionado (!filtros.estado), la condición pasa por defecto;
      // si hay un estado, evalúa que coincida exactamente con el del proveedor.
      (!filtros.estado || p.estado === filtros.estado)
  );
