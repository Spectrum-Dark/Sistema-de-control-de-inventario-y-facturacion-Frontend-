import { useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import Modal from "../compartido/Modal";

export default function ModalAnularFactura({ factura, onAnular, onCerrar }) {
  const [observaciones, setObservaciones] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const enviar = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError("");
    try {
      await onAnular(factura, observaciones.trim());
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <Modal titulo={`Anular factura ${factura.numero_factura}`} onCerrar={onCerrar} bloqueado={cargando}>
      <form onSubmit={enviar} className="space-y-4">
        <p className="text-sm leading-6 text-slate-600">La anulación cambiará el estado de la factura. La venta asociada no se modificará.</p>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Observaciones <span className="font-normal text-slate-400">(opcional)</span></span>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} maxLength={255} rows={3} className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
        </label>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onCerrar} disabled={cargando} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cancelar</button>
          <button type="submit" disabled={cargando} className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">{cargando ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}{cargando ? "Anulando..." : "Confirmar anulación"}</button>
        </div>
      </form>
    </Modal>
  );
}
