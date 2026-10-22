import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", categoria: "", estado: "" };

// nombresCategorias es un objeto { id_categoria: "Frenos", ... }
export const filtrarProductos = (productos, filtros, nombresCategorias) =>
  productos.filter(
    (p) =>
      coincideTexto(filtros.busqueda, [
        p.codigo_producto,
        p.nombre_producto,
        p.descripcion,
        nombresCategorias[p.id_categoria],
      ]) &&
      (!filtros.categoria || String(p.id_categoria) === filtros.categoria) &&
      (!filtros.estado || p.estado === filtros.estado)
  );