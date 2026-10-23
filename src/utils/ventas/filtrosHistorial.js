import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "" };

export const filtrarHistorial = (historial, filtros) =>
  historial.filter((registro) =>
    coincideTexto(filtros.busqueda, [
      registro.venta?.numero_venta,
      registro.motivo,
      registro.tipo_operacion,
      registro.usuario?.nombre_completo,
      registro.usuario?.nombre_usuario,
    ]),
  );
