import { formatearFechaHora } from "../compartido/fecha";
import { formatearPrecio } from "../productos/formato";

export const FILTROS_INICIALES = { busqueda: "", estado: "" };

export function filtrarFacturas(facturas, filtros) {
  const consulta = filtros.busqueda.trim().toLocaleLowerCase();
  return facturas.filter((factura) => {
    const coincideConsulta = !consulta || [
      factura.numero_factura,
      factura.venta?.numero_venta,
      factura.venta?.cliente?.nombre_cliente,
      factura.venta?.cliente?.identificacion,
    ].some((valor) => String(valor ?? "").toLocaleLowerCase().includes(consulta));
    return coincideConsulta && (!filtros.estado || factura.estado === filtros.estado);
  });
}

export const fechaFactura = (fecha) =>
  fecha ? formatearFechaHora(fecha, { hora12: true }) : "—";

export const precioFactura = (valor) => formatearPrecio(valor ?? 0);
