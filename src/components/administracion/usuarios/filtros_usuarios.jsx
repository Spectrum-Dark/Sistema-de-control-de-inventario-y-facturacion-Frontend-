import { Search, Shield, Filter, RotateCcw } from "lucide-react";

// Definición estática de roles disponibles en el sistema para los filtros
const ROLES_DISPONIBLES = [
  { id: 1, nombre: "Administrador" },
  { id: 2, nombre: "Operador" },
  { id: 3, nombre: "Consultor" },
];

/**
 * Componente encargado de la barra de búsqueda avanzada y filtrado de usuarios.
 * Permite filtrar de forma dinámica por texto (nombre, usuario, correo), por rol
 * y por estado (Activo/Inactivo), además de incluir una opción para restablecer los filtros.
 */
function FiltrosUsuarios({
  busqueda,
  onCambiarBusqueda,
  filtroRol,
  onCambiarRol,
  filtroEstado,
  onCambiarEstado,
  onLimpiarFiltros,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Título de la sección de filtros */}
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Buscar y filtrar usuarios
      </h2>

      {/* Contenedor Grid Responsivo para los campos de búsqueda y filtros */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Input de búsqueda general con icono de lupa */}
        <div className="sm:col-span-2">
          <label
            htmlFor="busquedaUsuarios"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            <Search size={14} className="text-slate-400" />
            Buscar usuario
          </label>
          <div className="relative">
            <input
              id="busquedaUsuarios"
              type="search"
              value={busqueda}
              onChange={(evento) => onCambiarBusqueda(evento.target.value)}
              placeholder="Nombre, usuario o correo electrónico..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* 2. Selector de filtro por Rol */}
        <div>
          <label
            htmlFor="filtroRol"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            <Shield size={14} className="text-slate-400" />
            Filtrar por rol
          </label>
          <select
            id="filtroRol"
            value={filtroRol}
            onChange={(evento) => onCambiarRol(evento.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          >
            <option value="">Todos los roles</option>
            {ROLES_DISPONIBLES.map((rol) => (
              <option key={rol.id} value={String(rol.id)}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Selector de filtro por Estado */}
        <div>
          <label
            htmlFor="filtroEstado"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            <Filter size={14} className="text-slate-400" />
            Filtrar por estado
          </label>
          <select
            id="filtroEstado"
            value={filtroEstado}
            onChange={(evento) => onCambiarEstado(evento.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Botón para restablecer o limpiar todos los filtros aplicados */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onLimpiarFiltros}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
        >
          <RotateCcw size={13} />
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}

export default FiltrosUsuarios;
