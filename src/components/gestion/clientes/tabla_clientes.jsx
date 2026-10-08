function TablaClientes({
  clientes = [],
  verCliente,
  editarCliente,
  eliminarCliente,
  paginaActual,
  totalPaginas,
  paginaAnterior,
  paginaSiguiente,
  totalRegistros,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">
                ID
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Apellido
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Teléfono
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Correo Electrónico
              </th>
              <th scope="col" className="px-4 py-3 font-bold text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientes.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-8 text-center text-xs text-slate-400"
                >
                  No se encontraron clientes registrados.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr
                  key={cliente.id_cliente}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">
                    #{cliente.id_cliente}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {cliente.nombre}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {cliente.apellido}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">
                    {cliente.telefono || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {cliente.correo_electronico || "-"}
                  </td>
                  <td className="space-x-2 px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => verCliente(cliente)}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
                    >
                      Ver
                    </button>

                    <button
                      type="button"
                      onClick={() => editarCliente(cliente)}
                      className="rounded-lg border border-sky-200/60 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => eliminarCliente(cliente)}
                      className="rounded-lg border border-rose-200/60 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginación */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3">
        <p className="text-xs text-slate-500">
          Mostrando{" "}
          <span className="font-semibold text-slate-700">
            {clientes.length}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-slate-700">{totalRegistros}</span>{" "}
          resultados
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={paginaActual === 1}
            onClick={paginaAnterior}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="px-1 text-xs font-medium text-slate-600">
            Página{" "}
            <span className="font-bold text-slate-800">{paginaActual}</span> de{" "}
            <span className="font-bold text-slate-800">{totalPaginas}</span>
          </span>

          <button
            type="button"
            disabled={paginaActual === totalPaginas}
            onClick={paginaSiguiente}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablaClientes;
