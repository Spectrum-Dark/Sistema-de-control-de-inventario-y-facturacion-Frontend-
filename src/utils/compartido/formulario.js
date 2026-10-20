// "" o null -> null; cualquier otro valor -> número
export const aNumeroONull = (valor) =>
  valor === "" || valor === null || valor === undefined ? null : Number(valor);

// Devuelve solo los campos cuyo valor cambió respecto al original
export const obtenerCambios = (valores, original) =>
  Object.fromEntries(
    Object.entries(valores).filter(([campo, valor]) => valor !== original[campo])
  );