import { useEffect, useMemo, useState } from "react";
import { FileSpreadsheet, Loader2, Printer, Search } from "lucide-react";
import { exportarReporteExcel } from "../../utils/reportes/exportarReporteExcel";
import { exportarReportePdf } from "../../utils/reportes/exportarReportePdf";

export default function PanelReporte({
  titulo,
  descripcion,
  columnas,
  consultar,
  filtrosPorFecha = false,
  estados = [],
  busquedaPorCampo = false,
  exportar = false,
}) {
  const [filtros, setFiltros] = useState({ fecha_inicio: "", fecha_fin: "", estado: "" });
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errorExportacion, setErrorExportacion] = useState("");
  const [exportando, setExportando] = useState(false);

  const filasFiltradas = useMemo(() => {
    const termino = busqueda
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();
    if (!termino) return filas;

    return filas.filter((fila) => {
      const columnasFiltradas = campoBusqueda
        ? columnas.filter((columna) => columna.etiqueta === campoBusqueda)
        : columnas;
      return columnasFiltradas.some((columna) => {
        const valor = columna.valor(fila);
        return String(valor ?? "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()
          .includes(termino);
      });
    });
  }, [busqueda, campoBusqueda, columnas, filas]);

  useEffect(() => {
    let activo = true;
    consultar({})
      .then((respuesta) => {
        if (!activo) return;
        const datos = respuesta.datos;
        setFilas(Array.isArray(datos) ? datos : datos == null ? [] : [datos]);
        setError("");
      })
      .catch((e) => activo && setError(e.message))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, [consultar]);

  const buscar = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError("");
    const parametros = Object.fromEntries(
      Object.entries(filtros).filter(([, valor]) => valor),
    );
    try {
      const respuesta = await consultar(parametros);
      const datos = respuesta.datos;
      setFilas(Array.isArray(datos) ? datos : datos == null ? [] : [datos]);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  const exportarExcel = async () => {
    setExportando(true);
    setErrorExportacion("");
    try {
      await exportarReporteExcel({ titulo, columnas, filas: filasFiltradas });
    } catch {
      setErrorExportacion("No se pudo generar el archivo Excel. Intenta de nuevo.");
    } finally {
      setExportando(false);
    }
  };

  const exportarPdf = () => {
    setErrorExportacion("");
    const resultado = exportarReportePdf({ titulo, columnas, filas: filasFiltradas });
    if (!resultado) {
      setErrorExportacion("No se pudo preparar el reporte para imprimir. Intenta de nuevo.");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">{titulo}</h2>
        {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
      </div>

      {(filtrosPorFecha || estados.length > 0) && (
        <form onSubmit={buscar} className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-end">
          {filtrosPorFecha && <>
            <label className="flex-1 text-xs font-medium text-slate-600">Fecha inicial<input type="date" value={filtros.fecha_inicio} onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800" /></label>
            <label className="flex-1 text-xs font-medium text-slate-600">Fecha final<input type="date" value={filtros.fecha_fin} onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800" /></label>
          </>}
          {estados.length > 0 && <label className="flex-1 text-xs font-medium text-slate-600">Estado<select value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"><option value="">Todos</option>{estados.map((estado) => <option key={estado} value={estado}>{estado}</option>)}</select></label>}
          <button type="submit" disabled={cargando} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:opacity-60">{cargando ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}Consultar</button>
        </form>
      )}

      {(busquedaPorCampo || exportar) && (
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
          {busquedaPorCampo && (
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <label className="text-xs font-medium text-slate-600 sm:w-48">
                Buscar en
                <select
                  value={campoBusqueda}
                  onChange={(e) => setCampoBusqueda(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                >
                  <option value="">Todos los campos</option>
                  {columnas.map((columna) => (
                    <option key={columna.etiqueta} value={columna.etiqueta}>
                      {columna.etiqueta}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1 text-xs font-medium text-slate-600">
                Valor
                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Escribe para filtrar..."
                  className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                />
              </label>
            </div>
          )}
          {exportar && (
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={exportarExcel}
                disabled={exportando || filasFiltradas.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {exportando ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
                Excel
              </button>
              <button
                type="button"
                onClick={exportarPdf}
                disabled={filasFiltradas.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Printer size={16} /> PDF
              </button>
            </div>
          )}
        </div>
      )}

      {errorExportacion && <p role="alert" className="mx-5 mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorExportacion}</p>}

      {error ? <p role="alert" className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{columnas.map((columna) => <th key={columna.etiqueta} className="whitespace-nowrap px-4 py-3 font-semibold">{columna.etiqueta}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {cargando && filas.length === 0 ? <tr><td colSpan={columnas.length} className="px-4 py-8 text-center text-slate-500"><span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Cargando reporte...</span></td></tr> : filasFiltradas.map((fila, indice) => <tr key={fila.id ?? fila.id_producto ?? fila.id_venta ?? fila.id_compra ?? fila.id_factura ?? indice} className="text-slate-700">{columnas.map((columna) => <td key={columna.etiqueta} className="max-w-sm whitespace-pre-wrap px-4 py-3">{columna.valor(fila)}</td>)}</tr>)}
              {!cargando && filasFiltradas.length === 0 && <tr><td colSpan={columnas.length} className="px-4 py-8 text-center text-slate-500">{filas.length > 0 && busqueda ? "Ningún registro coincide con la búsqueda." : "No hay registros para mostrar."}</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
