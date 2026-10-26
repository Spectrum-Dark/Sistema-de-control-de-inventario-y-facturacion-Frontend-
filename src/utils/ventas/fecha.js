// Función auxiliar que asegura un formato de dos dígitos añadiendo un cero a la izquierda si es necesario
const dos = (numero) => String(numero).padStart(2, '0');

// Las fechas de venta se guardan en UTC; el formulario trabaja en la hora local del usuario.
export function aInputFechaVenta(valor) {
  // Retorna una cadena vacía si no se proporciona ningún valor
  if (!valor) return '';
  const texto = String(valor);
  // Estandariza el formato reemplazando espacios por 'T' para asegurar compatibilidad con el constructor de Date
  const fecha = new Date(texto.includes('T') ? texto : texto.replace(' ', 'T'));
  // Valida si la fecha resultante es inválida y retorna cadena vacía en ese caso
  if (Number.isNaN(fecha.getTime())) return '';

  // Retorna la fecha desglosada en componentes de hora local con formato ISO (YYYY-MM-DDTHH:mm:ss) requerido por el input datetime-local
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(
    fecha.getDate()
  )}T${dos(fecha.getHours())}:${dos(fecha.getMinutes())}:${dos(
    fecha.getSeconds()
  )}`;
}

// Convierte la hora local del input al valor UTC que espera el backend.
export function deInputFechaVentaAUTC(valor) {
  // Retorna una cadena vacía si no hay valor en el input
  if (!valor) return '';
  // Instancia un objeto Date interpretando la fecha del input según la zona horaria local del navegador
  const fecha = new Date(valor);
  // Valida si la fecha es inválida
  if (Number.isNaN(fecha.getTime())) return '';
  // Convierte a formato ISO UTC, recorta a 19 caracteres para eliminar milisegundos/zona y reemplaza la 'T' por un espacio para el backend
  return fecha.toISOString().slice(0, 19).replace('T', ' ');
}
