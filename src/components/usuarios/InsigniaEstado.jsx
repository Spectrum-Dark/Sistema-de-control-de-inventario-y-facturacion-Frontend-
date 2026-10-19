export default function InsigniaEstado({ estado }) {
  const activo = estado === "Activo";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        activo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {estado}
    </span>
  );
}