// Precio en córdobas nicaragüenses
export const formatearPrecio = (valor) =>
  `C$ ${Number(valor ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// Stock bajo: solo si se definió una mínima mayor a 0
export const tieneStockBajo = (producto) =>
  Number(producto.existencia_minima) > 0 &&
  Number(producto.existencia) <= Number(producto.existencia_minima);