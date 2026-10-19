import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", rol: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.rol || filtros.estado);

export function filtrarUsuarios(usuarios, filtros) {
  const texto = normalizarTexto(filtros.busqueda);

  return usuarios.filter((u) => {
    const coincideTexto =
      !texto ||
      [u.nombre_completo, u.nombre_usuario, u.correo].some((campo) =>
        normalizarTexto(campo).includes(texto),
      );

    const coincideRol = !filtros.rol || String(u.id_rol) === filtros.rol;
    const coincideEstado = !filtros.estado || u.estado === filtros.estado;

    return coincideTexto && coincideRol && coincideEstado;
  });
}
