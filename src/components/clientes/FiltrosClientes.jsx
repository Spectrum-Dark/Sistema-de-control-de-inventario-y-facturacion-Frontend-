import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosClientes({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por nombre, identificación o contacto"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
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