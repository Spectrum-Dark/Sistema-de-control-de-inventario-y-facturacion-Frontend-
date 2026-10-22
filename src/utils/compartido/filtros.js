import { normalizarTexto } from "./texto";

// true si algún filtro tiene valor
export const hayFiltrosActivos = (filtros) =>
  Object.values(filtros).some((valor) => String(valor).trim() !== "");

// true si la búsqueda está vacía o aparece en alguno de los campos (sin tildes ni mayúsculas)
export const coincideTexto = (busqueda, campos) => {
  const texto = normalizarTexto(busqueda);
  return (
    !texto || campos.some((campo) => normalizarTexto(campo).includes(texto))
  );
};