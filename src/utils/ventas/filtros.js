// Importación de la función auxiliar reutilizable para evaluar coincidencias de texto en múltiples campos
import { coincideTexto } from '../compartido/filtros';

// Objeto constante que define el estado inicial por defecto para los filtros de búsqueda y estado
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

// Función pura que toma una lista de ventas y un objeto de filtros, devolviendo las ventas filtradas
export const filtrarVentas = (ventas, filtros) =>
  ventas.filter(
    (v) =>
      // Evalúa si el texto de búsqueda coincide con alguno de los campos clave de la venta o sus detalles
      coincideTexto(filtros.busqueda, [
        v.numero_venta, // Número identificador de la venta
        v.cliente?.nombre_cliente, // Nombre del cliente (usando encadenamiento opcional por seguridad)
        v.cliente?.identificacion, // Identificación del cliente
        v.usuario?.nombre_completo, // Nombre completo del usuario/vendedor
        v.usuario?.nombre_usuario, // Nombre de usuario del vendedor
        v.observaciones, // Notas u observaciones registradas en la venta
        // Aplanamiento de los detalles de la venta para permitir buscar también por los productos asociados
        ...(v.detalles ?? []).flatMap((d) => [
          d.producto?.codigo_producto, // Código único del producto en el detalle
          d.producto?.nombre_producto, // Nombre del producto en el detalle
        ]),
      ]) &&
      // Filtra de manera condicional por estado: si no se especifica estado pasa el filtro, de lo contrario debe coincidir exactamente
      (!filtros.estado || v.estado === filtros.estado)
  );
