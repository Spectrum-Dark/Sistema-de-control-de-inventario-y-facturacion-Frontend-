// Constante que define la estructura inicial por defecto para una nueva fila vacía en el formulario.
// Los campos de texto empiezan en string vacío y la cantidad por defecto es "1".
export const FILA_VACIA = {
  id_producto: '',
  cantidad: '1',
  precio_unitario: '',
};

/**
 * Convierte los detalles recibidos desde el backend (que suelen venir con tipos numéricos o mixtos)
 * al formato de strings que manejan los inputs controlados del formulario.
 */
export const filasDesdeDetalles = (detalles = []) =>
  detalles.map((d) => ({
    id_producto: String(d.id_producto),
    cantidad: String(d.cantidad),
    // Convertimos a número y luego a string para limpiar posibles ceros a la izquierda o formato decimal sobrante.
    precio_unitario: String(Number(d.precio_unitario)),
  }));

/**
 * Valida si una fila está completa y cumple con las reglas de negocio necesarias
 * (producto seleccionado, cantidad entera mayor o igual a 1, y precio válido no negativo).
 */
export const filaCompleta = (fila) =>
  fila.id_producto !== '' &&
  Number.isInteger(Number(fila.cantidad)) &&
  Number(fila.cantidad) >= 1 &&
  fila.precio_unitario !== '' &&
  Number(fila.precio_unitario) >= 0;

/**
 * Transforma las filas del formulario (que están en formato string por los inputs)
 * al formato numérico estricto que espera el backend en el payload de la petición HTTP.
 */
export const filasAPayload = (filas) =>
  filas.map((f) => ({
    id_producto: Number(f.id_producto),
    cantidad: Number(f.cantidad),
    precio_unitario: Number(f.precio_unitario),
  }));

/**
 * Genera una "firma" o hash en formato JSON string de una lista de detalles.
 * Normaliza los tipos de datos y ordena los elementos por 'id_producto',
 * lo que permite comparar de forma rápida y segura si dos listas son idénticas
 * sin importar el orden en el que se encuentren los elementos (útil para detectar cambios sin guardar).
 */
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
