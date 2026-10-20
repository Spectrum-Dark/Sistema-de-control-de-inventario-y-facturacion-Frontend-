import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", marca: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.marca || filtros.estado);

// nombresMarcas es un objeto { id_marca: "Toyota", ... }
export function filtrarModelos(modelos, filtros, nombresMarcas) {
  const texto = normalizarTexto(filtros.busqueda);

  return modelos.filter((m) => {
    const coincideTexto =
      !texto ||
      [m.nombre_modelo, m.descripcion, nombresMarcas[m.id_marca]].some((campo) =>
        normalizarTexto(campo).includes(texto)
      );

    const coincideMarca = !filtros.marca || String(m.id_marca) === filtros.marca;
    const coincideEstado = !filtros.estado || m.estado === filtros.estado;

    return coincideTexto && coincideMarca && coincideEstado;
  });
}