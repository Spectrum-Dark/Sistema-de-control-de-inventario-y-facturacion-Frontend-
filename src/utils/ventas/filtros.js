import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarVentas = (ventas, filtros) =>
  ventas.filter(
    (v) =>
      coincideTexto(filtros.busqueda, [
        v.numero_venta,
        v.cliente?.nombre_cliente,
        v.cliente?.identificacion,
        v.usuario?.nombre_completo,
        v.usuario?.nombre_usuario,
        v.observaciones,
        ...(v.detalles ?? []).flatMap((d) => [
          d.producto?.codigo_producto,
          d.producto?.nombre_producto,
        ]),
      ]) &&
      (!filtros.estado || v.estado === filtros.estado),
  );
