import { Pencil, Trash2 } from "lucide-react";

const claseIcono =
  "rounded-lg p-2 text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400";
const claseIconoPeligro =
  "rounded-lg p-2 text-slate-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300";

// extras: acciones adicionales [{ titulo, textoCorto, icono, onClick }]
export default function AccionesFila({
  nombre,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
  extras = [],
  variante = "tabla",
  deshabilitado = false,
  motivoDeshabilitado,
}) {
  const colorEditar = deshabilitado
    ? "text-slate-400"
    : "text-slate-400 transition-colors group-hover:text-blue-600";
  const colorEliminar = deshabilitado
    ? "text-slate-400"
    : "text-slate-400 transition-colors group-hover:text-red-600";

  if (variante === "tarjeta") {
    return (
      <div className="mt-3 flex flex-wrap gap-4">
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

  return (
    <div className="flex justify-end gap-1">
      {puedeEditar && (
        <button
          onClick={onEditar}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : "Editar"}
          aria-label={`Editar ${nombre}`}
          className={`group ${claseIcono} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500`}
        >
          <Pencil size={16} className={colorEditar} />
        </button>
      )}
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
      {puedeEliminar && (
        <button
          onClick={onEliminar}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : "Eliminar"}
          aria-label={`Eliminar ${nombre}`}
          className={`group ${claseIconoPeligro} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <Trash2 size={16} className={colorEliminar} />
        </button>
      )}
    </div>
  );
}
