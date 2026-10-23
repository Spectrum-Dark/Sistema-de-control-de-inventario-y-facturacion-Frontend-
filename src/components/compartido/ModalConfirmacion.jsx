import { useState } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";
import Modal from "./Modal";

const ESTILOS = {
  peligro: "bg-red-600 hover:bg-red-700",
  normal: "bg-slate-800 hover:bg-slate-900",
};

export default function ModalConfirmacion({
  titulo,
  mensaje,
  textoConfirmar = "Eliminar",
  textoProceso = "Eliminando...",
  variante = "peligro",
  onConfirmar,
  onCerrar,
}) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const Icono = variante === "peligro" ? Trash2 : Check;

  const handleConfirmar = async () => {
    setCargando(true);
    setError("");

    try {
      await onConfirmar();
    } catch (err) {
      // Si el backend rechaza, el mensaje se muestra aquí
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <Modal titulo={titulo} onCerrar={onCerrar} bloqueado={cargando}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600">{mensaje}</p>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmar}
            disabled={cargando}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${ESTILOS[variante]}`}
          >
            {cargando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Icono size={16} />
            )}
            {cargando ? textoProceso : textoConfirmar}
          </button>
        </div>
      </div>
    </Modal>
  );
}
