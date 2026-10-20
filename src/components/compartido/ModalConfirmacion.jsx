import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import Modal from "./Modal";

export default function ModalConfirmacion({
  titulo,
  mensaje,
  textoConfirmar = "Eliminar",
  onConfirmar,
  onCerrar,
}) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmar = async () => {
    setCargando(true);
    setError("");

    try {
      await onConfirmar();
    } catch (err) {
      // Si el backend rechaza (por ejemplo, registros relacionados), se muestra aquí
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <Modal titulo={titulo} onCerrar={onCerrar} bloqueado={cargando}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600">{mensaje}</p>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmar}
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {cargando ? "Eliminando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </Modal>
  );
}