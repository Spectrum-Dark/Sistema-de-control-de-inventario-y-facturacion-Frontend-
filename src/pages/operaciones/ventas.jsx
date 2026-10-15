
import { useVentas } from "../../hooks/operaciones/useVentas";

const formatearMoneda = (valor) =>
  new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
  }).format(valor);

export default function Ventas() {
  const {
    clientes,
    productos,
    idCliente,
    setIdCliente,
    fecha,
    setFecha,
    productosVenta,
    idProducto,
    setIdProducto,
    cantidadProducto,
    setCantidadProducto,
    mostrarFormulario,
    setMostrarFormulario,
    mostrarHistorial,
    ventaSeleccionada,
    setVentaSeleccionada,
    ventaEditando,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    mensaje,
    tipoMensaje,
    totalVenta,
    cantidadProductos,
    ventasFiltradas,
    totalVentas,
    montoTotalVentas,
    productosDisponibles,
    limpiarFiltros,
    limpiarFormulario,
    agregarProducto,
    cambiarCantidad,
    quitarProducto,
    guardarVenta,
    editarVenta,
    cancelarEdicion,
    anularVenta,
    alternarHistorial,
  } = useVentas();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ventas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Registra ventas y consulta las operaciones realizadas.
          </p>
        </div>

        <button
          type="button"
          onClick={alternarHistorial}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          {mostrarHistorial ? "Ocultar historial" : "Historial de ventas"}
        </button>
      </div>

      {mensaje && (
        <div
          role="status"
          className={`rounded-lg border p-3 text-sm ${
            tipoMensaje === "error"
              ? "border-red-300 bg-red-50 text-red-700"
              : tipoMensaje === "exito"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-gray-300 bg-gray-50 text-gray-700"
          }`}
        >
          {mensaje}
        </div>
      )}

      {mostrarHistorial && (
        <section className="space-y-4 rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Historial de ventas</h2>
              <p className="text-sm text-gray-500">
                Ventas registradas: {totalVentas}
              </p>
            </div>

            <p className="font-semibold">
              Total no anulado: {formatearMoneda(montoTotalVentas)}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar venta o cliente"
              className="rounded-lg border border-gray-300 px-3 py-2"
            />

            <select
              value={filtroEstado}
              onChange={(evento) => setFiltroEstado(evento.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Procesada">Procesada</option>
              <option value="Modificada">Modificada</option>
              <option value="Anulada">Anulada</option>
            </select>

            <input
              type="date"
              aria-label="Fecha desde"
              value={fechaDesde}
              onChange={(evento) => setFechaDesde(evento.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            />

            <input
              type="date"
              aria-label="Fecha hasta"
              value={fechaHasta}
              onChange={(evento) => setFechaHasta(evento.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={limpiarFiltros}
              className="text-sm text-blue-700 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3">N.º venta</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Productos</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {ventasFiltradas.map((venta) => (
                  <tr key={venta.id_venta} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{venta.numero_venta}</td>
                    <td className="p-3">{venta.fecha}</td>
                    <td className="p-3">{venta.cliente}</td>
                    <td className="p-3">{venta.productos.length}</td>
                    <td className="p-3">{formatearMoneda(venta.total)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs ${
                          venta.estado === "Anulada"
                            ? "bg-red-100 text-red-700"
                            : venta.estado === "Modificada"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {venta.estado}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setVentaSeleccionada(
                              ventaSeleccionada === venta.id_venta
                                ? null
                                : venta.id_venta
                            )
                          }
                          className="rounded border px-3 py-1 hover:bg-gray-100"
                        >
                          {ventaSeleccionada === venta.id_venta
                            ? "Ocultar"
                            : "Detalle"}
                        </button>

                        <button
                          type="button"
                          onClick={() => editarVenta(venta)}
                          disabled={venta.estado === "Anulada"}
                          className="rounded border border-blue-300 px-3 py-1 text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => anularVenta(venta)}
                          disabled={venta.estado === "Anulada"}
                          className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {venta.estado === "Anulada" ? "Anulada" : "Anular"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {ventasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No se encontraron ventas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {ventasFiltradas
            .filter((venta) => venta.id_venta === ventaSeleccionada)
            .map((venta) => (
              <div
                key={venta.id_venta}
                className="space-y-3 rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    Detalle de {venta.numero_venta}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Cliente: {venta.cliente} · Fecha: {venta.fecha}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[550px] text-left text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2">Código</th>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Cantidad</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venta.productos.map((item) => (
                        <tr key={item.id_producto} className="border-b">
                          <td className="p-2">{item.codigo_producto}</td>
                          <td className="p-2">{item.nombre}</td>
                          <td className="p-2">{item.cantidad}</td>
                          <td className="p-2">
                            {formatearMoneda(item.precio_unitario)}
                          </td>
                          <td className="p-2">
                            {formatearMoneda(
                              item.cantidad * item.precio_unitario
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-right font-semibold">
                  Total: {formatearMoneda(venta.total)}
                </div>
              </div>
            ))}
        </section>
      )}

      {mostrarFormulario && (
        <form onSubmit={guardarVenta} className="space-y-6">
          <section className="space-y-4 rounded-xl border border-gray-200 p-4">
            <div>
              <h2 className="text-lg font-semibold">
                {ventaEditando
                  ? `Editar ${ventaEditando.numero_venta}`
                  : "Información de la venta"}
              </h2>
              <p className="text-sm text-gray-500">
                Selecciona el cliente y la fecha de la operación.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="cliente" className="text-sm font-medium">
                  Cliente
                </label>
                <select
                  id="cliente"
                  required
                  value={idCliente}
                  onChange={(evento) => setIdCliente(evento.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Seleccionar cliente</option>
                  {clientes.map((cliente) => (
                    <option
                      key={cliente.id_cliente}
                      value={cliente.id_cliente}
                    >
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="fecha" className="text-sm font-medium">
                  Fecha de venta
                </label>
                <input
                  id="fecha"
                  type="date"
                  required
                  value={fecha}
                  onChange={(evento) => setFecha(evento.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-xl border border-gray-200 p-4">
            <div>
              <h2 className="text-lg font-semibold">Agregar productos</h2>
              <p className="text-sm text-gray-500">
                Selecciona un repuesto y la cantidad requerida.
              </p>
            </div>

            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_120px_auto]">
              <div className="space-y-1">
                <label htmlFor="producto" className="text-sm font-medium">
                  Producto
                </label>
                <select
                  id="producto"
                  value={idProducto}
                  onChange={(evento) => setIdProducto(evento.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Seleccionar producto</option>
                  {productosDisponibles.map((producto) => (
                    <option
                      key={producto.id_producto}
                      value={producto.id_producto}
                    >
                      {producto.codigo_producto} - {producto.nombre} (
                      {producto.existencia_actual} disponibles)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="cantidad" className="text-sm font-medium">
                  Cantidad
                </label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  step="1"
                  value={cantidadProducto}
                  onChange={(evento) =>
                    setCantidadProducto(evento.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <button
                type="button"
                onClick={agregarProducto}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100"
              >
                Agregar
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">Código</th>
                    <th className="p-3">Producto</th>
                    <th className="p-3">Precio unitario</th>
                    <th className="p-3">Cantidad</th>
                    <th className="p-3">Subtotal</th>
                    <th className="p-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productosVenta.map((item) => (
                    <tr key={item.id_producto} className="border-b">
                      <td className="p-3">{item.codigo_producto}</td>
                      <td className="p-3">{item.nombre}</td>
                      <td className="p-3">
                        {formatearMoneda(item.precio_unitario)}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.cantidad}
                          onChange={(evento) =>
                            cambiarCantidad(
                              item.id_producto,
                              evento.target.value
                            )
                          }
                          aria-label={`Cantidad de ${item.nombre}`}
                          className="w-20 rounded border px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        {formatearMoneda(
                          item.cantidad * item.precio_unitario
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => quitarProducto(item.id_producto)}
                          className="text-red-600 hover:underline"
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {productosVenta.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        No se han agregado productos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-end gap-1 border-t pt-4">
              <p className="text-sm text-gray-500">
                Unidades: {cantidadProductos}
              </p>
              <p className="text-sm text-gray-500">Total de la venta</p>
              <p className="text-2xl font-bold">
                {formatearMoneda(totalVenta)}
              </p>
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-3">
            {ventaEditando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
              >
                Cancelar edición
              </button>
            )}

            <button
              type="button"
              onClick={limpiarFormulario}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              {ventaEditando ? "Guardar cambios" : "Confirmar venta"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
