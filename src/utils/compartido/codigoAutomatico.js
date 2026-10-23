export function generarCodigoAutomatico(registros, campo, prefijo) {
  const expresion = new RegExp(`^${prefijo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\d+)$`);
  const mayorNumero = (registros ?? []).reduce((mayor, registro) => {
    const coincidencia = String(registro?.[campo] ?? "").match(expresion);
    return coincidencia ? Math.max(mayor, Number(coincidencia[1])) : mayor;
  }, 0);

  return `${prefijo}${String(mayorNumero + 1).padStart(3, "0")}`;
}
