import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, FileBarChart2, FileSpreadsheet, Loader2, Printer, RotateCcw, Search } from "lucide-react";
import { exportarReporteExcel } from "../../utils/reportes/exportarReporteExcel";
import { exportarReportePdf } from "../../utils/reportes/exportarReportePdf";
import { cargarListadoConCache } from "../../services/compartido/cacheListados";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import Paginacion from "../compartido/Paginacion";

const normalizarTexto = (valor) => String(valor ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLocaleLowerCase();

export default function PanelReporte({ titulo, descripcion, columnas, columnasBusqueda, consultar, filtrosPorFecha = false, cargarSiempreActualizado = false, estados = [], busquedaPorCampo = false, exportar = false, Icono = FileBarChart2, visible = true, onFiltroActivoChange }) {
  const [filtros, setFiltros] = useState({ fecha_inicio: "", fecha_fin: "", estado: "" });
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errorExportacion, setErrorExportacion] = useState("");
  const [exportando, setExportando] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);
  const solicitudActual = useRef(0);
  const opcionesBusqueda = columnasBusqueda ?? columnas;

  // Mantiene la búsqueda local sobre las mismas filas que alimentan la tabla y exportaciones.
  const filasFiltradas = useMemo(() => {
    const termino = normalizarTexto(busqueda);
    if (!termino) return filas;
    return filas.filter((fila) => {
      const tipo = normalizarTexto(fila.tipo_movimiento);
      if (tipo && ["", "Tipo"].includes(campoBusqueda) && ["entrada", "salida"].includes(termino)) return tipo === termino;
      if (campoBusqueda === "Tipo") return tipo.includes(termino);
      const lista = campoBusqueda ? opcionesBusqueda.filter((columna) => columna.etiqueta === campoBusqueda) : opcionesBusqueda;
      if (campoBusqueda === "ID" && /^\d+$/.test(termino)) return lista.some((columna) => normalizarTexto(columna.valor(fila)) === termino);
      return lista.some((columna) => normalizarTexto(columna.valor(fila)).includes(termino));
    });
  }, [busqueda, campoBusqueda, columnas, filas, opcionesBusqueda]);
  const paginacion = usePaginacion(filasFiltradas, 4);
  const mostrarPaginacion = !cargando && !error && filasFiltradas.length > 0;

  // Carga inicial y cancelación lógica para evitar actualizar el componente desmontado.
  useEffect(() => {
    let activo = true;
    const solicitud = ++solicitudActual.current;
    const cargaInicial = cargarSiempreActualizado ? consultar({}) : cargarListadoConCache(consultar);
    cargaInicial.then((respuesta) => {
      if (!activo || solicitud !== solicitudActual.current) return;
      const datos = respuesta.datos;
      setFilas(Array.isArray(datos) ? datos : datos == null ? [] : [datos]);
      setError("");
    }).catch((e) => activo && solicitud === solicitudActual.current && setError(e.message)).finally(() => {
      if (activo && solicitud === solicitudActual.current) setCargando(false);
    });
    return () => { activo = false; };
  }, [consultar, cargarSiempreActualizado]);

  const buscar = async (evento) => {
    evento.preventDefault();
    paginacion.irAPagina(1);
    const parametros = Object.fromEntries(Object.entries(filtros).filter(([, valor]) => valor));
    const hayFiltrosAplicados = Object.keys(parametros).length > 0;
    setFiltrosAplicados(hayFiltrosAplicados);
    onFiltroActivoChange?.(hayFiltrosAplicados || Boolean(busqueda));
    const solicitud = ++solicitudActual.current;
    setCargando(true);
    setFilas([]);
    setError("");
    try {
      const respuesta = await consultar(parametros);
      if (solicitud !== solicitudActual.current) return;
      const datos = respuesta.datos;
      setFilas(Array.isArray(datos) ? datos : datos == null ? [] : [datos]);
    } catch (e) {
      if (solicitud === solicitudActual.current) setError(e.message);
    } finally {
      if (solicitud === solicitudActual.current) setCargando(false);
    }
  };

  const limpiarFiltros = async () => {
    setFiltros({ fecha_inicio: "", fecha_fin: "", estado: "" });
    setCampoBusqueda("");
    setBusqueda("");
    setFiltrosAplicados(false);
    onFiltroActivoChange?.(false);
    paginacion.irAPagina(1);
    const solicitud = ++solicitudActual.current;
    setCargando(true);
    setFilas([]);
    setError("");
    try {
      const respuesta = await consultar({});
      if (solicitud !== solicitudActual.current) return;
      const datos = respuesta.datos;
      setFilas(Array.isArray(datos) ? datos : datos == null ? [] : [datos]);
    } catch (e) {
      if (solicitud === solicitudActual.current) setError(e.message);
    } finally {
      if (solicitud === solicitudActual.current) setCargando(false);
    }
  };

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor);
    paginacion.irAPagina(1);
    onFiltroActivoChange?.(Boolean(valor || filtrosAplicados));
  };

  const exportarExcel = async () => {
    setExportando(true);
    setErrorExportacion("");
    try { await exportarReporteExcel({ titulo, columnas, filas: filasFiltradas }); }
    catch { setErrorExportacion("No se pudo generar el archivo Excel. Intenta de nuevo."); }
    finally { setExportando(false); }
  };

  const exportarPdf = () => {
    setErrorExportacion("");
    if (!exportarReportePdf({ titulo, columnas, filas: filasFiltradas })) setErrorExportacion("No se pudo preparar el reporte para imprimir. Intenta de nuevo.");
  };

  const claveFila = (fila, indice) => fila.id ?? fila.id_producto ?? fila.id_venta ?? fila.id_compra ?? fila.id_factura ?? fila.id_cliente ?? fila.id_proveedor ?? indice;

  return (
    <section className={`${visible ? "" : "hidden"} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm`}>
      <header className="flex items-start gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700"><Icono size={19} /></span>
        <div className="min-w-0 flex-1"><h2 className="text-sm font-semibold text-slate-900 sm:text-base">{titulo}</h2>{descripcion && <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{descripcion}</p>}</div>
        <span className="hidden shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">{cargando ? "Consultando…" : `${filasFiltradas.length} ${filasFiltradas.length === 1 ? "registro" : "registros"}`}</span>
      </header>

      {(filtrosPorFecha || estados.length > 0) && <form onSubmit={buscar} className="grid gap-3 border-b border-slate-200 bg-slate-50/50 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        {filtrosPorFecha && <>
          <label className="text-[11px] font-semibold text-slate-600">Fecha inicial<span className="relative mt-1 block"><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="date" value={filtros.fecha_inicio} onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })} className="block h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm font-normal text-slate-800" /></span></label>
          <label className="text-[11px] font-semibold text-slate-600">Fecha final<span className="relative mt-1 block"><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="date" value={filtros.fecha_fin} onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })} className="block h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm font-normal text-slate-800" /></span></label>
        </>}
        {estados.length > 0 && <label className="text-[11px] font-semibold text-slate-600">Estado<select value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })} className="mt-1 block h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-800"><option value="">Todos los estados</option>{estados.map((estado) => <option key={estado} value={estado}>{estado}</option>)}</select></label>}
        <div className="flex items-end gap-2">
          <button type="submit" disabled={cargando} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 text-xs font-semibold text-white transition hover:bg-slate-900 disabled:opacity-60">{cargando ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}Consultar</button>
          <button type="button" onClick={limpiarFiltros} disabled={cargando} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"><RotateCcw size={14} />Limpiar</button>
        </div>
      </form>}

      {(busquedaPorCampo || exportar) && <div className="grid gap-3 border-b border-slate-200 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        {busquedaPorCampo && <div className="grid gap-3 sm:grid-cols-[minmax(150px,0.38fr)_minmax(200px,1fr)]">
          <label className="text-[11px] font-semibold text-slate-600">Buscar en<select value={campoBusqueda} onChange={(e) => { setCampoBusqueda(e.target.value); paginacion.irAPagina(1); }} className="mt-1 block h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-800"><option value="">Todos los campos</option>{opcionesBusqueda.map((columna) => <option key={columna.etiqueta} value={columna.etiqueta}>{columna.etiqueta}</option>)}</select></label>
          <label className="text-[11px] font-semibold text-slate-600">Término de búsqueda<span className="relative mt-1 block"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="search" value={busqueda} onChange={(e) => cambiarBusqueda(e.target.value)} placeholder="Escribe para filtrar registros..." className="block h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm font-normal text-slate-800" /></span></label>
        </div>}
        {exportar && <div className="flex gap-2 lg:justify-end">
          <button type="button" onClick={exportarExcel} disabled={exportando || !filasFiltradas.length} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none">{exportando ? <Loader2 size={15} className="animate-spin" /> : <FileSpreadsheet size={15} />}Excel</button>
          <button type="button" onClick={exportarPdf} disabled={!filasFiltradas.length} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 px-3 text-xs font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"><Printer size={15} />PDF</button>
        </div>}
      </div>}

      {errorExportacion && <p role="alert" className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:mx-5">{errorExportacion}</p>}
      {error ? <p role="alert" className="m-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:m-5">{error}</p> : <div className="p-4 sm:p-5">
        {cargando ? <div key="cargando" className="flex min-h-28 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 text-sm text-slate-500"><Loader2 size={17} className="animate-spin" />Cargando reporte...</div>
          : filasFiltradas.length === 0 ? <div key="sin-resultados" className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 text-center"><span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><FileBarChart2 size={17} /></span><p className="text-sm font-medium text-slate-700">{filas.length > 0 && busqueda ? "Ningún registro coincide con los filtros." : "No hay registros para mostrar."}</p><p className="mt-1 text-xs text-slate-500">Prueba con otros filtros o limpia la búsqueda.</p></div>
          : <div key="resultados" className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">{paginacion.visibles.map((fila, indice) => <article key={claveFila(fila, paginacion.desde + indice - 1)} className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:bg-slate-50/50 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">Registro</span><span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-slate-100 px-2 text-[10px] font-semibold text-slate-600">{paginacion.desde + indice}</span></div>
            <dl className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-3">{columnas.map((columna) => {
              const valor = columna.valor(fila);
              return <div key={columna.etiqueta} className="min-w-0"><dt className="mb-1 text-[9px] font-semibold uppercase tracking-[.08em] text-slate-400">{columna.etiqueta}</dt><dd className="wrap-break-words text-xs leading-relaxed text-slate-700">{valor == null || valor === "" ? "—" : typeof valor === "string" ? <span className="whitespace-pre-line">{valor}</span> : valor}</dd></div>;
            })}</dl>
          </article>)}</div>}
        {mostrarPaginacion && <div className="mt-4"><Paginacion {...paginacion} onCambiar={paginacion.irAPagina} /></div>}
      </div>}
    </section>
  );
}
