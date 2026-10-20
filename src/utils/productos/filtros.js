import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", categoria: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.categoria || filtros.estado);

// nombresCategorias es un objeto { id_categoria: "Frenos", ... }
export function filtrarProductos(productos, filtros, nombresCategorias) {
  const texto = normalizarTexto(filtros.busqueda);

  return productos.filter((p) => {
    const coincideTexto =
      !texto ||
      [
        p.codigo_producto,
        p.nombre_producto,
        p.descripcion,
        nombresCategorias[p.id_categoria],
      ].some((campo) => normalizarTexto(campo).includes(texto));

    const coincideCategoria =
      !filtros.categoria || String(p.id_categoria) === filtros.categoria;
    const coincideEstado = !filtros.estado || p.estado === filtros.estado;

    return coincideTexto && coincideCategoria && coincideEstado;
  });
}