import { Pencil, Trash2 } from "lucide-react";

const claseIcono =
  "rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";
const claseIconoPeligro =
  "rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600";

// extras: acciones adicionales [{ titulo, textoCorto, icono, onClick }]
export default function AccionesFila({
  nombre,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
  extras = [],
  variante = "tabla",
}) {
  if (variante === "tarjeta") {
    return (
      <div className="mt-3 flex flex-wrap gap-4">
        {puedeEditar && (
          <button
            onClick={onEditar}
            className="flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Pencil size={14} />
            Editar
          </button>
        )}
        {extras.map(({ titulo, textoCorto, icono: Icono, onClick }) => (
          <button
            key={titulo}
            onClick={onClick}
            className="flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Icono size={14} />
            {textoCorto ?? titulo}
          </button>
        ))}
        {puedeEliminar && (
          <button
            onClick={onEliminar}
            className="flex items-center gap-2 text-sm font-medium text-red-600"
          >
            <Trash2 size={14} />
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
          title="Editar"
          aria-label={`Editar ${nombre}`}
          className={claseIcono}
        >
          <Pencil size={16} />
        </button>
      )}
      {extras.map(({ titulo, icono: Icono, onClick }) => (
        <button
          key={titulo}
          onClick={onClick}
          title={titulo}
          aria-label={`${titulo}: ${nombre}`}
          className={claseIcono}
        >
          <Icono size={16} />
        </button>
      ))}
      {puedeEliminar && (
        <button
          onClick={onEliminar}
          title="Eliminar"
          aria-label={`Eliminar ${nombre}`}
          className={claseIconoPeligro}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}