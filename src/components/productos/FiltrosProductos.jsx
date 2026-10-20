import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";

export default function FiltrosProductos({
  filtros,
  categorias,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por código, nombre o categoría"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <SelectFiltro
        etiqueta="Filtrar por categoría"
        valor={filtros.categoria}
        onChange={(valor) => onCambiar("categoria", valor)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((c) => (
          <option key={c.id_categoria} value={c.id_categoria}>
            {c.nombre_categoria}
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
