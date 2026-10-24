import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  titulo,
  onCerrar,
  bloqueado = false,
  ancho = "max-w-md",
  children,
}) {
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === "Escape" && !bloqueado) onCerrar();
    };

    document.addEventListener("keydown", alPresionar);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
    };
  }, [bloqueado, onCerrar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-3 backdrop-blur-[2px] sm:items-center sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !bloqueado) onCerrar();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={`w-full ${ancho} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">{titulo}</h2>
          <button
            onClick={onCerrar}
            disabled={bloqueado}
            aria-label="Cerrar"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
