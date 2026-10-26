/**
 * Función auxiliar para asegurar que un número tenga al menos dos dígitos,
 * rellenando con un "0" a la izquierda si es necesario (ej: 5 -> "05").
 * @param {number|string} numero - El número a formatear.
 * @returns {string} El número en formato de al menos dos caracteres.
 */
const dos = (numero) => String(numero).padStart(2, '0');

/**
 * Formatea una fecha y hora (en formato ISO o string SQL "YYYY-MM-DD HH:mm:ss")
 * para mostrarla de forma legible en la zona horaria local del usuario.
 *
 * @param {string|Date} valor - El valor de fecha/hora recibido.
 * @param {Object} [opciones] - Opciones de configuración.
 * @param {boolean} [opciones.hora12=false] - Define si se usa formato de 12 horas (AM/PM) o 24 horas.
 * @returns {string} La fecha formateada o "—" si el valor no es válido.
 */
export function formatearFechaHora(valor, { hora12 = false } = {}) {
  // Si no hay valor, retornamos un guion largo como representación visual vacía.
  if (!valor) return '—';

  const texto = String(valor);
  // Normalizamos el string para asegurar que sea compatible con el constructor Date (reemplazando espacio por 'T').
  const fecha = new Date(texto.includes('T') ? texto : texto.replace(' ', 'T'));

  // Validamos si la fecha resultante es válida (evita errores de tipo Invalid Date).
  if (Number.isNaN(fecha.getTime())) return '—';

  // Utilizamos la API nativa toLocaleString para formatear según el idioma español ("es")
  // aplicando los estándares configurados (día de 2 dígitos, mes abreviado, año, etc.).
  return fecha.toLocaleString('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: hora12,
  });
}

/**
 * Adapta una fecha del backend al formato requerido por un <input type="datetime-local"> ("YYYY-MM-DDTHH:mm").
 * Corta el string a 19 caracteres para eliminar los milisegundos o zonas horarias sobrantes si los hubiera.
 *
 * @param {string} valor - Fecha en formato string proveniente de la base de datos/backend.
 * @returns {string} Fecha adaptada para el input o string vacío si no hay valor.
 */
export const aInputFechaHora = (valor) =>
  valor ? String(valor).replace(' ', 'T').slice(0, 19) : '';

/**
 * Obtiene la fecha y hora actuales formateadas exactamente como lo exige
 * un elemento <input type="datetime-local"> en formato local ("YYYY-MM-DDTHH:mm:ss").
 * Utiliza la función auxiliar 'dos' para garantizar los ceros a la izquierda.
 *
 * @returns {string} Fecha y hora actual formateada.
 */
export function ahoraParaInput() {
  const f = new Date();
  return `${f.getFullYear()}-${dos(f.getMonth() + 1)}-${dos(f.getDate())}T${dos(
    f.getHours()
  )}:${dos(f.getMinutes())}:${dos(f.getSeconds())}`;
}

/**
 * Transforma el valor extraído de un <input type="datetime-local">
 * al formato estándar aceptado por el backend ("YYYY-MM-DD HH:mm:ss").
 * Añade los segundos si el input solo retorna hasta los minutos (longitud 16).
 *
 * @param {string} valor - Valor obtenido del input HTML.
 * @returns {string} Fecha formateada lista para enviar al servidor o string vacío.
 */
export function deInputAFechaHora(valor) {
  if (!valor) return '';
  const texto = valor.replace('T', ' ');
  return texto.length === 16 ? `${texto}:00` : texto;
}
