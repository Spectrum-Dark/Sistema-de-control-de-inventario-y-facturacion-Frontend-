// Función auxiliar para redondear un número a exactamente dos cifras decimales
// utilizando Number.EPSILON para mitigar los problemas de precisión en punto flotante de JavaScript
const redondear = (numero) => Math.round((numero + Number.EPSILON) * 100) / 100;

// Constante exportada que define la Tasa de IVA estándar aplicable (15%)
export const TASA_IVA = 0.15;

// Función exportada que calcula el subtotal de una línea de detalle asegurando
// la conversión explícita a número y aplicando el redondeo financiero
export const subtotalDetalle = (cantidad, precio) =>
  redondear(Number(cantidad) * Number(precio));

// Función exportada que calcula los totales globales a partir de un arreglo de filas de detalle
export function calcularTotales(filas) {
  // Acumula la suma de los subtotales de cada fila usando reduce y redondea el resultado final
  const subtotal = redondear(
    filas.reduce(
      (suma, fila) =>
        suma + subtotalDetalle(fila.cantidad, fila.precio_unitario),
      0
    )
  );

  // Calcula el impuesto multiplicando el subtotal acumulado por la tasa de IVA y lo redondea
  const impuesto = redondear(subtotal * TASA_IVA);

  // Retorna un objeto con los tres valores fiscales clave: subtotal, impuesto y el total general redondeados
  return { subtotal, impuesto, total: redondear(subtotal + impuesto) };
}
