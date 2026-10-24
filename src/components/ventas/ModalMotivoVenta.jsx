import { useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import Modal from "../compartido/Modal";
import CampoTextarea from "../compartido/CampoTextarea";

export default function ModalMotivoVenta({ venta, onCerrar, onConfirmar }) {
  const [motivo, setMotivo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (motivo.trim().length < 5) {
      setError("El motivo debe tener al menos 5 caracteres.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      await onConfirmar(motivo.trim());
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <Modal titulo={`Anular venta ${venta.numero_venta}`} onCerrar={onCerrar} bloqueado={cargando}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <CircleAlert size={17} className="mt-0.5 shrink-0 text-slate-500" />
          <div><p className="text-xs font-semibold text-slate-800">Impacto de la anulación</p><p className="mt-1 text-xs leading-relaxed text-slate-600">La venta pasará a Cancelada. Si estaba confirmada, sus productos regresarán al inventario y la operación quedará en el historial.</p></div>
        </div>
        <CampoTextarea
          id="motivo"
          label="Motivo de la anulación"
          placeholder="Explica por qué se anula la venta (mínimo 5 caracteres)"
          minLength={5}
          required
          value={motivo}
          onChange={(e) => { setMotivo(e.target.value); setError(""); }}
        />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button type="button" onClick={onCerrar} disabled={cargando} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60">Cancelar</button>
          <button type="submit" disabled={cargando} className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {cargando ? "Anulando..." : "Anular venta"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
