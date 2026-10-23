import { Eye } from "lucide-react";
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
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Venta</th>
              <th className="px-4 py-3 font-medium">Operación</th>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">Motivo</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historial.map((registro) => (
              <tr key={registro.id_historial_venta} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {formatearFechaHora(registro.fecha_operacion, { hora12: true })}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {registro.venta?.numero_venta ?? "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">{operacion(registro)}</td>
                <td className="px-4 py-3 text-slate-600">
                  {registro.usuario?.nombre_completo ?? "—"}
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
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

      <div className="space-y-3 md:hidden">
        {historial.map((registro) => (
          <div
            key={registro.id_historial_venta}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900">
                {registro.venta?.numero_venta ?? "—"}
              </p>
              <span className="text-xs text-slate-500">{operacion(registro)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {formatearFechaHora(registro.fecha_operacion, { hora12: true })} ·{" "}
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
