export const formatearFecha = (valor) => {
  if (!valor) return "—";
  const fecha = new Date(String(valor).replace(" ", "T"));
  if (Number.isNaN(fecha.getTime())) return "—";
  return fecha.toLocaleDateString("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};