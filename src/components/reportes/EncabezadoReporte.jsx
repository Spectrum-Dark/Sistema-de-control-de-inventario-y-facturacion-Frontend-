// Componente reutilizable 'EncabezadoReporte' para estructurar la cabecera de las vistas de reportes, incorporando un icono representativo, título responsivo y una descripción orientativa.
export default function EncabezadoReporte({ Icono, titulo, descripcion }) {
  return (
    <header className="border-b border-slate-200 pb-3 pr-12 lg:pr-0">
      <div className="flex min-w-0 items-start gap-2.5">
        {/* Contenedor estético para el icono representativo del reporte */}
        <span className="module-heading-icon module-heading-icon--neutro flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
          <Icono size={17} aria-hidden="true" />
        </span>
        {/* Título principal del reporte con escala responsiva */}
        <h1 className="min-w-0 flex-1 text-lg font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl">
          {titulo}
        </h1>
      </div>
      {/* Descripción o subtítulo orientativo del reporte */}
      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{descripcion}</p>
    </header>
  );
}
