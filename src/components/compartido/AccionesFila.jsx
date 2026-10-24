import { Pencil, Trash2 } from 'lucide-react';

// Clases CSS base predefinidas para los botones de acción estándar dentro de las filas de una tabla.
const claseIcono =
  'rounded-lg p-2 text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

// Clases CSS con estilos específicos de peligro (para acciones destructivas como eliminar).
const claseIconoPeligro =
  'rounded-lg p-2 text-slate-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300';

// Componente reutilizable para las acciones de fila. Soporta permisos, variantes de diseño (tabla o tarjeta) y acciones extras.
export default function AccionesFila({
  nombre,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
  extras = [],
  variante = 'tabla',
  deshabilitado = false,
  motivoDeshabilitado,
}) {
  // Define dinámicamente el color del icono de edición según el estado de habilitación.
  const colorEditar = deshabilitado
    ? 'text-slate-400'
    : 'text-slate-400 transition-colors group-hover:text-blue-600';

  // Define dinámicamente el color del icono de eliminación según el estado de habilitación.
  const colorEliminar = deshabilitado
    ? 'text-slate-400'
    : 'text-slate-400 transition-colors group-hover:text-red-600';

  // Renderizado alternativo cuando la variante es "tarjeta" (diseño pensado para dispositivos móviles).
  if (variante === 'tarjeta') {
    return (
      <div className="mt-3 flex flex-wrap gap-4">
        {/* Botón de editar condicional basado en el permiso 'puedeEditar' */}
        {puedeEditar && (
          <button
            onClick={onEditar}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil size={14} className={colorEditar} />
            Editar
          </button>
        )}

        {/* Mapeo de acciones adicionales personalizadas que se pasen por props */}
        {extras.map(({ titulo, textoCorto, icono: Icono, onClick }) => (
          <button
            key={titulo}
            onClick={onClick}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icono size={14} className={colorEditar} />
            {textoCorto ?? titulo}
          </button>
        ))}

        {/* Botón de eliminar condicional basado en el permiso 'puedeEliminar' */}
        {puedeEliminar && (
          <button
            onClick={onEliminar}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} className={colorEliminar} />
            Eliminar
          </button>
        )}
      </div>
    );
  }

  // Renderizado por defecto (variante "tabla" para pantallas grandes).
  return (
    <div className="flex justify-end gap-1">
      {/* Botón de edición para la tabla con atributos de accesibilidad y estados de deshabilitación */}
      {puedeEditar && (
        <button
          onClick={onEditar}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : 'Editar'}
          aria-label={`Editar ${nombre}`}
          className={`group ${claseIcono} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500`}
        >
          <Pencil size={16} className={colorEditar} />
        </button>
      )}

      {/* Renderizado de acciones extras dentro de la tabla */}
      {extras.map(({ titulo, icono: Icono, onClick }) => (
        <button
          key={titulo}
          onClick={onClick}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : titulo}
          aria-label={`${titulo}: ${nombre}`}
          className={`group ${claseIcono} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500`}
        >
          <Icono size={16} className={colorEditar} />
        </button>
      ))}

      {/* Botón de eliminación para la tabla con estilos de alerta (peligro) */}
      {puedeEliminar && (
        <button
          onClick={onEliminar}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : 'Eliminar'}
          aria-label={`Eliminar ${nombre}`}
          className={`group ${claseIconoPeligro} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <Trash2 size={16} className={colorEliminar} />
        </button>
      )}
    </div>
  );
}
