const ESTADOS_POSITIVOS = ["Activo", "Activa"];
const ESTADOS_CONFIRMADOS = ["Confirmada"];

export default function InsigniaEstado({ estado }) {
  const positivo = ESTADOS_POSITIVOS.includes(estado);
  const confirmado = ESTADOS_CONFIRMADOS.includes(estado);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        positivo || confirmado
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
          : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200"
      }`}
    >
      {estado}
    </span>
  );
}
