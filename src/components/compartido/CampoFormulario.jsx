export default function CampoFormulario({
  id,
  label,
  icono: Icono,
  accionDerecha,
  error,
  ...props
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icono && (
          <Icono
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          id={id}
          name={id}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-slate-700 focus:ring-slate-200"
          }`}
          {...props}
        />

        {accionDerecha && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {accionDerecha}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}