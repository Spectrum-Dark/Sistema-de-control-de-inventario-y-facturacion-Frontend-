/**
 * Componente Tabla_Facturas.
 * Despliega las facturas paginadas de 10 en 10 con controles de navegación.
 */
export default function Tabla_Facturas({
  facturas,
  totalRegistros,
  paginaActual,
  totalPaginas,
  consultarFactura,
  cambiarPagina,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Facturas registradas
        </h2>
        <span className="text-xs font-semibold text-slate-500">
          Total: {totalRegistros} facturas
        </span>
      </div>

      {facturas.length === 0 ? (
        <p className="text-xs text-slate-500">
          No se encontraron facturas con esos criterios.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Número de factura</th>
                  <th className="px-4 py-2.5">Fecha</th>
                  <th className="px-4 py-2.5">Cliente</th>
                  <th className="px-4 py-2.5">Total</th>
                  <th className="px-4 py-2.5">Estado</th>
                  <th className="px-4 py-2.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {facturas.map((factura) => (
                  <tr
                    key={factura.id_factura}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="px-4 py-2.5 font-bold text-slate-900">
                      {factura.numero_factura}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500">
                      {factura.fecha}
                    </td>
                    <td className="px-4 py-2.5">{factura.cliente}</td>
                    <td className="px-4 py-2.5 font-black text-slate-900">
                      C$ {Number(factura.total).toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                        {factura.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => consultarFactura(factura)}
                        className="font-bold text-blue-600 hover:underline"
                      >
                        Ver factura
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BARRA DE PAGINACIÓN */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Página <strong className="text-slate-800">{paginaActual}</strong>{" "}
              de <strong className="text-slate-800">{totalPaginas}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={paginaActual === 1}
                onClick={() => cambiarPagina(paginaActual - 1)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <button
                type="button"
                disabled={paginaActual === totalPaginas}
                onClick={() => cambiarPagina(paginaActual + 1)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
