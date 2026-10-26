import { coincideTexto } from '../compartido/filtros';

// Estado inicial para los filtros de compras:
// por defecto la búsqueda de texto está vacía y no hay filtro de estado seleccionado.
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura para filtrar el listado de compras según los criterios especificados.
 * @param {Array} compras - Lista completa de compras a filtrar.
 * @param {Object} filtros - Objeto que contiene los criterios actuales (busqueda y estado).
 * @returns {Array} - Nueva lista filtrada que cumple con ambas condiciones.
 */
export const filtrarCompras = (compras, filtros) =>
  compras.filter(
    (c) =>
      // Condición 1: Filtro de texto (búsqueda general).
      // Utiliza una función auxiliar 'coincideTexto' para buscar el término ingresado
      // en múltiples campos de la compra y de sus relaciones (proveedor, usuario, detalles/productos).
      coincideTexto(filtros.busqueda, [
        c.numero_compra,
        c.proveedor?.nombre_proveedor,
        c.usuario?.nombre_completo,
        c.usuario?.nombre_usuario,
        c.observaciones,
        // Usamos optional chaining y flatMap para aplanar y buscar de forma segura
        // dentro de los productos que forman parte de los detalles de la compra.
        ...(c.detalles ?? []).flatMap((d) => [
          d.producto?.codigo_producto,
          d.producto?.nombre_producto,
        ]),
      ]) &&
      // Condición 2: Filtro por estado.
      // Si el filtro de estado está vacío (!filtros.estado), la condición se omite (pasan todos).
      // Si tiene un valor, comprueba que el estado de la compra coincida exactamente.
      (!filtros.estado || c.estado === filtros.estado)
  );
