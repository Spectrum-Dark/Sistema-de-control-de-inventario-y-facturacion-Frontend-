import BarraFiltros from "../compartido/BarraFiltros";
import SelectFiltro from "../compartido/SelectFiltro";
import { ROLES } from "../../utils/sesion/roles";

export default function FiltrosUsuarios({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    <BarraFiltros
      busqueda={filtros.busqueda}
      onBusqueda={(valor) => onCambiar("busqueda", valor)}
      placeholder="Buscar por nombre, usuario o correo"
      hayFiltros={hayFiltros}
      onLimpiar={onLimpiar}
    >
      <SelectFiltro
        etiqueta="Filtrar por rol"
        valor={filtros.rol}
        onChange={(valor) => onCambiar("rol", valor)}
      >
        <option value="">Todos los roles</option>
        {Object.entries(ROLES).map(([id, nombre]) => (
          <option key={id} value={id}>
            {nombre}
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