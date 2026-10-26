import { coincideTexto } from '../compartido/filtros';

/**
 * Objeto que define el estado inicial de los filtros.
 * Es útil para inicializar estados en React (useState) o para resetear
 * los filtros a sus valores por defecto de forma limpia.
 */
export const FILTROS_INICIALES = { busqueda: '', estado: '' };

/**
 * Función pura encargada de filtrar la lista de clientes.
 * Recibe el array completo de clientes y el objeto de filtros actual.
 * Al ser una función pura, no modifica el estado original y facilita las pruebas unitarias.
 */
export const filtrarClientes = (clientes, filtros) =>
  clientes.filter(
    (c) =>
      // 1. Filtro de búsqueda por texto:
      // Utiliza una función auxiliar compartida para verificar si el texto ingresado
      // coincide con cualquiera de los campos principales del cliente (nombre, identificación, etc.),
      // aplicando el principio DRY (Don't Repeat Yourself).
      coincideTexto(filtros.busqueda, [
        c.nombre_cliente,
        c.identificacion,
        c.telefono,
        c.correo,
        c.direccion,
      ]) &&
      // 2. Filtro por estado:
      // Si '!filtros.estado' es verdadero (está vacío o no seleccionado), la condición se evalúa como true
      // y no filtra por estado. Si tiene un valor, exige que el estado del cliente coincida exactamente.
      (!filtros.estado || c.estado === filtros.estado)
  );
