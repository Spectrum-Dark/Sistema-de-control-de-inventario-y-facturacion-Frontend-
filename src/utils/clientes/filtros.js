import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarClientes = (clientes, filtros) =>
  clientes.filter(
    (c) =>
      coincideTexto(filtros.busqueda, [
        c.nombre_cliente,
        c.identificacion,
        c.telefono,
        c.correo,
        c.direccion,
      ]) &&
      (!filtros.estado || c.estado === filtros.estado),
  );
