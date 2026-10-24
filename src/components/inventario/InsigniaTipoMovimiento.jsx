import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine } from "lucide-react";

const CONFIGURACION = {
  Entrada: { Icono: ArrowDownToLine, color: "text-emerald-700" },
  Salida: { Icono: ArrowUpFromLine, color: "text-red-600" },
};

export default function InsigniaTipoMovimiento({ tipo }) {
  const { Icono, color } = CONFIGURACION[tipo] ?? {
    Icono: ArrowLeftRight,
    color: "text-slate-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color}`}>
      <Icono size={14} strokeWidth={2} />
      {tipo}
    </span>
  );
}
