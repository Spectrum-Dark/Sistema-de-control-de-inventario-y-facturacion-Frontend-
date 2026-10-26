import { formatearFechaHora } from '../compartido/fecha';
import { formatearPrecio } from '../productos/formato';

// Objeto constante que define el estado inicial por defecto para los filtros de búsqueda y filtrado por estado.
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura encargada de filtrar un arreglo de facturas según los criterios de búsqueda y estado.
 * @param {Array} facturas - Lista completa de facturas a filtrar.
 * @param {Object} filtros - Objeto con los valores actuales de filtrado (busqueda y estado).
 * @returns {Array} - Nueva lista con las facturas que coinciden con los criterios.
 */
export function filtrarFacturas(facturas, filtros) {
  // Limpiamos los espacios en blanco del término de búsqueda y lo convertimos a minúsculas para hacer una búsqueda case-insensitive.
  const consulta = filtros.busqueda.trim().toLocaleLowerCase();

  return facturas.filter((factura) => {
    // Comprobamos si el texto de búsqueda coincide con alguno de los campos clave de la factura o sus relaciones (venta, cliente).
    // Usamos encadenamiento opcional (?.) para evitar errores si alguna propiedad anidada (como venta o cliente) es null/undefined.
    const coincideConsulta =
      !consulta ||
      [
        factura.numero_factura,
        factura.venta?.numero_venta,
        factura.venta?.cliente?.nombre_cliente,
        factura.venta?.cliente?.identificacion,
      ].some((valor) =>
        String(valor ?? '')
          .toLocaleLowerCase()
          .includes(consulta)
      );

    // Retorna true solo si cumple ambos criterios: coincide con el texto de búsqueda
    // y coincide con el estado seleccionado (o si no hay ningún estado seleccionado).
    return (
      coincideConsulta && (!filtros.estado || factura.estado === filtros.estado)
    );
  });
}

/**
 * Formatea una fecha de factura utilizando una función auxiliar compartida.
 * Si la fecha no existe o es nula, devuelve un guion largo ("—") como valor por defecto.
 */
export const fechaFactura = (fecha) =>
  fecha ? formatearFechaHora(fecha, { hora12: true }) : '—';

/**
 * Formatea un valor numérico a precio utilizando una función auxiliar externa.
 * Si el valor es nulo o indefinido, previene errores pasando 0 por defecto.
 */
export const precioFactura = (valor) => formatearPrecio(valor ?? 0);
