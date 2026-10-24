import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  ChartPie,
  CircleAlert,
  Clock3,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cargarListadoConCache, obtenerCacheListado } from "../../services/compartido/cacheListados";
import { cargarDatosDashboard } from "../../services/reportes/dashboardService";
import { formatearPrecio } from "../../utils/productos/formato";
import "./dashboard.css";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function fechaCorta(fecha) {
  const valor = new Date(`${String(fecha).slice(0, 10)}T12:00:00`);
  return Number.isNaN(valor.getTime())
    ? "Fecha no disponible"
    : new Intl.DateTimeFormat("es-NI", { day: "2-digit", month: "short" }).format(valor);
}

function fechaDeRegistro(registro) {
  return registro.fecha_venta ?? registro.fecha_compra ?? registro.created_at ?? "";
}

function etiquetaDia(fecha) {
  const valor = new Date(`${fecha}T12:00:00`);
  return DIAS[valor.getDay()];
}

function TarjetaIndicador({ titulo, valor, detalle, icono: Icono, color, variacion }) {
  return (
    <article className="dashboard-metric rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{titulo}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{valor}</p>
        </div>
        <span className={`dashboard-metric-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icono size={21} />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        {variacion === "positiva" ? <ArrowUpRight size={15} className="text-emerald-600" /> : null}
        {variacion === "negativa" ? <ArrowDownRight size={15} className="text-rose-600" /> : null}
        <span>{detalle}</span>
      </div>
    </article>
  );
}

function GraficoActividad({ dias }) {
  const maximo = Math.max(1, ...dias.flatMap((dia) => [dia.ventas, dia.compras]));
  return (
    <section className="dashboard-panel min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Actividad de la semana</h2>
          <p className="mt-1 text-sm text-slate-500">Ventas y compras confirmadas por día</p>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] font-medium text-slate-600 sm:gap-4 sm:text-xs">
          <span className="inline-flex items-center gap-2"><i className="dashboard-chart-key dashboard-chart-key-sales h-2.5 w-2.5 rounded-full bg-violet-500" />Ventas</span>
          <span className="inline-flex items-center gap-2"><i className="dashboard-chart-key dashboard-chart-key-purchases h-2.5 w-2.5 rounded-full bg-cyan-400" />Compras</span>
        </div>
      </div>
      <div className="dashboard-chart-area mt-6 grid h-44 min-w-0 grid-cols-7 items-end gap-1 rounded-xl px-1 sm:mt-7 sm:h-52 sm:gap-4 sm:px-2">
        {dias.map((dia) => {
          const alturaVentas = Math.max(dia.ventas ? 8 : 3, (dia.ventas / maximo) * 100);
          const alturaCompras = Math.max(dia.compras ? 8 : 3, (dia.compras / maximo) * 100);
          return (
            <div key={dia.fecha} className="flex h-full min-w-0 flex-col items-center justify-end gap-1.5 sm:gap-2">
              <div className="flex h-full w-full min-w-0 items-end justify-center gap-1 sm:gap-1.5">
                <div title={`Ventas ${formatearPrecio(dia.ventas)}`} className="dashboard-chart-bar dashboard-chart-bar-sales w-2 rounded-t-md bg-violet-500 transition-all sm:w-5" style={{ height: `${alturaVentas}%` }} />
                <div title={`Compras ${formatearPrecio(dia.compras)}`} className="dashboard-chart-bar dashboard-chart-bar-purchases w-2 rounded-t-md bg-cyan-400 transition-all sm:w-5" style={{ height: `${alturaCompras}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 sm:text-[11px]">{dia.etiqueta}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">Importes expresados en córdobas (C$).</p>
    </section>
  );
}

function InventarioBajo({ productos }) {
  return (
    <section className="dashboard-panel rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div>
          <h2 className="font-semibold text-slate-900">Atención al inventario</h2>
          <p className="mt-1 text-xs text-slate-500">Productos en mínimo o por debajo</p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{productos.length} alertas</span>
      </div>
      {productos.length ? (
        <ul className="divide-y divide-slate-100">
          {productos.slice(0, 10).map((producto) => (
            <li key={producto.id_producto} className="flex flex-col items-start gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5 sm:py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{producto.nombre_producto}</p>
                <p className="mt-0.5 text-xs text-slate-500">{producto.codigo_producto ?? "Sin código"}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-semibold text-rose-700 sm:text-xs">
                {producto.existencia} / {producto.existencia_minima} uds.
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-5 py-8 text-center">
          <PackageCheck size={24} className="mx-auto text-emerald-500" />
          <p className="mt-2 text-sm font-medium text-slate-700">Inventario al día</p>
          <p className="mt-1 text-xs text-slate-500">No hay productos en nivel mínimo.</p>
        </div>
      )}
      <Link to="/reportes/inventario" className="dashboard-panel-link block border-t border-slate-100 px-5 py-3 text-center text-sm font-medium text-violet-700 hover:bg-violet-50">Ver reporte de inventario</Link>
    </section>
  );
}

function GraficoEstadoInventario({ totalProductos, productosBajos }) {
  const bajos = Math.min(productosBajos, totalProductos);
  const adecuados = Math.max(0, totalProductos - bajos);
  const porcentajeBajo = totalProductos ? (bajos / totalProductos) * 100 : 0;
  const circunferencia = 314;
  const desplazamiento = circunferencia * (1 - porcentajeBajo / 100);

  return (
    <section className="dashboard-panel min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><ChartPie size={17} /></span>
        <div className="min-w-0"><h2 className="font-semibold text-slate-900">Estado del inventario</h2><p className="mt-1 text-xs text-slate-500">Productos según nivel mínimo</p></div>
      </div>
      <div className="mt-5 flex flex-col items-center gap-4">
        <div className="dashboard-stock-donut" style={{ "--stock-offset": `${desplazamiento}px` }} role="img" aria-label={`${bajos} productos requieren reposición de ${totalProductos} en total`}>
          <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="dashboard-stock-ring-track" cx="60" cy="60" r="50" /><circle className="dashboard-stock-ring" cx="60" cy="60" r="50" strokeDasharray={circunferencia} strokeDashoffset={circunferencia} /></svg>
          <div className="dashboard-stock-donut-center"><strong>{totalProductos ? `${Math.round((adecuados / totalProductos) * 100)}%` : "0%"}</strong><span>en nivel</span></div>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs text-slate-600"><i className="dashboard-stock-key dashboard-stock-key-ok" />Stock adecuado</span><strong className="text-sm text-slate-800">{adecuados}</strong></div>
          <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs text-slate-600"><i className="dashboard-stock-key dashboard-stock-key-low" />Requiere reposición</span><strong className="text-sm text-slate-800">{bajos}</strong></div>
          <p className="border-t border-slate-100 pt-2 text-[10px] text-slate-400">Total de productos: {totalProductos}</p>
        </div>
      </div>
    </section>
  );
}

function ProductosDestacados({ productos }) {
  const destacados = productos.slice(0, 5);
  const maximo = Math.max(1, ...destacados.map((producto) => Number(producto.total_vendido ?? 0)));
  return (
    <section className="dashboard-panel min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Productos más vendidos</h2>
          <p className="mt-1 text-sm text-slate-500">Rendimiento del mes</p>
        </div>
        <span className="dashboard-trending-icon flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-700"><TrendingUp size={19} /></span>
      </div>
      {destacados.length ? (
        <ol className="dashboard-product-ranking mt-4 space-y-3 sm:mt-5">
          {destacados.map((producto, indice) => {
            const unidades = Number(producto.total_vendido ?? 0);
            return (
              <li key={producto.id_producto ?? producto.producto?.id_producto ?? indice} className="dashboard-product-item flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 px-2 py-2.5 sm:gap-3 sm:px-3">
                <span className={`dashboard-product-rank ${indice === 0 ? "is-first" : ""}`}>{String(indice + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-[11px] font-semibold text-slate-700 sm:text-xs">{producto.producto?.nombre_producto ?? "Producto"}</span>
                    <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">{unidades} uds.</span>
                  </div>
                  <div className="dashboard-product-track h-2 overflow-hidden rounded-full"><div className="dashboard-product-fill h-full rounded-full" style={{ width: `${Math.max(5, (unidades / maximo) * 100)}%`, animationDelay: `${120 + indice * 90}ms` }} /></div>
                </div>
              </li>
            );
          })}
        </ol>
      ) : <p className="py-8 text-center text-sm text-slate-500">Todavía no hay ventas para mostrar.</p>}
    </section>
  );
}

function VentasRecientes({ ventas }) {
  const recientes = ventas.slice(0, 10);
  return (
    <section className="dashboard-panel rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
        <div>
          <h2 className="font-semibold text-slate-900">Ventas recientes</h2>
          <p className="mt-1 text-xs text-slate-500">Últimos movimientos del mes</p>
        </div>
        <Clock3 size={19} className="text-slate-400" />
      </div>
      {recientes.length ? <ul className="divide-y divide-slate-100">
        {recientes.map((venta) => (
          <li key={venta.id_venta} className="flex items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-5 sm:py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="dashboard-sales-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><ShoppingBag size={17} /></span>
              <div className="min-w-0"><p className="truncate text-sm font-medium text-slate-800">{venta.cliente?.nombre_cliente ?? venta.numero_venta ?? "Venta"}</p><p className="mt-0.5 text-xs text-slate-500">{fechaCorta(fechaDeRegistro(venta))} · {venta.estado ?? "Sin estado"}</p></div>
            </div>
            <span className="shrink-0 text-xs font-semibold text-slate-800 sm:text-sm">{formatearPrecio(venta.total)}</span>
          </li>
        ))}
      </ul> : <p className="px-5 py-8 text-center text-sm text-slate-500">No hay ventas registradas este mes.</p>}
      <Link to="/ventas" className="dashboard-panel-link block border-t border-slate-100 px-5 py-3 text-center text-sm font-medium text-violet-700 hover:bg-violet-50">Ir al módulo de ventas</Link>
    </section>
  );
}

const DATOS_DASHBOARD_VACIOS = {
  total_productos: 0,
  stock_bajo: [],
  financiero: null,
  actividad: [],
  productos_destacados: [],
  ventas_recientes: [],
};

// Presenta la última copia disponible mientras la nueva solicitud se resuelve.
function obtenerDatosEnCache() {
  return obtenerCacheListado(cargarDatosDashboard)?.datos ?? DATOS_DASHBOARD_VACIOS;
}

export default function Dashboard() {
  const [actualizacion, setActualizacion] = useState(0);
  const [datos, setDatos] = useState(obtenerDatosEnCache);
  const [cargando, setCargando] = useState(() => obtenerCacheListado(cargarDatosDashboard) === null);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    cargarListadoConCache(cargarDatosDashboard, { forzar: actualizacion > 0 }).then((resultado) => {
      if (!activo) return;
      setDatos(resultado.datos ?? DATOS_DASHBOARD_VACIOS);
      setError("");
      setCargando(false);
    }).catch(() => {
      if (!activo) return;
      setDatos(obtenerDatosEnCache());
      setError("No se pudo conectar con los servicios del dashboard. Comprueba que la API esté disponible.");
      setCargando(false);
    });
    return () => { activo = false; };
  }, [actualizacion]);

  // Mantiene los indicadores actualizados en segundo plano sin acción manual.
  useEffect(() => {
    const actualizarEnSegundoPlano = () => {
      if (document.visibilityState === "visible") {
        setActualizacion((valor) => valor + 1);
      }
    };
    const intervalo = window.setInterval(actualizarEnSegundoPlano, 60_000);
    document.addEventListener("visibilitychange", actualizarEnSegundoPlano);
    return () => {
      window.clearInterval(intervalo);
      document.removeEventListener("visibilitychange", actualizarEnSegundoPlano);
    };
  }, []);

  const dias = useMemo(() => (datos.actividad ?? []).map((dia) => ({ ...dia, etiqueta: etiquetaDia(dia.fecha) })), [datos.actividad]);
  const masVendidos = datos.productos_destacados ?? [];
  const ventasRecientes = datos.ventas_recientes ?? [];
  const balance = Number(datos.financiero?.balance_neto ?? 0);
  return (
    <div className={`dashboard-page space-y-6 pb-8 ${cargando ? "" : "dashboard-ready"}`}>
      {error && <div role="status" className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"><CircleAlert size={18} className="mt-0.5 shrink-0" />{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaIndicador titulo="Ingresos por ventas" valor={formatearPrecio(datos.financiero?.total_ingresos_ventas)} detalle="Ventas confirmadas este mes" icono={ArrowUpRight} color="bg-emerald-100 text-emerald-700" variacion="positiva" />
        <TarjetaIndicador titulo="Compras realizadas" valor={formatearPrecio(datos.financiero?.total_egresos_compras)} detalle="Compras confirmadas este mes" icono={ShoppingBag} color="bg-cyan-100 text-cyan-700" />
        <TarjetaIndicador titulo="Balance del período" valor={formatearPrecio(balance)} detalle={balance >= 0 ? "Ingresos menos compras" : "Compras superan los ingresos"} icono={balance >= 0 ? TrendingUp : ArrowDownRight} color={balance >= 0 ? "bg-violet-100 text-violet-700" : "bg-rose-100 text-rose-700"} variacion={balance >= 0 ? "positiva" : "negativa"} />
        <TarjetaIndicador titulo="Productos en catálogo" valor={Number(datos.total_productos ?? 0).toLocaleString("es-NI")} detalle={`${datos.stock_bajo.length} requieren reposición`} icono={Boxes} color="bg-amber-100 text-amber-700" />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <GraficoActividad dias={dias} />
        <ProductosDestacados productos={masVendidos} />
        <GraficoEstadoInventario totalProductos={Number(datos.total_productos ?? 0)} productosBajos={datos.stock_bajo.length} />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <InventarioBajo productos={datos.stock_bajo} />
        <VentasRecientes ventas={ventasRecientes} />
      </section>
    </div>
  );
}
