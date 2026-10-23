const dos = (numero) => String(numero).padStart(2, "0");

// Las fechas de venta se guardan en UTC; el formulario trabaja en la hora local del usuario.
export function aInputFechaVenta(valor) {
  if (!valor) return "";
  const texto = String(valor);
  const fecha = new Date(texto.includes("T") ? texto : texto.replace(" ", "T"));
  if (Number.isNaN(fecha.getTime())) return "";

  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(
    fecha.getDate(),
  )}T${dos(fecha.getHours())}:${dos(fecha.getMinutes())}:${dos(
    fecha.getSeconds(),
  )}`;
}

// Convierte la hora local del input al valor UTC que espera el backend.
export function deInputFechaVentaAUTC(valor) {
  if (!valor) return "";
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toISOString().slice(0, 19).replace("T", " ");
}
