import { normalizarTexto } from "../compartido/texto";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export const hayFiltrosActivos = (filtros) =>
  Boolean(filtros.busqueda.trim() || filtros.estado);

export function filtrarProveedores(proveedores, filtros) {
  const texto = normalizarTexto(filtros.busqueda);

  return proveedores.filter((p) => {
    const coincideTexto =
      !texto ||
      [
        p.nombre_proveedor,
        p.identificacion,
        p.telefono,
        p.correo,
        p.direccion,
      ].some((campo) => normalizarTexto(campo).includes(texto));

    const coincideEstado = !filtros.estado || p.estado === filtros.estado;

    return coincideTexto && coincideEstado;
  });
}