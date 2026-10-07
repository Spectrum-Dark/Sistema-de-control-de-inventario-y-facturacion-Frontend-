// Mapeo interno de estilos e iconos según el título del indicador
const configuracionIndicadores = {
  productos: {
    estilos: "bg-sky-50 text-sky-600 border-sky-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  clientes: {
    estilos: "bg-indigo-50 text-indigo-600 border-indigo-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  "ventas del período": {
    estilos: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  "compras del período": {
    estilos: "bg-violet-50 text-violet-600 border-violet-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  "stock bajo": {
    estilos: "bg-rose-50 text-rose-600 border-rose-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  "valor del inventario": {
    estilos: "bg-amber-50 text-amber-600 border-amber-100",
    icono: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function TarjetaIndicador({
  titulo = "",
  valor = 0,
  descripcion = "",
}) {
  // Busca la configuración según el título en minúsculas
  const clave = titulo.trim().toLowerCase();
  const config = configuracionIndicadores[clave] ?? {
    estilos: "bg-sky-50 text-sky-600 border-sky-100",
    icono: null,
  };

  return (
    <article className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="min-w-0 pr-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {titulo}
        </h3>

        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {valor}
        </p>

        {descripcion && (
          <span className="mt-1 block text-xs font-medium text-slate-500">
            {descripcion}
          </span>
        )}
      </div>

      {config.icono && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${config.estilos}`}
        >
          {config.icono}
        </div>
      )}
    </article>
  );
}

export default TarjetaIndicador;