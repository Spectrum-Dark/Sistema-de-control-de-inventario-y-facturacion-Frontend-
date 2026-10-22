export const TASA_IVA = 0.15;

const redondear = (numero) => Math.round((numero + Number.EPSILON) * 100) / 100;

export const subtotalDetalle = (cantidad, precio) =>
  redondear(Number(cantidad) * Number(precio));

export function calcularTotales(filas) {
  const subtotal = redondear(
    filas.reduce(
      (suma, f) => suma + subtotalDetalle(f.cantidad, f.precio_unitario),
      0
    )
  );
  const impuesto = redondear(subtotal * TASA_IVA);

  return { subtotal, impuesto, total: redondear(subtotal + impuesto) };
}