import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarCategorias = (categorias, filtros) =>
  categorias.filter(
    (c) =>
      coincideTexto(filtros.busqueda, [c.nombre_categoria, c.descripcion]) &&
      (!filtros.estado || c.estado === filtros.estado)
  );