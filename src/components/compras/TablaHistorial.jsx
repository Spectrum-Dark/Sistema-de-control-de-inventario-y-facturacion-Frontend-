import { CalendarDays, Clock3, Eye, FileClock } from 'lucide-react';
import AccionesFila from '../compartido/AccionesFila';
import { formatearFechaHora } from '../../utils/compartido/fecha';

// Diccionario de conversión para mostrar etiquetas legibles según el tipo de operación realizada en el historial.
const NOMBRES_OPERACION = {
  Correccion: 'Corrección',
  Confirmacion: 'Confirmación',
};

// Función auxiliar para obtener el nombre formateado de la operación.
const operacion = (h) =>
  NOMBRES_OPERACION[h.tipo_operacion] ?? h.tipo_operacion ?? '—';

// Genera una clave única combinando datos del registro y el índice, útil cuando no se dispone de un ID único directo.
const claveDe = (h, i) => `${h.id_compra}-${h.fecha_operacion}-${i}`;

// Componente de tabla 'TablaHistorial' para visualizar el registro de auditoría, correcciones y confirmaciones de compras, con soporte dual para escritorio y vistas en tarjetas móviles.
export default function TablaHistorial({ historial, onVerCambios }) {
  // Define las acciones adicionales para cada fila (en este caso, la opción de inspeccionar la comparativa de cambios).
  const extrasDe = (h) => [
    {
      titulo: 'Ver cambios',
      textoCorto: 'Ver cambios',
      icono: Eye,
      onClick: () => onVerCambios(h),
    },
  ];

  return (
    <>
      {/* Vista de tabla tradicional, optimizada para pantallas grandes y tabletas (xl en adelante) */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-255 text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Compra</th>
              <th className="px-4 py-3 font-medium">Operación</th>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-semibold">Motivo</th>
              <th className="px-4 py-3 text-right font-medium columna-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historial.map((h, i) => (
              <tr
                key={claveDe(h, i)}
                className="table-row-hover transition-colors"
              >
                {/* Columna de fecha y hora exacta de la operación */}
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-slate-400" />
                    {formatearFechaHora(h.fecha_operacion, { hora12: true })}
                  </span>
                </td>

                {/* Columna con el número de compra asociado */}
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <FileClock size={16} className="text-slate-500" />
                    {h.compra?.numero_compra ?? '—'}
                  </span>
                </td>

                {/* Columna del tipo de operación (Confirmación o Corrección) */}
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <Clock3 size={14} className="text-slate-400" />
                    {operacion(h)}
                  </span>
                </td>

                {/* Columna del usuario responsable del cambio */}
                <td className="px-4 py-3 text-slate-600">
                  {h.usuario?.nombre_completo ?? '—'}
                </td>

                {/* Columna del motivo o justificación registrada */}
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {h.motivo || '—'}
                </td>

                {/* Columna de acciones (botón para visualizar los cambios) */}
                <td className="px-4 py-3 columna-acciones">
                  <AccionesFila
                    nombre={h.compra?.numero_compra ?? 'compra'}
                    extras={extrasDe(h)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista alternativa en formato de tarjetas (Cards), diseñada para dispositivos móviles (oculta en xl) */}
      <div className="space-y-3 xl:hidden">
        {historial.map((h, i) => (
          <div
            key={claveDe(h, i)}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="flex items-center gap-2 font-semibold text-slate-900">
                <FileClock size={16} className="text-slate-500" />
                {h.compra?.numero_compra ?? '—'}
              </p>
              <span className="text-xs text-slate-500">{operacion(h)}</span>
            </div>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays size={12} />
              {formatearFechaHora(h.fecha_operacion, { hora12: true })} ·{' '}
              {h.usuario?.nombre_completo ?? '—'}
            </p>

            {h.motivo && (
              <p className="mt-2 text-sm text-slate-600">{h.motivo}</p>
            )}

            <div className="mt-3 border-t border-slate-100 pt-1">
              <AccionesFila variante="tarjeta" extras={extrasDe(h)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
