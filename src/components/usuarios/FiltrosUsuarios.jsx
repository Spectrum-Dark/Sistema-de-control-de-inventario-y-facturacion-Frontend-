import { Filter, RotateCcw } from 'lucide-react';
import CampoBusqueda from '../compartido/CampoBusqueda';
import SelectFiltro from '../compartido/SelectFiltro';
import { ROLES } from '../../utils/sesion/roles';

// Componente 'FiltrosUsuarios' encargado de proporcionar la interfaz de búsqueda por texto libre, filtrado por rol de usuario y estado operativo para la administración de cuentas.
export default function FiltrosUsuarios({
  filtros,
  onCambiar,
  onLimpiar,
  hayFiltros,
}) {
  return (
    // Sección contenedora principal con espaciado uniforme para agrupar los controles de filtrado
    <section
      className="space-y-2.5"
      aria-label="Búsqueda y filtros de usuarios"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Cabecera del bloque de filtros que incluye el icono descriptivo, título, subtítulo e indicador de filtros activos */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Filter size={16} />
            </span>
            <div>
              <h2 className="text-xs font-semibold text-slate-800">
                Buscar y filtrar usuarios
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Encuentra cuentas por nombre, usuario, rol o estado.
              </p>
            </div>
          </div>
          {hayFiltros && (
            <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:inline-flex">
              Filtros activos
            </span>
          )}
        </div>

        {/* Cuadrícula (grid) adaptable para organizar el campo de búsqueda, selector de rol, selector de estado y botón de limpieza */}
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[minmax(190px,1fr)_150px_150px_auto] lg:items-center">
          {/* Campo de búsqueda interactiva por nombre, nombre de usuario o correo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <CampoBusqueda
              valor={filtros.busqueda}
              onChange={(valor) => onCambiar('busqueda', valor)}
              placeholder="Nombre, usuario o correo"
            />
          </div>

          {/* Selector desplegable para filtrar los registros según el rol asignado */}
          <SelectFiltro
            etiqueta="Filtrar por rol"
            valor={filtros.rol}
            onChange={(valor) => onCambiar('rol', valor)}
            className="w-full"
          >
            <option value="">Todos los roles</option>
            {Object.entries(ROLES).map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </SelectFiltro>

          {/* Selector desplegable para filtrar los registros según su estado operativo (Activo / Inactivo) */}
          <SelectFiltro
            etiqueta="Filtrar por estado"
            valor={filtros.estado}
            onChange={(valor) => onCambiar('estado', valor)}
            className="w-full"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </SelectFiltro>

          {/* Botón condicional para restablecer los filtros aplicados */}
          {hayFiltros && (
            <button
              type="button"
              onClick={onLimpiar}
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <RotateCcw size={14} />
              Limpiar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
