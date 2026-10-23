const claseSelect =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function CampoSelect({ id, label, children, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <select id={id} name={id} className={claseSelect} {...props}>
        {children}
      </select>
    </div>
  );
}
