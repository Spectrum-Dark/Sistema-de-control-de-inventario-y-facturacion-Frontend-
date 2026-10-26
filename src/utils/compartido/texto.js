/**
 * Función utilitaria para normalizar texto.
 * Es ideal para búsquedas, filtros o comparaciones insensibles a mayúsculas, acentos o espacios extras.
 *
 * @param {any} valor - El valor de entrada que se desea normalizar (puede ser string, número, null, undefined).
 * @returns {string} El texto normalizado en minúsculas, sin acentos y sin espacios en los extremos.
 */
export const normalizarTexto = (valor) =>
  // 1. Asegura que el valor sea un string. Si es null o undefined, usa una cadena vacía ("")
  String(valor ?? '')
    // 2. Descompone los caracteres con tilde en dos partes: la letra base y el acento separado (Normalización Unicode NFD)
    .normalize('NFD')
    // 3. Utiliza una expresión regular para eliminar todos los caracteres diacríticos (las tildes y marcas de acentuación)
    .replace(/[\u0300-\u036f]/g, '')
    // 4. Convierte todo el texto a minúsculas para evitar problemas de sensibilidad de mayúsculas (case-insensitive)
    .toLowerCase()
    // 5. Elimina los espacios en blanco sobrantes al principio y al final del texto
    .trim();
