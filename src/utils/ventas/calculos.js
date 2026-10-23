const redondear = (numero) => Math.round((numero + Number.EPSILON) * 100) / 100;

export const TASA_IVA = 0.15;

export const subtotalDetalle = (cantidad, precio) =>
  redondear(Number(cantidad) * Number(precio));

export function calcularTotales(filas) {
  const subtotal = redondear(
    filas.reduce(
      (suma, fila) => suma + subtotalDetalle(fila.cantidad, fila.precio_unitario),
      0,
    ),
  );
  const impuesto = redondear(subtotal * TASA_IVA);
  return { subtotal, impuesto, total: redondear(subtotal + impuesto) };
}
