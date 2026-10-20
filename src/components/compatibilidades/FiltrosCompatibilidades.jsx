import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosCompatibilidades({
  filtros,
  marcas,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por producto, código, marca o modelo"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <SelectFiltro
        etiqueta="Filtrar por marca"
        valor={filtros.marca}
        onChange={(valor) => onCambiar("marca", valor)}
      >
        <option value="">Todas las marcas</option>
        {marcas.map((m) => (
          <option key={m.id_marca} value={m.id_marca}>
            {m.nombre_marca}
          </option>
        ))}
      </SelectFiltro>
    </BarraFiltros>
  );
}
