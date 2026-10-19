import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.estado);

export function filtrarMarcas(marcas, filtros) {
  const texto = normalizarTexto(filtros.busqueda);

  return marcas.filter((m) => {
    const coincideTexto =
      !texto ||
      [m.nombre_marca, m.descripcion].some((campo) =>
        normalizarTexto(campo).includes(texto)
      );

    const coincideEstado = !filtros.estado || m.estado === filtros.estado;

    return coincideTexto && coincideEstado;
  });
}