const ESTILOS = {
  Entrada: "bg-green-100 text-green-700",
  Salida: "bg-red-100 text-red-700",
};

export default function InsigniaTipoMovimiento({ tipo }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ESTILOS[tipo] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {tipo}
    </span>
  );
}