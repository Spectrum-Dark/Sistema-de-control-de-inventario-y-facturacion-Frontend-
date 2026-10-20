export function formatearAnios(inicio, fin) {
  if (inicio && fin) return `${inicio} – ${fin}`;
  if (inicio) return `Desde ${inicio}`;
  if (fin) return `Hasta ${fin}`;
  return "—";
}