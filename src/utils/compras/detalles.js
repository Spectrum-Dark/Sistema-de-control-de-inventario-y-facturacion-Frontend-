export const FILA_VACIA = { id_producto: "", cantidad: "1", precio_unitario: "" };

// Convierte los detalles que devuelve el backend en filas del formulario
export const filasDesdeDetalles = (detalles = []) =>
  detalles.map((d) => ({
    id_producto: String(d.id_producto),
    cantidad: String(d.cantidad),
    precio_unitario: String(Number(d.precio_unitario)),
  }));

export const filaCompleta = (fila) =>
  fila.id_producto !== "" &&
  Number.isInteger(Number(fila.cantidad)) &&
  Number(fila.cantidad) >= 1 &&
  fila.precio_unitario !== "" &&
  Number(fila.precio_unitario) >= 0;

// Convierte las filas al formato que espera el backend
export const filasAPayload = (filas) =>
  filas.map((f) => ({
    id_producto: Number(f.id_producto),
    cantidad: Number(f.cantidad),
    precio_unitario: Number(f.precio_unitario),
  }));

// Texto para comparar dos listas de detalles sin importar el orden
export const firmaDetalles = (detalles) =>
  JSON.stringify(
    detalles
      .map((d) => ({
        id_producto: Number(d.id_producto),
        cantidad: Number(d.cantidad),
        precio_unitario: Number(d.precio_unitario),
      }))
      .sort((a, b) => a.id_producto - b.id_producto)
  );