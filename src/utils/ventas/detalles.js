export const FILA_VACIA = { id_producto: "", cantidad: "1", precio_unitario: "" };

export const filasDesdeDetalles = (detalles = []) =>
  detalles.map((detalle) => ({
    id_producto: String(detalle.id_producto),
    cantidad: String(detalle.cantidad),
    precio_unitario: String(Number(detalle.precio_unitario)),
  }));

export const filaCompleta = (fila) =>
  fila.id_producto !== "" &&
  Number.isInteger(Number(fila.cantidad)) &&
  Number(fila.cantidad) >= 1 &&
  fila.precio_unitario !== "" &&
  Number.isFinite(Number(fila.precio_unitario)) &&
  Number(fila.precio_unitario) >= 0;

export const filasAPayload = (filas) =>
  filas.map((fila) => ({
    id_producto: Number(fila.id_producto),
    cantidad: Number(fila.cantidad),
    precio_unitario: Number(fila.precio_unitario),
  }));

