import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", marca: "", estado: "" };

// nombresMarcas es un objeto { id_marca: "Toyota", ... }
export const filtrarModelos = (modelos, filtros, nombresMarcas) =>
  modelos.filter(
    (m) =>
      coincideTexto(filtros.busqueda, [
        m.nombre_modelo,
        m.descripcion,
        nombresMarcas[m.id_marca],
      ]) &&
      (!filtros.marca || String(m.id_marca) === filtros.marca) &&
      (!filtros.estado || m.estado === filtros.estado)
  );