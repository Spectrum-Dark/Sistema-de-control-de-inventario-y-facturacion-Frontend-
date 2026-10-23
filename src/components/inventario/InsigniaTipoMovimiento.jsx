const ESTILOS = {
  Entrada: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Salida: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
};

export default function InsigniaTipoMovimiento({ tipo }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        ESTILOS[tipo] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {tipo}
    </span>
  );
}
