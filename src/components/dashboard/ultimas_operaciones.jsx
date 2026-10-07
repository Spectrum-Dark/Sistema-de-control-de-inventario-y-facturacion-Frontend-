function UltimasOperaciones({ operaciones }) {
  const listaOperaciones = operaciones ?? [];

  // Mapeo dinámico de color según el tipo de movimiento
  const obtenerBadgeColor = (tipo = "") => {
    const tipoMin = tipo.toLowerCase();
    if (tipoMin.includes("venta")) return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    if (tipoMin.includes("compra")) return "bg-sky-50 text-sky-700 border-sky-200/60";
    if (tipoMin.includes("factura")) return "bg-violet-50 text-violet-700 border-violet-200/60";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        Últimas operaciones
      </h3>

      {listaOperaciones.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-xs text-slate-400">
          No hay operaciones recientes.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {listaOperaciones.map((operacion) => (
            <article
              key={operacion.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${obtenerBadgeColor(
                      operacion.tipo
                    )}`}
                  >
                    {operacion.tipo}
                  </span>
                  <span className="text-xs text-slate-400">
                    {operacion.fecha}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm font-medium text-slate-800">
                  {operacion.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default UltimasOperaciones;