import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", marca: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.marca);

export function filtrarCompatibilidades(filas, filtros) {
  const texto = normalizarTexto(filtros.busqueda);

  return filas.filter((c) => {
    const coincideTexto =
      !texto ||
      [
        c.producto?.codigo_producto,
        c.producto?.nombre_producto,
        c.modelo?.nombre_modelo,
        c.nombre_marca,
        c.observaciones,
      ].some((campo) => normalizarTexto(campo).includes(texto));

    const coincideMarca =
      !filtros.marca || String(c.modelo?.id_marca) === filtros.marca;

    return coincideTexto && coincideMarca;
  });
}
