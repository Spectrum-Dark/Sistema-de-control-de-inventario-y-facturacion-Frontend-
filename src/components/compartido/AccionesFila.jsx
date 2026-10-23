import { Pencil, Trash2 } from "lucide-react";

const claseIcono =
  "rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";
const claseIconoPeligro =
  "rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600";

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
  if (variante === "tarjeta") {
    return (
      <div className="mt-3 flex flex-wrap gap-4">
        {puedeEditar && (
          <button
            onClick={onEditar}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil size={14} />
            Editar
          </button>
        )}
        {extras.map(({ titulo, textoCorto, icono: Icono, onClick }) => (
          <button
            key={titulo}
            onClick={onClick}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icono size={14} />
            {textoCorto ?? titulo}
          </button>
        ))}
        {puedeEliminar && (
          <button
            onClick={onEliminar}
            disabled={deshabilitado}
            title={motivoDeshabilitado}
            className="flex items-center gap-2 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : "Editar"}
          aria-label={`Editar ${nombre}`}
          className={`${claseIcono} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-500`}
        >
          <Pencil size={16} />
        </button>
      )}
      {extras.map(({ titulo, icono: Icono, onClick }) => (
        <button
          key={titulo}
          onClick={onClick}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : titulo}
          aria-label={`${titulo}: ${nombre}`}
          className={`${claseIcono} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-500`}
        >
          <Icono size={16} />
        </button>
      ))}
      {puedeEliminar && (
        <button
          onClick={onEliminar}
          disabled={deshabilitado}
          title={deshabilitado ? motivoDeshabilitado : "Eliminar"}
          aria-label={`Eliminar ${nombre}`}
          className={`${claseIconoPeligro} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-500`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
