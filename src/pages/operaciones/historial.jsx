
import useHistorial from "../../hooks/operaciones/useHistorial";

function Historial() {
  const {
    ventasFiltradas,
    totalVentas,
    montoTotal,
    busqueda,
    setBusqueda,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    estadoVenta,
    setEstadoVenta,
    estadoFacturacion,
    setEstadoFacturacion,
    ventaSeleccionada,
    consultarVenta,
    limpiarFiltros,
  } = useHistorial();

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-NI", {
      style: "currency",
      currency: "NIO",
    }).format(Number(valor) || 0);

  const formatoFecha = (fecha) => {
    if (!fecha) return "—";

    return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-NI");
  };

  const claseEstado = (estado) => {
    const estilos = {
      Procesada: "bg-emerald-50 text-emerald-700",
      Modificada: "bg-blue-50 text-blue-700",
      Anulada: "bg-red-50 text-red-700",
      Reembolsada: "bg-amber-50 text-amber-700",
      Generada: "bg-emerald-50 text-emerald-700",
      "No generada": "bg-slate-100 text-slate-600",
    };

    return estilos[estado] || "bg-slate-100 text-slate-600";
  };

  return (
    <section className="space-y-6">
      {/* Resumen del historial */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Historial de ventas
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Consulta las ventas registradas y revisa el detalle de sus productos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ventas encontradas</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalVentas}
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Importe total del resultado
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {formatoMoneda(montoTotal)}
          </p>
        </article>
      </div>

      {/* Filtros */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-semibold text-slate-900">
            Buscar y filtrar
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Encuentra ventas por número, cliente, usuario, fecha o estado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div>
            <label
              htmlFor="busqueda"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Venta, cliente o usuario
            </label>

            <input
              id="busqueda"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="fechaDesde"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Desde
            </label>

            <input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              max={fechaHasta || undefined}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="fechaHasta"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Hasta
            </label>

            <input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              min={fechaDesde || undefined}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="estadoVenta"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Estado de venta
            </label>

            <select
              id="estadoVenta"
              value={estadoVenta}
              onChange={(e) => setEstadoVenta(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Todos los estados</option>
              <option value="Procesada">Procesada</option>
              <option value="Modificada">Modificada</option>
              <option value="Anulada">Anulada</option>
              <option value="Reembolsada">Reembolsada</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="estadoFacturacion"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Estado de facturación
            </label>

            <select
              id="estadoFacturacion"
              value={estadoFacturacion}
              onChange={(e) => setEstadoFacturacion(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Todos</option>
              <option value="Generada">Generada</option>
              <option value="No generada">No generada</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={limpiarFiltros}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Ventas registradas
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">N.º de venta</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Usuario</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Facturación</th>
                <th className="px-5 py-3">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {ventasFiltradas.map((venta) => (
                <tr
                  key={venta.id_venta}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    {venta.numero_venta}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {formatoFecha(venta.fecha_venta)}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {venta.cliente}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {venta.usuario}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    {formatoMoneda(venta.total)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${claseEstado(venta.estado_venta)}`}
                    >
                      {venta.estado_venta}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${claseEstado(venta.estado_facturacion)}`}
                    >
                      {venta.estado_facturacion}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => consultarVenta(venta)}
                      className="whitespace-nowrap font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {ventaSeleccionada?.id_venta === venta.id_venta
                        ? "Ocultar detalle"
                        : "Ver detalle"}
                    </button>
                  </td>
                </tr>
              ))}

              {ventasFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    No se encontraron ventas con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
          Mostrando {totalVentas} venta(s). Datos de prueba temporales.
        </div>
      </div>

      {/* Detalle de la venta */}
      {ventaSeleccionada && (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Detalle de {ventaSeleccionada.numero_venta}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Consulta de los productos registrados en la venta.
              </p>
            </div>

            <button
              type="button"
              onClick={() => consultarVenta(ventaSeleccionada)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cerrar detalle
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Número de venta</p>
              <p className="mt-1 font-semibold text-slate-900">
                {ventaSeleccionada.numero_venta}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Fecha</p>
              <p className="mt-1 font-semibold text-slate-900">
                {formatoFecha(ventaSeleccionada.fecha_venta)}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Cliente</p>
              <p className="mt-1 font-semibold text-slate-900">
                {ventaSeleccionada.cliente}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Usuario responsable</p>
              <p className="mt-1 font-semibold text-slate-900">
                {ventaSeleccionada.usuario}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Cantidad</th>
                  <th className="px-4 py-3">Precio unitario</th>
                  <th className="px-4 py-3">Subtotal</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {ventaSeleccionada.detalles.map((detalle) => (
                  <tr key={detalle.id_detalle}>
                    <td className="px-4 py-3 text-slate-600">
                      {detalle.codigo_producto}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-800">
                      {detalle.nombre}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {detalle.cantidad}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {formatoMoneda(detalle.precio_venta)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-800">
                      {formatoMoneda(
                        detalle.cantidad * detalle.precio_venta,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-4">
            <div className="text-right">
              <p className="text-sm text-slate-500">Total de la venta</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {formatoMoneda(ventaSeleccionada.total)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Historial;
