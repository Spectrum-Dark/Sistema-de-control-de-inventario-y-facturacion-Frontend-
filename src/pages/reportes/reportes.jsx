import { useMemo, useState } from "react";

const reportes = [
  {
    id: "REP-01",
    nombre: "Ventas por período",
    descripcion: "Consulta las ventas realizadas dentro de un período determinado.",
    columnas: [
      { clave: "fecha", nombre: "Fecha" },
      { clave: "numero", nombre: "N.º venta" },
      { clave: "cliente", nombre: "Cliente" },
      { clave: "operador", nombre: "Operador" },
      { clave: "total", nombre: "Total" },
    ],
    datos: [
      { fecha: "2026-10-01", numero: "VTA-001", cliente: "Cliente 001", operador: "Usuario 001", total: 2450 },
      { fecha: "2026-10-03", numero: "VTA-002", cliente: "Cliente 002", operador: "Usuario 002", total: 1875 },
      { fecha: "2026-10-05", numero: "VTA-003", cliente: "Cliente 003", operador: "Usuario 001", total: 3200 },
    ],
  },
  {
    id: "REP-02",
    nombre: "Detalle de ventas",
    descripcion: "Consulta los productos y cantidades incluidos en cada venta.",
    columnas: [
      { clave: "numero", nombre: "N.º venta" },
      { clave: "fecha", nombre: "Fecha" },
      { clave: "producto", nombre: "Producto" },
      { clave: "cantidad", nombre: "Cantidad" },
      { clave: "precio", nombre: "Precio unitario" },
      { clave: "subtotal", nombre: "Subtotal" },
    ],
    datos: [
      { numero: "VTA-001", fecha: "2026-10-01", producto: "Filtro de aceite", cantidad: 2, precio: 350, subtotal: 700 },
      { numero: "VTA-002", fecha: "2026-10-03", producto: "Bujía estándar", cantidad: 5, precio: 125, subtotal: 625 },
      { numero: "VTA-003", fecha: "2026-10-05", producto: "Pastillas de freno", cantidad: 1, precio: 3200, subtotal: 3200 },
    ],
  },
  {
    id: "REP-03",
    nombre: "Compras por período",
    descripcion: "Consulta las compras registradas y sus importes.",
    columnas: [
      { clave: "fecha", nombre: "Fecha" },
      { clave: "numero", nombre: "N.º compra" },
      { clave: "proveedor", nombre: "Proveedor" },
      { clave: "operador", nombre: "Registrado por" },
      { clave: "total", nombre: "Total" },
    ],
    datos: [
      { fecha: "2026-10-01", numero: "COM-001", proveedor: "Proveedor 001", operador: "Usuario 001", total: 8500 },
      { fecha: "2026-10-03", numero: "COM-002", proveedor: "Proveedor 002", operador: "Usuario 002", total: 6200 },
      { fecha: "2026-10-06", numero: "COM-003", proveedor: "Proveedor 003", operador: "Usuario 001", total: 11400 },
    ],
  },
  {
    id: "REP-04",
    nombre: "Inventario actual",
    descripcion: "Consulta las existencias disponibles de los productos registrados.",
    columnas: [
      { clave: "codigo", nombre: "Código" },
      { clave: "producto", nombre: "Producto" },
      { clave: "categoria", nombre: "Categoría" },
      { clave: "existencia", nombre: "Existencia" },
      { clave: "minimo", nombre: "Stock mínimo" },
      { clave: "maximo", nombre: "Stock máximo" },
    ],
    datos: [
      { codigo: "REP-001", producto: "Filtro de aceite", categoria: "Filtros", existencia: 25, minimo: 5, maximo: 50 },
      { codigo: "REP-002", producto: "Bujía estándar", categoria: "Encendido", existencia: 8, minimo: 10, maximo: 60 },
      { codigo: "REP-003", producto: "Pastillas de freno", categoria: "Frenos", existencia: 0, minimo: 5, maximo: 30 },
    ],
  },
  {
    id: "REP-05",
    nombre: "Valorización",
    descripcion: "Consulta el valor económico de las existencias actuales.",
    columnas: [
      { clave: "codigo", nombre: "Código" },
      { clave: "producto", nombre: "Producto" },
      { clave: "existencia", nombre: "Existencia" },
      { clave: "costo", nombre: "Costo unitario" },
      { clave: "valor", nombre: "Valor inventario" },
    ],
    datos: [
      { codigo: "REP-001", producto: "Filtro de aceite", existencia: 25, costo: 250, valor: 6250 },
      { codigo: "REP-002", producto: "Bujía estándar", existencia: 8, costo: 80, valor: 640 },
      { codigo: "REP-003", producto: "Pastillas de freno", existencia: 0, costo: 2100, valor: 0 },
    ],
  },
  {
    id: "REP-06",
    nombre: "Kardex",
    descripcion: "Consulta el historial de entradas, salidas y ajustes de existencias.",
    columnas: [
      { clave: "fecha", nombre: "Fecha" },
      { clave: "producto", nombre: "Producto" },
      { clave: "tipo", nombre: "Movimiento" },
      { clave: "referencia", nombre: "Referencia" },
      { clave: "entrada", nombre: "Entrada" },
      { clave: "salida", nombre: "Salida" },
      { clave: "saldo", nombre: "Saldo" },
    ],
    datos: [
      { fecha: "2026-10-01", producto: "Filtro de aceite", tipo: "Entrada", referencia: "COM-001", entrada: 30, salida: 0, saldo: 30 },
      { fecha: "2026-10-02", producto: "Filtro de aceite", tipo: "Salida", referencia: "VTA-001", entrada: 0, salida: 2, saldo: 28 },
      { fecha: "2026-10-05", producto: "Filtro de aceite", tipo: "Salida", referencia: "VTA-003", entrada: 0, salida: 3, saldo: 25 },
    ],
  },
  {
    id: "REP-07",
    nombre: "Stock bajo",
    descripcion: "Identifica productos con existencias iguales o inferiores al mínimo establecido.",
    columnas: [
      { clave: "codigo", nombre: "Código" },
      { clave: "producto", nombre: "Producto" },
      { clave: "categoria", nombre: "Categoría" },
      { clave: "existencia", nombre: "Existencia" },
      { clave: "minimo", nombre: "Stock mínimo" },
      { clave: "estado", nombre: "Estado" },
    ],
    datos: [
      { codigo: "REP-002", producto: "Bujía estándar", categoria: "Encendido", existencia: 8, minimo: 10, estado: "Stock bajo" },
      { codigo: "REP-003", producto: "Pastillas de freno", categoria: "Frenos", existencia: 0, minimo: 5, estado: "Agotado" },
      { codigo: "REP-004", producto: "Correa de distribución", categoria: "Motor", existencia: 3, minimo: 5, estado: "Stock bajo" },
    ],
  },
  {
    id: "REP-08",
    nombre: "Ventas por cliente",
    descripcion: "Consulta el importe acumulado de las ventas realizadas a cada cliente.",
    columnas: [
      { clave: "cliente", nombre: "Cliente" },
      { clave: "cantidad", nombre: "N.º de ventas" },
      { clave: "ultima", nombre: "Última venta" },
      { clave: "total", nombre: "Total vendido" },
    ],
    datos: [
      { cliente: "Cliente 001", cantidad: 4, ultima: "2026-10-05", total: 7850 },
      { cliente: "Cliente 002", cantidad: 2, ultima: "2026-10-03", total: 3875 },
      { cliente: "Cliente 003", cantidad: 3, ultima: "2026-10-06", total: 9400 },
    ],
  },
  {
    id: "REP-09",
    nombre: "Ventas por operador",
    descripcion: "Consulta el importe y la cantidad de ventas registradas por operador.",
    columnas: [
      { clave: "operador", nombre: "Operador" },
      { clave: "cantidad", nombre: "N.º de ventas" },
      { clave: "total", nombre: "Total vendido" },
      { clave: "promedio", nombre: "Promedio por venta" },
    ],
    datos: [
      { operador: "Usuario 001", cantidad: 12, total: 24500, promedio: 24500 / 12 },
      { operador: "Usuario 002", cantidad: 8, total: 16800, promedio: 16800 / 8 },
      { operador: "Usuario 003", cantidad: 5, total: 9200, promedio: 9200 / 5 },
    ],
  },
];

const formatoMoneda = (valor) =>
  new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    minimumFractionDigits: 2,
  }).format(Number(valor) || 0);

const formatoNumero = (valor) =>
  new Intl.NumberFormat("es-NI", {
    maximumFractionDigits: 2,
  }).format(Number(valor) || 0);

const fechaActual = new Date().toISOString().slice(0, 10);

function mostrarValor(clave, valor) {
  if (valor === undefined || valor === null || valor === "") return "—";

  if (["total", "precio", "subtotal", "costo", "valor", "promedio"].includes(clave)) {
    return formatoMoneda(valor);
  }

  if (["cantidad", "existencia", "minimo", "maximo", "entrada", "salida", "saldo"].includes(clave)) {
    return formatoNumero(valor);
  }

  return valor;
}

function obtenerEstadoClase(estado) {
  if (estado === "Agotado") {
    return "bg-red-50 text-red-700 ring-red-600/20";
  }

  if (estado === "Stock bajo") {
    return "bg-amber-50 text-amber-700 ring-amber-600/20";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
}

export default function Reportes() {
  const [reporteActivo, setReporteActivo] = useState("REP-01");
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("2026-10-01");
  const [fechaFin, setFechaFin] = useState(fechaActual);
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 10;

  const reporte = reportes.find((item) => item.id === reporteActivo);

  const datosFiltrados = useMemo(() => {
    if (!reporte) return [];

    return reporte.datos.filter((registro) => {
      const coincideBusqueda = Object.values(registro).some((valor) =>
        String(valor).toLowerCase().includes(busqueda.trim().toLowerCase())
      );

      const tieneFecha = Boolean(registro.fecha);
      const coincideFecha =
        !tieneFecha ||
        ((!fechaInicio || registro.fecha >= fechaInicio) &&
          (!fechaFin || registro.fecha <= fechaFin));

      return coincideBusqueda && coincideFecha;
    });
  }, [reporte, busqueda, fechaInicio, fechaFin]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(datosFiltrados.length / registrosPorPagina)
  );

  const datosPagina = datosFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  function cambiarReporte(id) {
    setReporteActivo(id);
    setBusqueda("");
    setPagina(1);
  }

  function limpiarFiltros() {
    setBusqueda("");
    setFechaInicio("");
    setFechaFin("");
    setPagina(1);
  }

  function manejarBusqueda(valor) {
    setBusqueda(valor);
    setPagina(1);
  }

  function manejarFechaInicio(valor) {
    setFechaInicio(valor);
    setPagina(1);
  }

  function manejarFechaFin(valor) {
    setFechaFin(valor);
    setPagina(1);
  }

  const mostrarFiltrosFecha = ["REP-01", "REP-02", "REP-03", "REP-06"].includes(
    reporteActivo
  );

  const totalVentas = datosFiltrados.reduce(
    (total, registro) => total + (Number(registro.total) || 0),
    0
  );

  const totalInventario = datosFiltrados.reduce(
    (total, registro) => total + (Number(registro.valor) || 0),
    0
  );

  return (
    <main className="space-y-6 text-slate-900">
      {/* Encabezado del módulo */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Consultas y análisis
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Reportes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Consulta información de ventas, compras e inventario.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 sm:self-auto">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 19V5m0 14h16M8 15v-4m4 4V7m4 8V9"
              />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Reportes disponibles
            </p>
            <p className="text-sm font-bold text-slate-800">09 reportes</p>
          </div>
        </div>
      </section>

      {/* Menú compacto de reportes */}
      <section className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Seleccionar reporte
          </h2>
          <span className="text-[11px] text-slate-400">
            {reporteActivo} seleccionado
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {reportes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => cambiarReporte(item.id)}
              className={`shrink-0 rounded-xl border px-3 py-2 text-left transition-colors ${
                reporteActivo === item.id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <span
                className={`block text-[10px] font-bold tracking-wider ${
                  reporteActivo === item.id ? "text-blue-100" : "text-slate-400"
                }`}
              >
                {item.id}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-xs font-semibold">
                {item.nombre}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Información del reporte seleccionado */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold tracking-wider text-blue-700">
                {reporte.id}
              </span>
              <span className="text-xs text-slate-400">
                Reporte de gestión
              </span>
            </div>

            <h2 className="mt-2 text-lg font-bold text-slate-900">
              {reporte.nombre}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              {reporte.descripcion}
            </p>
          </div>

          <button
            type="button"
            onClick={limpiarFiltros}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M7 4h10M6 7l1 13h10l1-13M10 11v5m4-5v5"
              />
            </svg>
            Limpiar filtros
          </button>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* Filtros */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mostrarFiltrosFecha && (
            <>
              <div>
                <label
                  htmlFor="fechaInicio"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Fecha inicial
                </label>
                <input
                  id="fechaInicio"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => manejarFechaInicio(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                />
              </div>

              <div>
                <label
                  htmlFor="fechaFin"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Fecha final
                </label>
                <input
                  id="fechaFin"
                  type="date"
                  min={fechaInicio || undefined}
                  value={fechaFin}
                  onChange={(e) => manejarFechaFin(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                />
              </div>
            </>
          )}

          <div className={mostrarFiltrosFecha ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-3"}>
            <label
              htmlFor="busquedaReporte"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Buscar registros
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m16 16 4 4" />
              </svg>
              <input
                id="busquedaReporte"
                type="text"
                value={busqueda}
                onChange={(e) => manejarBusqueda(e.target.value)}
                placeholder="Buscar por código, nombre o referencia..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resumen contextual */}
      {["REP-01", "REP-03", "REP-05", "REP-07"].includes(reporteActivo) && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {["REP-01", "REP-03"].includes(reporteActivo) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total registrado
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {formatoMoneda(totalVentas)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Suma de los registros visibles en este ejemplo.
              </p>
            </div>
          )}

          {reporteActivo === "REP-05" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Valor de las existencias
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {formatoMoneda(totalInventario)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Calculado a partir de los registros visibles.
              </p>
            </div>
          )}

          {reporteActivo === "REP-07" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Productos que requieren atención
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {datosFiltrados.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Registros de ejemplo que cumplen la condición de stock bajo.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Tabla del reporte */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Resultados del reporte
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Información de muestra para visualizar el módulo.
            </p>
          </div>

          <span className="self-start rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 sm:self-auto">
            {datosFiltrados.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left text-xs">
            <thead className="bg-slate-50">
              <tr>
                {reporte.columnas.map((columna) => (
                  <th
                    key={columna.clave}
                    scope="col"
                    className="whitespace-nowrap px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {columna.nombre}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {datosPagina.map((registro, indice) => (
                <tr
                  key={`${reporteActivo}-${indice}`}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  {reporte.columnas.map((columna) => (
                    <td
                      key={columna.clave}
                      className="whitespace-nowrap px-5 py-4"
                    >
                      {columna.clave === "estado" ? (
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${obtenerEstadoClase(
                            registro[columna.clave]
                          )}`}
                        >
                          {registro[columna.clave]}
                        </span>
                      ) : columna.clave === "numero" || columna.clave === "codigo" ? (
                        <span className="font-semibold text-slate-800">
                          {registro[columna.clave]}
                        </span>
                      ) : (
                        mostrarValor(columna.clave, registro[columna.clave])
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {datosPagina.length === 0 && (
                <tr>
                  <td
                    colSpan={reporte.columnas.length}
                    className="px-5 py-12 text-center"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m16 16 4 4" />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No se encontraron registros
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Prueba con otros términos o modifica los filtros.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Mostrando{" "}
            <span className="font-bold text-slate-700">
              {datosFiltrados.length === 0
                ? 0
                : (pagina - 1) * registrosPorPagina + 1}
              {"–"}
              {Math.min(pagina * registrosPorPagina, datosFiltrados.length)}
            </span>{" "}
            de{" "}
            <span className="font-bold text-slate-700">
              {datosFiltrados.length}
            </span>{" "}
            registros
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPagina((actual) => Math.max(1, actual - 1))}
              disabled={pagina === 1}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
              {pagina} / {totalPaginas}
            </span>

            <button
              type="button"
              onClick={() =>
                setPagina((actual) => Math.min(totalPaginas, actual + 1))
              }
              disabled={pagina >= totalPaginas}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>

      <p className="text-xs leading-relaxed text-slate-400">
        Los registros y montos mostrados son datos de ejemplo para la interfaz.
        En la integración con Laravel, los resultados se obtendrán de la API
        según los filtros y permisos del usuario.
      </p>
    </main>
  );
}