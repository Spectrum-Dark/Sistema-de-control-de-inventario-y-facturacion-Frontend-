export default function EncabezadoReporte({ Icono, titulo, descripcion }) {
  return (
    <header className="border-b border-slate-200 pb-3">
      <div className="flex items-center gap-2.5">
        <span className="module-heading-icon module-heading-icon--neutro flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
          <Icono size={17} aria-hidden="true" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{titulo}</h1>
      </div>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{descripcion}</p>
    </header>
  );
}
