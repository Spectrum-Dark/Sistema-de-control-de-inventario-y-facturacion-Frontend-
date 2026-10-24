import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CalendarDays,
  CircleAlert,
  Clock3,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  obtenerInventarioActual,
  obtenerInventarioStockBajo,
  obtenerReporteCompras,
  obtenerReporteFinanciero,
  obtenerReporteVentas,
} from "../../services/reportes/reportesService";
import { formatearPrecio } from "../../utils/productos/formato";
import "./dashboard.css";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Formatea fechas con hora local para que el rango coincida con la fecha que ve el usuario.
function fechaLocal(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function obtenerRangoMes() {
  const ahora = new Date();
  return {
    fecha_inicio: fechaLocal(new Date(ahora.getFullYear(), ahora.getMonth(), 1)),
    fecha_fin: fechaLocal(ahora),
  };
}

function fechaCorta(fecha) {
  const valor = new Date(`${String(fecha).slice(0, 10)}T12:00:00`);
  return Number.isNaN(valor.getTime())
    ? "Fecha no disponible"
    : new Intl.DateTimeFormat("es-NI", { day: "2-digit", month: "short" }).format(valor);
}

function fechaDeRegistro(registro) {
  return registro.fecha_venta ?? registro.fecha_compra ?? registro.created_at ?? "";
}

function agruparPorDia(ventas, compras) {
  const hoy = new Date();
  const dias = Array.from({ length: 7 }, (_, indice) => {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 6 + indice);
    return { fecha: fechaLocal(fecha), etiqueta: DIAS[fecha.getDay()], ventas: 0, compras: 0 };
  });
  const porFecha = new Map(dias.map((dia) => [dia.fecha, dia]));

  ventas.forEach((venta) => {
    const dia = porFecha.get(String(fechaDeRegistro(venta)).slice(0, 10));
    if (dia && venta.estado === "Confirmada") dia.ventas += Number(venta.total ?? 0);
  });
  compras.forEach((compra) => {
    const dia = porFecha.get(String(fechaDeRegistro(compra)).slice(0, 10));
    if (dia && compra.estado === "Confirmada") dia.compras += Number(compra.total ?? 0);
  });
  return dias;
}

// Resume los detalles de ventas confirmadas para mantener el ranking coherente con el período.
function obtenerProductosDestacados(ventas) {
  const resumen = new Map();
  ventas.forEach((venta) => {
    (venta.detalles ?? []).forEach((detalle) => {
      const id = detalle.id_producto ?? detalle.producto?.id_producto;
      if (id == null) return;
      const producto = resumen.get(id) ?? {
        id_producto: id,
        producto: detalle.producto,
        total_vendido: 0,
        ingreso_total: 0,
      };
      producto.total_vendido += Number(detalle.cantidad ?? 0);
      producto.ingreso_total += Number(detalle.subtotal ?? 0);
      resumen.set(id, producto);
    });
  });
  return [...resumen.values()]
    .sort((primero, segundo) => segundo.total_vendido - primero.total_vendido)
    .slice(0, 5);
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
    <section className="dashboard-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Actividad de la semana</h2>
          <p className="mt-1 text-sm text-slate-500">Ventas y compras confirmadas por día</p>
        </div>
        <div className="flex gap-4 text-xs font-medium text-slate-600">
          <span className="inline-flex items-center gap-2"><i className="dashboard-chart-key dashboard-chart-key-sales h-2.5 w-2.5 rounded-full bg-violet-500" />Ventas</span>
          <span className="inline-flex items-center gap-2"><i className="dashboard-chart-key dashboard-chart-key-purchases h-2.5 w-2.5 rounded-full bg-cyan-400" />Compras</span>
        </div>
      </div>
      <div className="dashboard-chart-area mt-7 grid h-52 grid-cols-7 items-end gap-2 rounded-xl px-2 sm:gap-4">
        {dias.map((dia) => {
          const alturaVentas = Math.max(dia.ventas ? 8 : 3, (dia.ventas / maximo) * 100);
          const alturaCompras = Math.max(dia.compras ? 8 : 3, (dia.compras / maximo) * 100);
          return (
            <div key={dia.fecha} className="flex h-full flex-col items-center justify-end gap-2">
              <div className="flex h-full w-full items-end justify-center gap-1.5">
                <div title={`Ventas ${formatearPrecio(dia.ventas)}`} className="dashboard-chart-bar dashboard-chart-bar-sales w-3 rounded-t-md bg-violet-500 transition-all sm:w-5" style={{ height: `${alturaVentas}%` }} />
                <div title={`Compras ${formatearPrecio(dia.compras)}`} className="dashboard-chart-bar dashboard-chart-bar-purchases w-3 rounded-t-md bg-cyan-400 transition-all sm:w-5" style={{ height: `${alturaCompras}%` }} />
              </div>
              <span className="text-[11px] text-slate-500">{dia.etiqueta}</span>
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
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Atención al inventario</h2>
          <p className="mt-1 text-xs text-slate-500">Productos en mínimo o por debajo</p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{productos.length} alertas</span>
      </div>
      {productos.length ? (
        <ul className="divide-y divide-slate-100">
          {productos.slice(0, 5).map((producto) => (
            <li key={producto.id_producto} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{producto.nombre_producto}</p>
                <p className="mt-0.5 text-xs text-slate-500">{producto.codigo_producto ?? "Sin código"}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700">
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

function ProductosDestacados({ productos }) {
  const destacados = productos.slice(0, 5);
  const maximo = Math.max(1, ...destacados.map((producto) => Number(producto.total_vendido ?? 0)));
  return (
    <section className="dashboard-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Productos más vendidos</h2>
          <p className="mt-1 text-sm text-slate-500">Rendimiento del mes</p>
        </div>
        <span className="dashboard-trending-icon flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-700"><TrendingUp size={19} /></span>
      </div>
      {destacados.length ? (
        <ol className="mt-5 space-y-4">
          {destacados.map((producto, indice) => {
            const unidades = Number(producto.total_vendido ?? 0);
            return (
              <li key={producto.id_producto ?? producto.producto?.id_producto ?? indice}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium text-slate-700">{producto.producto?.nombre_producto ?? "Producto"}</span>
                  <span className="shrink-0 text-xs text-slate-500">{unidades} uds.</span>
                </div>
                <div className="dashboard-progress-track h-2 overflow-hidden rounded-full bg-slate-100"><div className="dashboard-progress-fill h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500" style={{ width: `${Math.max(5, (unidades / maximo) * 100)}%` }} /></div>
              </li>
            );
          })}
        </ol>
      ) : <p className="py-8 text-center text-sm text-slate-500">Todavía no hay ventas para mostrar.</p>}
    </section>
  );
}

function VentasRecientes({ ventas }) {
  const recientes = ventas.slice(0, 5);
  return (
    <section className="dashboard-panel rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Ventas recientes</h2>
          <p className="mt-1 text-xs text-slate-500">Últimos movimientos del mes</p>
        </div>
        <Clock3 size={19} className="text-slate-400" />
      </div>
      {recientes.length ? <ul className="divide-y divide-slate-100">
        {recientes.map((venta) => (
          <li key={venta.id_venta} className="flex items-center justify-between gap-3 px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="dashboard-sales-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><ShoppingBag size={17} /></span>
              <div className="min-w-0"><p className="truncate text-sm font-medium text-slate-800">{venta.cliente?.nombre_cliente ?? venta.numero_venta ?? "Venta"}</p><p className="mt-0.5 text-xs text-slate-500">{fechaCorta(fechaDeRegistro(venta))} · {venta.estado ?? "Sin estado"}</p></div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-slate-800">{formatearPrecio(venta.total)}</span>
          </li>
        ))}
      </ul> : <p className="px-5 py-8 text-center text-sm text-slate-500">No hay ventas registradas este mes.</p>}
      <Link to="/ventas" className="dashboard-panel-link block border-t border-slate-100 px-5 py-3 text-center text-sm font-medium text-violet-700 hover:bg-violet-50">Ir al módulo de ventas</Link>
    </section>
  );
}

export default function Dashboard() {
  const [actualizacion, setActualizacion] = useState(0);
  const [datos, setDatos] = useState({ inventario: [], stockBajo: [], ventas: [], compras: [], financiero: null });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    const rango = obtenerRangoMes();
    Promise.allSettled([
      obtenerInventarioActual(),
      obtenerInventarioStockBajo(),
      obtenerReporteVentas({ ...rango, estado: "Confirmada" }),
      obtenerReporteCompras({ ...rango, estado: "Confirmada" }),
      obtenerReporteFinanciero(rango),
    ]).then((resultados) => {
      if (!activo) return;
      const leerLista = (indice) => resultados[indice].status === "fulfilled" && Array.isArray(resultados[indice].value.datos) ? resultados[indice].value.datos : [];
      const financiero = resultados[4].status === "fulfilled" ? resultados[4].value.datos : null;
      const fallidos = resultados.filter((resultado) => resultado.status === "rejected");
      const ventas = leerLista(2);
      setDatos({ inventario: leerLista(0), stockBajo: leerLista(1), ventas, compras: leerLista(3), financiero });
      if (fallidos.length === resultados.length) setError("No se pudo conectar con los servicios del dashboard. Comprueba que la API esté disponible.");
      else if (fallidos.length) setError("Algunos indicadores no se pudieron actualizar. Los demás datos siguen disponibles.");
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

  const dias = useMemo(() => agruparPorDia(datos.ventas, datos.compras), [datos.ventas, datos.compras]);
  const masVendidos = useMemo(() => obtenerProductosDestacados(datos.ventas), [datos.ventas]);
  const balance = Number(datos.financiero?.balance_neto ?? 0);
  const fechaMes = new Intl.DateTimeFormat("es-NI", { month: "long", year: "numeric" }).format(new Date());

  return (
    <div className="dashboard-page space-y-6 pb-8">
      {error && <div role="status" className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"><CircleAlert size={18} className="mt-0.5 shrink-0" />{error}</div>}

      <div className="dashboard-heading flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">Centro de control</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Resumen de inventario y operaciones del negocio.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium capitalize text-slate-700 shadow-sm"><CalendarDays size={15} className="text-slate-500" />{fechaMes}</span>
          {cargando && <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">Actualizando datos…</span>}
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaIndicador titulo="Ingresos por ventas" valor={formatearPrecio(datos.financiero?.total_ingresos_ventas)} detalle="Ventas confirmadas este mes" icono={ArrowUpRight} color="bg-emerald-100 text-emerald-700" variacion="positiva" />
        <TarjetaIndicador titulo="Compras realizadas" valor={formatearPrecio(datos.financiero?.total_egresos_compras)} detalle="Compras confirmadas este mes" icono={ShoppingBag} color="bg-cyan-100 text-cyan-700" />
        <TarjetaIndicador titulo="Balance del período" valor={formatearPrecio(balance)} detalle={balance >= 0 ? "Ingresos menos compras" : "Compras superan los ingresos"} icono={balance >= 0 ? TrendingUp : ArrowDownRight} color={balance >= 0 ? "bg-violet-100 text-violet-700" : "bg-rose-100 text-rose-700"} variacion={balance >= 0 ? "positiva" : "negativa"} />
        <TarjetaIndicador titulo="Productos en catálogo" valor={datos.inventario.length.toLocaleString("es-NI")} detalle={`${datos.stockBajo.length} requieren reposición`} icono={Boxes} color="bg-amber-100 text-amber-700" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <GraficoActividad dias={dias} />
        <InventarioBajo productos={datos.stockBajo} />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <ProductosDestacados productos={masVendidos} />
        <VentasRecientes ventas={datos.ventas} />
      </section>
    </div>
  );
}
