/**
 * Convierte un valor a número o a null.
 * Útil para limpiar datos de formularios (inputs vacíos) antes de enviarlos a la API.
 *
 * @param {any} valor - El valor a evaluar (puede ser string, null, undefined, etc.)
 * @returns {number|null} - Retorna null si está vacío, o el número convertido.
 */
export const aNumeroONull = (valor) =>
  // Si el valor es una cadena vacía, null o undefined, normalizamos a null.
  valor === '' || valor === null || valor === undefined ? null : Number(valor);

/**
 * Compara un objeto de valores actuales con un objeto original y
 * extrae únicamente los campos que han sufrido modificaciones.
 * Muy útil para optimizar peticiones PATCH (enviar solo lo que cambió al backend).
 *
 * @param {Object} valores - Objeto con los valores actuales (ej. estado del formulario).
 * @param {Object} original - Objeto con los valores iniciales o de la base de datos.
 * @returns {Object} - Un nuevo objeto que contiene solo las propiedades que cambiaron.
 */
export const obtenerCambios = (valores, original) =>
  // 1. Convertimos el objeto en un array de pares [clave, valor] con Object.entries()
  // 2. Filtramos quedándonos solo con los campos cuyo valor sea diferente al original
  // 3. Reconstruimos el objeto resultante con Object.fromEntries()
  Object.fromEntries(
    Object.entries(valores).filter(
      ([campo, valor]) => valor !== original[campo]
    )
  );
