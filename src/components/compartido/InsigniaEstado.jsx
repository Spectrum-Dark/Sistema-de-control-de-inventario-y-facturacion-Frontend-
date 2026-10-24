const ESTADOS_POSITIVOS = ["Activo", "Activa"];
const ESTADOS_CONFIRMADOS = ["Confirmada"];

export default function InsigniaEstado({ estado }) {
  const positivo = ESTADOS_POSITIVOS.includes(estado);
  const confirmado = ESTADOS_CONFIRMADOS.includes(estado);

  return (
    <span className={`text-xs font-semibold ${positivo || confirmado ? "text-emerald-700" : "text-slate-500"}`}>
      {estado}
    </span>
  );
}
