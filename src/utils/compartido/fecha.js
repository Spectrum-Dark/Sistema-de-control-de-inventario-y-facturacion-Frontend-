const dos = (numero) => String(numero).padStart(2, "0");

// Acepta "2026-10-20 15:30:00" o formato ISO y lo muestra en hora local
export function formatearFechaHora(valor) {
  if (!valor) return "—";

  const texto = String(valor);
  const fecha = new Date(texto.includes("T") ? texto : texto.replace(" ", "T"));
  if (Number.isNaN(fecha.getTime())) return "—";

  return fecha.toLocaleString("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const aInputFechaHora = (valor) =>
  valor ? String(valor).replace(" ", "T").slice(0, 19) : "";

// Fecha y hora actuales para <input type="datetime-local">
export function ahoraParaInput() {
  const f = new Date();
  return `${f.getFullYear()}-${dos(f.getMonth() + 1)}-${dos(f.getDate())}T${dos(
    f.getHours(),
  )}:${dos(f.getMinutes())}:${dos(f.getSeconds())}`;
}

//(formato que acepta el backend)
export function deInputAFechaHora(valor) {
  if (!valor) return "";
  const texto = valor.replace("T", " ");
  return texto.length === 16 ? `${texto}:00` : texto;
}
