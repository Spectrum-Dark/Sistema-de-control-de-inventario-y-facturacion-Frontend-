import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosCompras({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por número, proveedor, producto o usuario"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <SelectFiltro
        etiqueta="Filtrar por estado"
        valor={filtros.estado}
        onChange={(valor) => onCambiar("estado", valor)}
      >
        <option value="">Todos los estados</option>
        <option value="Registrada">Registrada</option>
        <option value="Confirmada">Confirmada</option>
      </SelectFiltro>
    </BarraFiltros>
  );
}