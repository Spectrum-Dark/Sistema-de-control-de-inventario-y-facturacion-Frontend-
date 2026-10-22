import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const filtrarProveedores = (proveedores, filtros) =>
  proveedores.filter(
    (p) =>
      coincideTexto(filtros.busqueda, [
        p.nombre_proveedor,
        p.identificacion,
        p.telefono,
        p.correo,
        p.direccion,
      ]) &&
      (!filtros.estado || p.estado === filtros.estado)
  );