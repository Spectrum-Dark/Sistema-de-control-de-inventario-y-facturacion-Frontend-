export const formatearPrecio = (valor) =>
  Number(valor ?? 0).toLocaleString("es", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Stock bajo: solo si se definió una mínima mayor a 0
export const tieneStockBajo = (producto) =>
  Number(producto.existencia_minima) > 0 &&
  Number(producto.existencia) <= Number(producto.existencia_minima);