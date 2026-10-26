/**
 * Formatea un rango de años (o fechas) para mostrar en la interfaz.
 * Maneja los diferentes escenarios según la presencia de los parámetros de inicio y fin.
 *
 * @param {number|string|null|undefined} inicio - Año inicial.
 * @param {number|string|null|undefined} fin - Año final.
 * @returns {string} Texto formateado con el rango de años correspondiente.
 */
export function formatearAnios(inicio, fin) {
  // Caso 1: Ambos valores existen -> Devuelve el rango completo (ej: "2020 – 2024")
  if (inicio && fin) return `${inicio} – ${fin}`;

  // Caso 2: Solo existe la fecha de inicio -> Indica un periodo abierto (ej: "Desde 2020")
  if (inicio) return `Desde ${inicio}`;

  // Caso 3: Solo existe la fecha de fin -> Indica un periodo límite (ej: "Hasta 2024")
  if (fin) return `Hasta ${fin}`;

  // Caso 4: Ninguno de los valores está presente -> Devuelve un guión o indicador nulo (ej: "—")
  return '—';
}
