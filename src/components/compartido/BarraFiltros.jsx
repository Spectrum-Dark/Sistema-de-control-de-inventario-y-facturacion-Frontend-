import { X } from 'lucide-react';
import CampoBusqueda from './CampoBusqueda';

// Componente reutilizable de barra de filtros general que incluye un campo de búsqueda, filtros hijos (children) y un botón para limpiar filtros.
export default function BarraFiltros({
  busqueda,
  onBusqueda,
  placeholder,
  hayFiltros,
  onLimpiar,
  children,
}) {
  return (
    // Contenedor principal flex con diseño responsivo (columna en móviles, fila horizontal centrada en pantallas medianas o superiores).
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
      {/* Contenedor del campo de búsqueda que ocupa todo el espacio flexible disponible en pantallas medianas */}
      <div className="sm:flex-1">
        <CampoBusqueda
          valor={busqueda} // Valor actual ingresado en la búsqueda
          onChange={onBusqueda} // Función que maneja el cambio en el input de búsqueda
          placeholder={placeholder} // Texto dinámico de guía (placeholder)
        />
      </div>

      {/* Renderizado de elementos hijos (children): permite inyectar selectores o filtros adicionales de forma flexible */}
      {children}

      {/* Renderizado condicional: Muestra el botón de limpiar solo si hay filtros aplicados (hayFiltros es true) */}
      {hayFiltros && (
        <button
          type="button"
          onClick={onLimpiar} // Restablece los filtros y la búsqueda a su estado inicial
          className="flex items-center justify-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <X size={16} />
          Limpiar
        </button>
      )}
    </div>
  );
}
