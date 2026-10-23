export default function SelectFiltro({ etiqueta, valor, onChange, children }) {
  return (
    <select
      aria-label={etiqueta}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-auto"
    >
      {children}
    </select>
  );
}
