import { CalendarDays, Clock3, Eye, FileClock } from "lucide-react";
import AccionesFila from "../compartido/AccionesFila";
import { formatearFechaHora } from "../../utils/compartido/fecha";

const NOMBRES_OPERACION = {
  Correccion: "Corrección",
  Anulacion: "Anulación",
};

const operacion = (registro) =>
  NOMBRES_OPERACION[registro.tipo_operacion] ?? registro.tipo_operacion ?? "—";

export default function TablaHistorialVentas({ historial, onVerCambios }) {
  const extrasDe = (registro) => [
    {
      titulo: "Ver cambios",
      textoCorto: "Ver cambios",
      icono: Eye,
      onClick: () => onVerCambios(registro),
    },
  ];

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Venta</th>
              <th className="px-4 py-3 font-medium">Operación</th>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-semibold">Motivo</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historial.map((registro) => (
              <tr key={registro.id_historial_venta} className="table-row-hover transition-colors">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-slate-400" />{formatearFechaHora(registro.fecha_operacion, { hora12: true })}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-semibold text-slate-900"><FileClock size={16} className="text-slate-500" />{registro.venta?.numero_venta ?? "—"}</span>
                </td>
                <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 text-slate-600"><Clock3 size={14} className="text-slate-400" />{operacion(registro)}</span></td>
                <td className="px-4 py-3 text-slate-600">
                  {registro.usuario?.nombre_completo ?? "—"}
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {registro.motivo || "—"}
                </td>
                <td className="px-4 py-3">
                  <AccionesFila
                    nombre={registro.venta?.numero_venta ?? "venta"}
                    extras={extrasDe(registro)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 xl:hidden">
        {historial.map((registro) => (
          <div
            key={registro.id_historial_venta}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900">
                {registro.venta?.numero_venta ?? "—"}
              </p>
              <span className="text-xs text-slate-500">{operacion(registro)}</span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays size={12} />{formatearFechaHora(registro.fecha_operacion, { hora12: true })} ·{" "}
              {registro.usuario?.nombre_completo ?? "—"}
            </p>
            {registro.motivo && (
              <p className="mt-2 text-sm text-slate-600">{registro.motivo}</p>
            )}
            <AccionesFila
              variante="tarjeta"
              nombre={registro.venta?.numero_venta ?? "venta"}
              extras={extrasDe(registro)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
