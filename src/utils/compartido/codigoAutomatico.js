/**
 * Genera un código correlativo automático basado en los registros existentes.
 *
 * @param {Array} registros - Lista de objetos donde se buscarán los códigos existentes.
 * @param {string} campo - Nombre de la propiedad del objeto que contiene el código.
 * @param {string} prefijo - Prefijo fijo que llevará el código (ej. "CLI", "FAC").
 * @returns {string} El siguiente código generado (ej. "CLI001").
 */
export function generarCodigoAutomatico(registros, campo, prefijo) {
  // 1. CREACIÓN DINÁMICA DE LA EXPRESIÓN REGULAR (Regex)
  // - prefijo.replace(...) escapa caracteres especiales por seguridad (ej. si el prefijo tuviera puntos o asteriscos).
  // - ^ y $ aseguran que coincida exactamente desde el inicio hasta el fin.
  // - (\d+) captura uno o más dígitos al final del string (el número correlativo).
  const expresion = new RegExp(
    `^${prefijo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+)$`
  );

  // 2. BÚSQUEDA DEL NÚMERO MÁS ALTO (Reduce)
  // - (registros ?? []) usa el operador de fusión nula para evitar errores si 'registros' es null o undefined.
  // - .reduce recorre el arreglo acumulando el valor numérico mayor encontrado (inicia en 0).
  const mayorNumero = (registros ?? []).reduce((mayor, registro) => {
    // Obtenemos el valor del campo de forma segura con optional chaining (?.) y lo convertimos a String.
    // Aplicamos .match() usando la Regex para verificar si cumple el patrón y extraer el número.
    const coincidencia = String(registro?.[campo] ?? '').match(expresion);

    // Si hay coincidencia, convertimos el grupo capturado (\d+) a número y nos quedamos con el mayor.
    // Si no hay coincidencia, devolvemos el valor 'mayor' acumulado hasta el momento.
    return coincidencia ? Math.max(mayor, Number(coincidencia[1])) : mayor;
  }, 0);

  // 3. CONSTRUCCIÓN Y RETORNO DEL NUEVO CÓDIGO
  // - Al mayor número encontrado le sumamos 1.
  // - .padStart(3, "0") asegura que el número tenga un formato de 3 dígitos rellenando con ceros a la izquierda (ej: 5 -> "005").
  // - Retornamos la concatenación del prefijo con el número formateado.
  return `${prefijo}${String(mayorNumero + 1).padStart(3, '0')}`;
}
