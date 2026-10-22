import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "" };

export const filtrarHistorial = (historial, filtros) =>
  historial.filter((h) =>
    coincideTexto(filtros.busqueda, [
      h.compra?.numero_compra,
      h.motivo,
      h.tipo_operacion,
      h.usuario?.nombre_completo,
      h.usuario?.nombre_usuario,
    ])
  );