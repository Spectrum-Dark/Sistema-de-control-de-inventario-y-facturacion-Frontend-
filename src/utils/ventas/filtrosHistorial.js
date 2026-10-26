// Importación de la función auxiliar reutilizable para evaluar coincidencias de texto en los filtros
import { coincideTexto } from '../compartido/filtros';

// Objeto de estado inicial para los filtros, estableciendo un campo de búsqueda vacío por defecto
export const FILTROS_INICIALES = { busqueda: '' };

// Función pura de filtrado que recibe el historial completo y los criterios de filtros aplicados
export const filtrarHistorial = (historial, filtros) =>
  // Aplica el método .filter() sobre el array de registros para conservar únicamente los que coincidan
  historial.filter((registro) =>
    // Valida si el texto de búsqueda coincide con alguno de los campos clave del registro actual
    coincideTexto(filtros.busqueda, [
      // Número de venta asociado, utilizando encadenamiento opcional (?.) para evitar errores si la relación es nula
      registro.venta?.numero_venta,
      // Motivo del registro en el historial
      registro.motivo,
      // Tipo de operación realizada
      registro.tipo_operacion,
      // Nombre completo del usuario que realizó la acción, con manejo seguro de nulos
      registro.usuario?.nombre_completo,
      // Nombre de usuario (username) del responsable, con manejo seguro de nulos
      registro.usuario?.nombre_usuario,
    ])
  );
