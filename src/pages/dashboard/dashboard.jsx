
import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const datosDemostracion = {
  indicadores: {
    productos: 248,
    clientes: 136,
    ventas: 86,
    compras: 32,
    valorInventario: 185450.75,
    stockBajo: 12,
    agotados: 4,
  },

  ventasSemana: [4200, 5800, 3900, 7200, 6500, 8900, 6100],

  productosMasVendidos: [
    { nombre: "Filtro de aceite", cantidad: 48 },
    { nombre: "Pastillas de freno", cantidad: 39 },
    { nombre: "Bujías", cantidad: 32 },
    { nombre: "Filtro de aire", cantidad: 27 },
    { nombre: "Aceite de motor", cantidad: 22 },
  ],

  inventario: {
    normal: 180,
    bajo: 12,
    agotado: 4,
  },

  ventasCategorias: [
    { nombre: "Motor", total: 24500 },
    { nombre: "Frenos", total: 18200 },
    { nombre: "Filtros", total: 14600 },
    { nombre: "Suspensión", total: 11200 },
    { nombre: "Eléctrico", total: 8900 },
  ],

  operaciones: [
    {
      id: 1,
      tipo: "Venta",
      referencia: "VNT-00086",
      descripcion: "Venta de repuestos",
      fecha: "10/10/2026",
      monto: 4250.0,
      estado: "Completada",
    },
    {
      id: 2,
      tipo: "Compra",
      referencia: "CMP-00032",
      descripcion: "Ingreso de mercancía",
      fecha: "10/10/2026",
      monto: 12750.0,
      estado: "Completada",
    },
    {
      id: 3,
      tipo: "Venta",
      referencia: "VNT-00085",
      descripcion: "Venta de repuestos",
      fecha: "09/10/2026",
      monto: 2850.0,
      estado: "Completada",
    },
    {
      id: 4,
      tipo: "Inventario",
      referencia: "MOV-00124",
      descripcion: "Movimiento de existencias",
      fecha: "09/10/2026",
      monto: null,
      estado: "Registrado",
    },
    {
      id: 5,
      tipo: "Compra",
      referencia: "CMP-00031",
      descripcion: "Ingreso de mercancía",
      fecha: "08/10/2026",
      monto: 8300.0,
      estado: "Completada",
    },
  ],
};

const formatoMoneda = (valor) =>
  new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    minimumFractionDigits: 2,
  }).format(valor);

const opcionesTooltip = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#0f172a",
      padding: 12,
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
    },
  },
};

function Indicador({ titulo, valor, detalle, icono, color }) {
  const colores = {
    azul: "bg-blue-50 text-blue-600",
    verde: "bg-emerald-50 text-emerald-600",
    violeta: "bg-violet-50 text-violet-600",
    naranja: "bg-orange-50 text-orange-600",
    rojo: "bg-red-50 text-red-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{titulo}</p>
          <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900">
            {valor}
          </p>
        </div>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${colores[color]}`}
        >
          {icono}
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-500">{detalle}</p>
    </article>
  );
}

function Panel({ titulo, descripcion, children, className = "" }) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 ${className}`}
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">{titulo}</h2>
        {descripcion && (
          <p className="mt-1 text-sm text-slate-500">{descripcion}</p>
        )}
      </div>

      {children}
    </section>
  );
}

function Inicio() {
  const [periodo, setPeriodo] = useState("semana");
  const datos = datosDemostracion;

  const datosVentas = useMemo(() => {
    const configuraciones = {
      semana: {
        etiquetas: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        valores: datos.ventasSemana,
      },
      mes: {
        etiquetas: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"],
        valores: [18500, 22400, 19800, 26700],
      },
      anio: {
        etiquetas: [
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
        ],
        valores: [68500, 72400, 81200, 75900, 93600, 102400],
      },
    };

    return configuraciones[periodo];
  }, [periodo, datos.ventasSemana]);

  const graficoVentas = {
    labels: datosVentas.etiquetas,
    datasets: [
      {
        label: "Ventas",
        data: datosVentas.valores,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.10)",
        fill: true,
        tension: 0.38,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#2563eb",
      },
    ],
  };

  const graficoProductos = {
    labels: datos.productosMasVendidos.map((producto) => producto.nombre),
    datasets: [
      {
        label: "Unidades vendidas",
        data: datos.productosMasVendidos.map(
          (producto) => producto.cantidad
        ),
        backgroundColor: [
          "#2563eb",
          "#0d9488",
          "#7c3aed",
          "#ea580c",
          "#0891b2",
        ],
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  const graficoInventario = {
    labels: ["Normal", "Stock bajo", "Agotado"],
    datasets: [
      {
        data: [
          datos.inventario.normal,
          datos.inventario.bajo,
          datos.inventario.agotado,
        ],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const opcionesInventario = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: opcionesTooltip.plugins.tooltip,
    },
  };

  const graficoCategorias = {
    labels: datos.ventasCategorias.map((categoria) => categoria.nombre),
    datasets: [
      {
        label: "Ventas",
        data: datos.ventasCategorias.map((categoria) => categoria.total),
        backgroundColor: "#3b82f6",
        borderRadius: 5,
        maxBarThickness: 30,
      },
    ],
  };

  const opcionesBarras = {
    ...opcionesTooltip,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#64748b",
          font: { size: 10 },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#475569",
          font: { size: 11 },
        },
      },
    },
  };

  const iconosOperacion = {
    Venta: {
      icono: "↗",
      clase: "bg-blue-50 text-blue-600",
    },
    Compra: {
      icono: "↙",
      clase: "bg-violet-50 text-violet-600",
    },
    Inventario: {
      icono: "▤",
      clase: "bg-orange-50 text-orange-600",
    },
  };

  return (
    <main className="space-y-6 text-slate-900">
      {/* Título del dashboard */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Panel principal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Resumen general del inventario y las operaciones del sistema.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
          <p className="text-xs text-slate-500">Fecha actual</p>
          <p className="mt-1 text-sm font-semibold">
            {new Date().toLocaleDateString("es-NI", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Indicadores principales */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold">Resumen general</h2>
          <p className="mt-1 text-sm text-slate-500">
            Indicadores de referencia para la gestión del sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Indicador
            titulo="Productos registrados"
            valor={datos.indicadores.productos}
            detalle="Productos en el catálogo"
            icono="▦"
            color="azul"
          />

          <Indicador
            titulo="Clientes registrados"
            valor={datos.indicadores.clientes}
            detalle="Clientes en el sistema"
            icono="♙"
            color="violeta"
          />

          <Indicador
            titulo="Ventas registradas"
            valor={datos.indicadores.ventas}
            detalle="Operaciones de venta de ejemplo"
            icono="↗"
            color="verde"
          />

          <Indicador
            titulo="Compras registradas"
            valor={datos.indicadores.compras}
            detalle="Operaciones de compra de ejemplo"
            icono="↙"
            color="naranja"
          />
        </div>
      </section>

      {/* Indicadores de inventario */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold">Estado del inventario</h2>
          <p className="mt-1 text-sm text-slate-500">
            Existencias y valorización de referencia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Indicador
            titulo="Valor del inventario"
            valor={formatoMoneda(datos.indicadores.valorInventario)}
            detalle="Valorización de demostración"
            icono="$"
            color="cyan"
          />

          <Indicador
            titulo="Stock bajo"
            valor={datos.indicadores.stockBajo}
            detalle="Productos que requieren revisión"
            icono="!"
            color="naranja"
          />

          <Indicador
            titulo="Productos agotados"
            valor={datos.indicadores.agotados}
            detalle="Productos sin existencias"
            icono="×"
            color="rojo"
          />
        </div>
      </section>

      {/* Ventas por período */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel
          titulo="Ventas por período"
          descripcion="Comportamiento de las ventas según el período seleccionado."
          className="xl:col-span-2"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Ventas registradas</p>
              <p className="mt-1 text-xl font-bold">
                {formatoMoneda(
                  datosVentas.valores.reduce((total, valor) => total + valor, 0)
                )}
              </p>
            </div>

            <select
              value={periodo}
              onChange={(evento) => setPeriodo(evento.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-label="Período de ventas"
            >
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="anio">Últimos meses</option>
            </select>
          </div>

          <div className="h-64">
            <Line
              data={graficoVentas}
              options={{
                ...opcionesTooltip,
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: "#64748b" },
                  },
                  y: {
                    beginAtZero: true,
                    grid: { color: "#f1f5f9" },
                    ticks: {
                      color: "#64748b",
                      callback: (valor) =>
                        `${Number(valor).toLocaleString("es-NI")}`,
                    },
                  },
                },
              }}
            />
          </div>
        </Panel>

        <Panel
          titulo="Estado de existencias"
          descripcion="Distribución ilustrativa de los productos."
        >
          <div className="relative mx-auto h-52 max-w-[240px]">
            <Doughnut data={graficoInventario} options={opcionesInventario} />

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">
                {datos.inventario.normal +
                  datos.inventario.bajo +
                  datos.inventario.agotado}
              </span>

              <span className="mt-1 text-xs text-slate-500">
                Productos
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              {
                nombre: "Stock normal",
                cantidad: datos.inventario.normal,
                color: "bg-emerald-500",
              },
              {
                nombre: "Stock bajo",
                cantidad: datos.inventario.bajo,
                color: "bg-amber-500",
              },
              {
                nombre: "Agotado",
                cantidad: datos.inventario.agotado,
                color: "bg-red-500",
              },
            ].map((item) => (
              <div
                key={item.nombre}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                  />
                  {item.nombre}
                </span>

                <span className="font-semibold text-slate-900">
                  {item.cantidad}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* Productos y categorías */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Panel
          titulo="Productos más vendidos"
          descripcion="Unidades vendidas por producto, según datos de ejemplo."
        >
          <div className="h-72">
            <Bar
              data={graficoProductos}
              options={{
                ...opcionesBarras,
                scales: {
                  ...opcionesBarras.scales,
                  x: {
                    ...opcionesBarras.scales.x,
                    ticks: {
                      ...opcionesBarras.scales.x.ticks,
                      precision: 0,
                    },
                  },
                },
              }}
            />
          </div>
        </Panel>

        <Panel
          titulo="Ventas por categoría"
          descripcion="Comparación de importes de venta por categoría."
        >
          <div className="h-72">
            <Bar
              data={graficoCategorias}
              options={{
                ...opcionesBarras,
                scales: {
                  ...opcionesBarras.scales,
                  x: {
                    ...opcionesBarras.scales.x,
                    ticks: {
                      color: "#64748b",
                      callback: (valor) =>
                        Number(valor).toLocaleString("es-NI"),
                    },
                  },
                },
                plugins: {
                  ...opcionesBarras.plugins,
                  tooltip: {
                    ...opcionesTooltip.plugins.tooltip,
                    callbacks: {
                      label: (contexto) =>
                        formatoMoneda(contexto.raw),
                    },
                  },
                },
              }}
            />
          </div>
        </Panel>
      </section>

      {/* Operaciones recientes */}
      <Panel
        titulo="Últimas operaciones"
        descripcion="Actividad reciente de ventas, compras y movimientos de inventario."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="rounded-l-lg px-4 py-3 font-semibold">
                  Operación
                </th>
                <th className="px-4 py-3 font-semibold">Referencia</th>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Importe</th>
                <th className="rounded-r-lg px-4 py-3 font-semibold">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {datos.operaciones.map((operacion) => {
                const estilo = iconosOperacion[operacion.tipo];

                return (
                  <tr
                    key={operacion.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${
                            estilo?.clase || "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {estilo?.icono || "•"}
                        </span>

                        <div>
                          <p className="font-medium text-slate-800">
                            {operacion.tipo}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {operacion.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-600">
                      {operacion.referencia}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                      {operacion.fecha}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800">
                      {operacion.monto === null
                        ? "—"
                        : formatoMoneda(operacion.monto)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          operacion.estado === "Completada"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {operacion.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Aviso de datos */}
      <p className="text-xs text-slate-400">
        Los indicadores, importes y operaciones son datos de demostración.
        Se sustituirán por información real al integrar la API REST de Laravel.
      </p>
    </main>
  );
}

export default Inicio;
