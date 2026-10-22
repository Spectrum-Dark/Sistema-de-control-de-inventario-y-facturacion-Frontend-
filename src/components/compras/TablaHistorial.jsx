import { Eye } from "lucide-react";
import AccionesFila from "../compartido/AccionesFila";
import { formatearFechaHora } from "../../utils/compartido/fecha";

const NOMBRES_OPERACION = {
  Correccion: "Corrección",
  Confirmacion: "Confirmación",
};
const operacion = (h) =>
  NOMBRES_OPERACION[h.tipo_operacion] ?? h.tipo_operacion ?? "—";

// No usamos un id propio: se arma una clave con los datos de la fila
const claveDe = (h, i) => `${h.id_compra}-${h.fecha_operacion}-${i}`;

export default function TablaHistorial({ historial, onVerCambios }) {
  const extrasDe = (h) => [
    {
      titulo: "Ver cambios",
      textoCorto: "Ver cambios",
      icono: Eye,
      onClick: () => onVerCambios(h),
    },
  ];

  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Compra</th>
              <th className="px-4 py-3 font-medium">Operación</th>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Motivo
              </th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historial.map((h, i) => (
              <tr key={claveDe(h, i)} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {formatearFechaHora(h.fecha_operacion)}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {h.compra?.numero_compra ?? "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">{operacion(h)}</td>
                <td className="px-4 py-3 text-slate-600">
                  {h.usuario?.nombre_completo ?? "—"}
                </td>
                <td className="hidden max-w-xs px-4 py-3 text-slate-600 lg:table-cell">
                  {h.motivo || "—"}
                </td>
                <td className="px-4 py-3">
                  <AccionesFila
                    nombre={h.compra?.numero_compra ?? "compra"}
                    extras={extrasDe(h)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {historial.map((h, i) => (
          <div
            key={claveDe(h, i)}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900">
                {h.compra?.numero_compra ?? "—"}
              </p>
              <span className="text-xs text-slate-500">{operacion(h)}</span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {formatearFechaHora(h.fecha_operacion)} ·{" "}
              {h.usuario?.nombre_completo ?? "—"}
            </p>

            {h.motivo && (
              <p className="mt-2 text-sm text-slate-600">{h.motivo}</p>
            )}

            <AccionesFila variante="tarjeta" extras={extrasDe(h)} />
          </div>
        ))}
      </div>
    </>
  );
}