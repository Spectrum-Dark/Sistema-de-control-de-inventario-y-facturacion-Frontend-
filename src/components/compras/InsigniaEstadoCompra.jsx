const ESTILOS = {
  Registrada: "bg-amber-100 text-amber-700",
  Confirmada: "bg-green-100 text-green-700",
};

export default function InsigniaEstadoCompra({ estado }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ESTILOS[estado] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {estado}
    </span>
  );
}