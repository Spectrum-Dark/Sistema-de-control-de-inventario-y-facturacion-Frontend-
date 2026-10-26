import { normalizarTexto } from './texto';

/**
 * Verifica si existe al menos un filtro con un valor activo (no vacío).
 * @param {Object} filtros - Objeto que contiene los distintos filtros aplicados.
 * @returns {boolean} - True si hay al menos un filtro con contenido real, false en caso contrario.
 */
export const hayFiltrosActivos = (filtros) =>
  // Extrae los valores del objeto, los convierte a string, elimina espacios
  // en blanco y comprueba si al menos uno no está vacío.
  Object.values(filtros).some((valor) => String(valor).trim() !== '');

/**
 * Valida si el texto de búsqueda coincide con alguno de los campos provistos,
 * ignorando mayúsculas, minúsculas y tildes gracias a la normalización.
 * @param {string} busqueda - Texto introducido por el usuario en la barra de búsqueda.
 * @param {Array<string>} campos - Colección de campos/propiedades donde se evaluará la coincidencia.
 * @returns {boolean} - True si la búsqueda está vacía o si algún campo contiene el texto buscado.
 */
export const coincideTexto = (busqueda, campos) => {
  // Normalizamos el término de búsqueda una sola vez para optimizar.
  const texto = normalizarTexto(busqueda);

  return (
    // Cortocircuito: si no hay texto de búsqueda, devuelve true de inmediato (muestra todo).
    !texto ||
    // Si hay texto, verifica si alguno de los campos normalizados incluye la búsqueda.
    campos.some((campo) => normalizarTexto(campo).includes(texto))
  );
};
