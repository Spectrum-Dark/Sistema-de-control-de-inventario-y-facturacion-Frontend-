import { useState } from 'react';
import { CircleAlert, Loader2, XCircle } from 'lucide-react';
import Modal from '../compartido/Modal';

// Componente modal 'ModalAnularFactura' para gestionar la anulación de una factura existente, permitiendo ingresar observaciones opcionales y controlando estados de carga y errores asíncronos.
export default function ModalAnularFactura({ factura, onAnular, onCerrar }) {
  // Estado local para almacenar las observaciones u motivos de anulación.
  const [observaciones, setObservaciones] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Manejador del envío del formulario de anulación.
  const enviar = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError('');
    try {
      await onAnular(factura, observaciones.trim());
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <Modal
      titulo={`Anular factura ${factura.numero_factura}`}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={enviar} className="space-y-4">
        {/* Aviso informativo superior sobre las consecuencias de la anulación */}
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <CircleAlert size={17} className="mt-0.5 shrink-0 text-slate-500" />
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Anulación de factura
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              La factura cambiará a estado Anulada. La venta asociada no se
              modificará.
            </p>
          </div>
        </div>

        {/* Campo de texto para observaciones u motivo de anulación */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Observaciones{' '}
            <span className="font-normal text-slate-400">(opcional)</span>
          </span>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            maxLength={255}
            rows={2}
            placeholder="Añade un motivo u observación (opcional)"
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>

        {/* Alerta de error condicional en caso de fallo en la petición */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {/* Botones de acción del pie del modal */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {cargando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <XCircle size={16} />
            )}
            {cargando ? 'Anulando...' : 'Confirmar anulación'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
