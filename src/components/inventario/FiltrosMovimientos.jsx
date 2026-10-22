import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosMovimientos({
  filtros,
  tipos,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por producto, motivo, usuario o compra"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <SelectFiltro
        etiqueta="Filtrar por tipo de movimiento"
        valor={filtros.tipo}
        onChange={(valor) => onCambiar("tipo", valor)}
      >
        <option value="">Todos los tipos</option>
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </SelectFiltro>
    </BarraFiltros>
  );
}