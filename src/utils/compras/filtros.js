import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarCompras = (compras, filtros) =>
  compras.filter(
    (c) =>
      coincideTexto(filtros.busqueda, [
        c.numero_compra,
        c.proveedor?.nombre_proveedor,
        c.usuario?.nombre_completo,
        c.usuario?.nombre_usuario,
        c.observaciones,
        ...(c.detalles ?? []).flatMap((d) => [
          d.producto?.codigo_producto,
          d.producto?.nombre_producto,
        ]),
      ]) &&
      (!filtros.estado || c.estado === filtros.estado)
  );