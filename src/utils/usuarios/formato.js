// Función exportada que recibe un valor (fecha en formato string, objeto, etc.) para darle formato legible
export const formatearFecha = (valor) => {
  // Validación temprana: si el valor es nulo, indefinido o vacío, retorna un guion largo como indicador visual por defecto
  if (!valor) return '—';

  // Conversión segura del valor a string y reemplazo del espacio por "T" para asegurar compatibilidad con el estándar ISO 8601 (necesario en algunos navegadores)
  const fecha = new Date(String(valor).replace(' ', 'T'));

  // Validación de fecha inválida: si el resultado de getTime() no es un número (NaN), retorna el indicador por defecto
  if (Number.isNaN(fecha.getTime())) return '—';

  // Formateo de la fecha utilizando la API internacional de JavaScript (Intl) bajo la localización en español ("es")
  return fecha.toLocaleDateString('es', {
    day: '2-digit', // Día representado con dos dígitos (ej. 05)
    month: 'short', // Mes abreviado en texto (ej. oct)
    year: 'numeric', // Año en formato numérico completo (ej. 2026)
  });
};
