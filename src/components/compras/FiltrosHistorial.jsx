import BarraFiltros from "../compartido/BarraFiltros";

export default function FiltrosHistorial({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por compra, motivo o usuario"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    />
  );
}