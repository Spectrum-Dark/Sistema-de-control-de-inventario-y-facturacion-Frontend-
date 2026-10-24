export default function SelectFiltro({ etiqueta, valor, onChange, children, className = "" }) {
  return (
    <select
      aria-label={etiqueta}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-auto ${className}`}
    >
      {children}
    </select>
  );
}
