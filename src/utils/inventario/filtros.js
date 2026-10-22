import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", tipo: "" };

export const filtrarMovimientos = (movimientos, filtros) =>
  movimientos.filter(
    (m) =>
      coincideTexto(filtros.busqueda, [
        m.producto?.codigo_producto,
        m.producto?.nombre_producto,
        m.motivo,
        m.usuario?.nombre_completo,
        m.usuario?.nombre_usuario,
        m.compra?.numero_compra,
      ]) &&
      (!filtros.tipo || m.tipo_movimiento === filtros.tipo),
  );
