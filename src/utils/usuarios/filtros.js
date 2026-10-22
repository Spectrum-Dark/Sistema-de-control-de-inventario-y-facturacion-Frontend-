import { coincideTexto } from "../compartido/filtros";

export const FILTROS_INICIALES = { busqueda: "", rol: "", estado: "" };

export const filtrarUsuarios = (usuarios, filtros) =>
  usuarios.filter(
    (u) =>
      coincideTexto(filtros.busqueda, [
        u.nombre_completo,
        u.nombre_usuario,
        u.correo,
      ]) &&
      (!filtros.rol || String(u.id_rol) === filtros.rol) &&
      (!filtros.estado || u.estado === filtros.estado)
  );