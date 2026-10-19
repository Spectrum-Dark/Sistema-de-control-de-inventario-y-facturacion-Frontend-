import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.estado);

export function filtrarCategorias(categorias, filtros) {
  const texto = normalizarTexto(filtros.busqueda);

  return categorias.filter((c) => {
    const coincideTexto =
      !texto ||
      [c.nombre_categoria, c.descripcion].some((campo) =>
        normalizarTexto(campo).includes(texto)
      );

    const coincideEstado = !filtros.estado || c.estado === filtros.estado;

    return coincideTexto && coincideEstado;
  });
}