export default function CampoFormulario({
  id,
  label,
  icono: Icono,
  accionDerecha,
  error,
  sinIcono = false,
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
          className={`w-full rounded-xl border bg-white py-2.5 ${sinIcono ? "pl-3" : "pl-10"} pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 hover:border-slate-400 focus:border-slate-500 focus:ring-slate-300"
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
