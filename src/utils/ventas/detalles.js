// Objeto constante que representa una fila vacía por defecto para formularios o tablas de detalle
export const FILA_VACIA = {
  id_producto: '',
  cantidad: '1',
  precio_unitario: '',
};

// Función pura para transformar una lista de detalles existentes en un formato compatible con los inputs (cadenas de texto)
export const filasDesdeDetalles = (detalles = []) =>
  detalles.map((detalle) => ({
    id_producto: String(detalle.id_producto),
    cantidad: String(detalle.cantidad),
    precio_unitario: String(Number(detalle.precio_unitario)), // Conversión numérica previa antes de pasar a string
  }));

// Función de validación (predicado) para verificar si una fila está completa y cumple con las reglas de negocio
export const filaCompleta = (fila) =>
  fila.id_producto !== '' && // El producto debe estar seleccionado
  Number.isInteger(Number(fila.cantidad)) && // La cantidad debe ser un número entero válido
  Number(fila.cantidad) >= 1 && // La cantidad debe ser al menos 1
  fila.precio_unitario !== '' && // El precio unitario no debe estar vacío
  Number.isFinite(Number(fila.precio_unitario)) && // El precio debe ser un número finito válido
  Number(fila.precio_unitario) >= 0; // El precio no puede ser negativo

// Función de mapeo para convertir las filas del estado de la interfaz al formato numérico esperado por el payload del backend
export const filasAPayload = (filas) =>
  filas.map((fila) => ({
    id_producto: Number(fila.id_producto),
    cantidad: Number(fila.cantidad),
    precio_unitario: Number(fila.precio_unitario),
  }));
