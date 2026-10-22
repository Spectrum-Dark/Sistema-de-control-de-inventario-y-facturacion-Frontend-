import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", marca: "" };

// Las filas llegan completadas con producto, modelo y nombre_marca desde la página
export const filtrarCompatibilidades = (filas, filtros) =>
  filas.filter(
    (c) =>
      coincideTexto(filtros.busqueda, [
        c.producto?.codigo_producto,
        c.producto?.nombre_producto,
        c.modelo?.nombre_modelo,
        c.nombre_marca,
        c.observaciones,
      ]) &&
      (!filtros.marca || String(c.modelo?.id_marca) === filtros.marca)
  );