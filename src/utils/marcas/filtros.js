import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarMarcas = (marcas, filtros) =>
  marcas.filter(
    (m) =>
      coincideTexto(filtros.busqueda, [m.nombre_marca, m.descripcion]) &&
      (!filtros.estado || m.estado === filtros.estado)
  );