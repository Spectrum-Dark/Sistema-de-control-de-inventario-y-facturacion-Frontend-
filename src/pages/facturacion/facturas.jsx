import { useEffect, useState } from "react";
import useFacturas from "../../hooks/facturacion/useFacturas";
import "../../components/facturacion/voucher/vista_voucher.css";

export default function Facturas() {
  const {
    facturas,
    totalRegistros,
    paginaActual,
    totalPaginas,
    busqueda,
    fechaDesde,
    fechaHasta,
    facturaSeleccionada,
    setBusqueda,
    setFechaDesde,
    setFechaHasta,
    consultarFactura,
    limpiarFiltros,
    cambiarPagina,
  } = useFacturas();

  const [formatoImpresion, setFormatoImpresion] = useState("58mm");

  // ============================================================
  // FORMATO DE MONEDA
  // ============================================================

  const moneda = (valor) =>
    Number(valor ?? 0).toLocaleString("es-NI", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // ============================================================
  // IMPRESIÓN DE FACTURA O VOUCHER
  // ============================================================

  function imprimirConFormato() {
    if (!facturaSeleccionada) return;

    document.body.classList.remove("print-voucher", "print-factura");

    if (formatoImpresion === "a4") {
      document.body.classList.add("print-factura");
    } else {
      document.body.classList.add("print-voucher");
    }

    window.print();
  }

  useEffect(() => {
    function limpiarModoImpresion() {
      document.body.classList.remove("print-voucher", "print-factura");
    }

    window.addEventListener("afterprint", limpiarModoImpresion);

    return () => {
      window.removeEventListener("afterprint", limpiarModoImpresion);
      limpiarModoImpresion();
    };
  }, []);

  // ============================================================
  // VISTA PRINCIPAL
  // ============================================================

  return (
    <main className="space-y-6">
      {/* Encabezado del módulo */}
      <div className="print:hidden">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Facturación
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Consulta las ventas registradas, visualiza sus facturas e imprime
          los comprobantes.
        </p>
      </div>

      {/* ========================================================
          FILTROS
      ======================================================== */}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Consultar facturas
          </h2>

          <span className="text-xs font-semibold text-slate-500">
            {totalRegistros} registros encontrados
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
          <div>
            <label
              htmlFor="busqueda"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Número de factura o cliente
            </label>

            <input
              id="busqueda"
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por código o cliente..."
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="fecha_desde"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Fecha desde
            </label>

            <input
              id="fecha_desde"
              type="date"
              value={fechaDesde}
              onChange={(evento) => setFechaDesde(evento.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="fecha_hasta"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Fecha hasta
            </label>

            <input
              id="fecha_hasta"
              type="date"
              value={fechaHasta}
              min={fechaDesde || undefined}
              onChange={(evento) => setFechaHasta(evento.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={limpiarFiltros}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      {/* ========================================================
          TABLA DE FACTURAS
      ======================================================== */}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Ventas disponibles para facturación
          </h2>

          <span className="text-xs font-semibold text-slate-500">
            Página {paginaActual} de {totalPaginas}
          </span>
        </div>

        {facturas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No se encontraron facturas
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Probá modificar los filtros de búsqueda.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Número de factura</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {facturas.map((factura) => {
                    const seleccionada =
                      facturaSeleccionada?.id_factura === factura.id_factura;

                    return (
                      <tr
                        key={factura.id_factura}
                        className={`transition hover:bg-slate-50/70 ${
                          seleccionada ? "bg-blue-50/60" : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">
                          {factura.numero_factura}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                          {factura.fecha}
                        </td>

                        <td className="px-4 py-3">
                          {factura.cliente}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 font-black text-slate-900">
                          C$ {moneda(factura.total)}
                        </td>

                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                            {factura.estado}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => consultarFactura(factura)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                              seleccionada
                                ? "bg-blue-100 text-blue-700"
                                : "text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {seleccionada ? "Seleccionada" : "Ver factura"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-500">
                Página{" "}
                <strong className="text-slate-800">{paginaActual}</strong>{" "}
                de{" "}
                <strong className="text-slate-800">{totalPaginas}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={paginaActual === 1}
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>

                <button
                  type="button"
                  disabled={paginaActual === totalPaginas}
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ========================================================
          DETALLE DE LA FACTURA SELECCIONADA
      ======================================================== */}

      {facturaSeleccionada && (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Detalle de la factura
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Comprobante {facturaSeleccionada.numero_factura}
              </p>
            </div>

            <button
              type="button"
              onClick={() => consultarFactura(null)}
              className="self-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 sm:self-auto"
            >
              Cerrar detalle
            </button>
          </div>

          {/* Información general */}
          <div
            id="factura-imprimible"
            className="space-y-4 text-xs text-slate-700"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Número
                </span>
                <span className="font-bold text-slate-900">
                  {facturaSeleccionada.numero_factura}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Fecha
                </span>
                <span>{facturaSeleccionada.fecha}</span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Cliente
                </span>
                <span className="font-semibold text-slate-800">
                  {facturaSeleccionada.cliente}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Estado
                </span>
                <span className="font-bold text-emerald-600">
                  {facturaSeleccionada.estado}
                </span>
              </div>
            </div>

            {/* Productos de la factura */}
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Código</th>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3">Cantidad</th>
                    <th className="px-4 py-3">Precio unitario</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {facturaSeleccionada.detalles.map((detalle) => (
                    <tr
                      key={`${facturaSeleccionada.id_factura}-${detalle.id_producto}`}
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                        {detalle.codigo_producto}
                      </td>

                      <td className="px-4 py-3">
                        {detalle.producto}
                      </td>

                      <td className="px-4 py-3">
                        {detalle.cantidad}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3">
                        C$ {moneda(detalle.precio_venta)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-slate-900">
                        C$ {moneda(detalle.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4 text-sm font-black text-slate-900">
              Total: C$ {moneda(facturaSeleccionada.total)}
            </div>
          </div>

          {/* Opciones de impresión */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <label
                htmlFor="formato_impresion"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Formato de impresión
              </label>

              <select
                id="formato_impresion"
                value={formatoImpresion}
                onChange={(evento) => setFormatoImpresion(evento.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 sm:min-w-64"
              >
                <option value="58mm">Voucher térmico - 58 mm</option>
                <option value="80mm">Voucher térmico - 80 mm</option>
                <option value="a4">Hoja convencional - A4</option>
              </select>
            </div>

            <button
              type="button"
              onClick={imprimirConFormato}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H9v4zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Imprimir comprobante
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          VOUCHER IMPRIMIBLE
          Reutiliza los estilos existentes de vista_voucher.css.
      ======================================================== */}

      {facturaSeleccionada && (
        <article
          className={`voucher voucher-${formatoImpresion}`}
          id="vista-voucher"
        >
          <div className="voucher-encabezado">
            <h2>FACTURA DE VENTA</h2>
            <p>Sistema de Repuestos Vehiculares</p>
            <p>Documento demostrativo</p>
          </div>

          <hr />

          <div className="voucher-datos">
            <p>
              <strong>Factura:</strong>{" "}
              {facturaSeleccionada.numero_factura}
            </p>

            <p>
              <strong>Fecha:</strong> {facturaSeleccionada.fecha}
            </p>

            <p>
              <strong>Cliente:</strong> {facturaSeleccionada.cliente}
            </p>

            <p>
              <strong>Estado:</strong> {facturaSeleccionada.estado}
            </p>
          </div>

          <hr />

          <table className="voucher-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {facturaSeleccionada.detalles.map((detalle) => (
                <tr
                  key={`${facturaSeleccionada.id_factura}-${detalle.id_producto}-voucher`}
                >
                  <td>
                    <span>{detalle.codigo_producto}</span>
                    <br />
                    {detalle.producto}
                    <br />
                    <small>Precio: {moneda(detalle.precio_venta)}</small>
                  </td>

                  <td>{detalle.cantidad}</td>

                  <td>{moneda(detalle.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div className="voucher-total">
            <strong>TOTAL</strong>
            <strong>C$ {moneda(facturaSeleccionada.total)}</strong>
          </div>

          <hr />

          <div className="voucher-pie">
            <p>Gracias por su compra</p>
            <p>Conserve este comprobante</p>
          </div>
        </article>
      )}
    </main>
  );
}
