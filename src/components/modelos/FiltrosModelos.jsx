import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosModelos({
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
      placeholder="Buscar por modelo, marca o descripción"
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

      <SelectFiltro
        etiqueta="Filtrar por estado"
        valor={filtros.estado}
        onChange={(valor) => onCambiar("estado", valor)}
      >
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </SelectFiltro>
    </BarraFiltros>
  );
}