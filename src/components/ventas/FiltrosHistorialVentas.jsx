import BarraFiltros from "../compartido/BarraFiltros";

export default function FiltrosHistorialVentas({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por venta, operación, usuario o motivo"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    />
  );
}
