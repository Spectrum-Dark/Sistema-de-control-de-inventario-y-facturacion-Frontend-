export default function InsigniaEstadoCategoria({ estado }) {
  const activa = estado === "Activa";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        activa ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {estado}
    </span>
  );
}