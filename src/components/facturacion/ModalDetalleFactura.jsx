import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Printer } from "lucide-react";
import Modal from "../compartido/Modal";
import InsigniaEstado from "../compartido/InsigniaEstado";
import VistaImpresionFactura from "./VistaImpresionFactura";
import { mostrarFactura } from "../../services/facturacion/facturasService";
import { fechaFactura, precioFactura } from "../../utils/facturacion/formato";
import { exportarFacturaExcel } from "../../utils/facturacion/exportarFacturaExcel";

export default function ModalDetalleFactura({ factura, onCerrar }) {
  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [formato, setFormato] = useState("a4");
  const [exportandoExcel, setExportandoExcel] = useState(false);
  const [errorExcel, setErrorExcel] = useState("");
  const referenciaImpresion = useRef(null);

  useEffect(() => {
    let activo = true;
    setError("");
    setDetalle(null);
    setCargando(true);
    mostrarFactura(factura.id_factura)
      .then((respuesta) => activo && setDetalle(respuesta.datos))
      .catch((e) => activo && setError(e.message))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, [factura.id_factura]);

  const imprimir = () => {
    const elemento = referenciaImpresion.current;
    if (!elemento) return;

    const estilosPrevios = {
      display: elemento.style.display,
      position: elemento.style.position,
      visibility: elemento.style.visibility,
      width: elemento.style.width,
      padding: elemento.style.padding,
      fontSize: elemento.style.fontSize,
      left: elemento.style.left,
      top: elemento.style.top,
    };

    let reglaPagina = "@page { size: A4 portrait; margin: 14mm; }";
    if (formato !== "a4") {
      const anchoMm = formato === "58mm" ? 58 : 80;
      elemento.style.display = "block";
      elemento.style.position = "fixed";
      elemento.style.visibility = "hidden";
      elemento.style.left = "-10000px";
      elemento.style.top = "0";
      elemento.style.width = `${anchoMm}mm`;
      elemento.style.padding = formato === "58mm" ? "2mm" : "3mm";
      elemento.style.fontSize = formato === "58mm" ? "7.5pt" : "9pt";
      const altoMm = Math.max(80, Math.ceil((elemento.scrollHeight * 25.4) / 96 + 8));
      reglaPagina = `@page { size: ${anchoMm}mm ${altoMm}mm; margin: 0; }`;
    }

    Object.assign(elemento.style, estilosPrevios);
    document.getElementById("estilo-pagina-factura")?.remove();
    const estilo = document.createElement("style");
    estilo.id = "estilo-pagina-factura";
    estilo.textContent = reglaPagina;
    document.head.append(estilo);
    window.addEventListener("afterprint", () => estilo.remove(), { once: true });
    window.print();
  };

  const exportarExcel = async () => {
    setExportandoExcel(true);
    setErrorExcel("");
    try {
      await exportarFacturaExcel(detalle);
    } catch {
      setErrorExcel("No se pudo generar el Excel de esta factura. Intenta de nuevo.");
    } finally {
      setExportandoExcel(false);
    }
  };

  return (
    <Modal titulo={`Factura ${factura.numero_factura}`} onCerrar={onCerrar} ancho="max-w-4xl">
      {cargando ? (
        <div className="flex items-center justify-center gap-2 py-14 text-sm text-slate-500"><Loader2 size={20} className="animate-spin" />Cargando factura...</div>
      ) : error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error}</div>
      ) : detalle && (
        <div className="space-y-4">
          <section className="grid gap-2 sm:grid-cols-2" aria-label="Datos de la factura">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Estado</p><div className="mt-1"><InsigniaEstado estado={detalle.estado} /></div></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Fecha de emisión</p><p className="mt-1 text-sm font-medium text-slate-900">{fechaFactura(detalle.fecha_emision)}</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Venta asociada</p><p className="mt-1 text-sm font-medium text-slate-900">{detalle.venta?.numero_venta ?? "—"}</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Cliente</p><p className="mt-1 text-sm font-medium text-slate-900">{detalle.venta?.cliente?.nombre_cliente ?? "—"}</p></div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-slate-100 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="formato-impresion-factura">Formato de impresión</label>
              <select id="formato-impresion-factura" value={formato} onChange={(e) => setFormato(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
                <option value="a4">Hoja A4 / PDF</option><option value="58mm">Térmica 58 mm</option><option value="80mm">Térmica 80 mm</option>
              </select>
              <button type="button" onClick={exportarExcel} disabled={exportandoExcel} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60">{exportandoExcel ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}{exportandoExcel ? "Generando Excel..." : "Exportar Excel"}</button>
            </div>
            <button type="button" onClick={imprimir} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-900"><Printer size={15} />Imprimir / PDF</button>
          </div>
          {errorExcel && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{errorExcel}</p>}

          <section className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-800">Productos facturados</h3>
            <div className="grid gap-2 sm:grid-cols-2">{(detalle.venta?.detalles ?? []).map((item, indice) => <article key={item.id_detalle_venta ?? `${item.id_producto}-${indice}`} className="min-w-0 rounded-xl border border-slate-200 p-3"><div className="flex min-w-0 items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-slate-900">{item.producto?.nombre_producto ?? "—"}</p><p className="text-[10px] text-slate-500">{item.producto?.codigo_producto ?? "Sin código"}</p></div><p className="shrink-0 text-xs font-medium text-slate-600">× {item.cantidad}</p></div><div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]"><span className="text-slate-500">{precioFactura(item.precio_unitario)} c/u</span><span className="font-semibold text-slate-900">{precioFactura(item.subtotal)}</span></div></article>)}</div>
          </section>

          <div className="ml-auto w-full space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:w-72">
            <p className="flex justify-between text-slate-600"><span>Subtotal</span><span>{precioFactura(detalle.subtotal)}</span></p>
            <p className="flex justify-between text-slate-600"><span>Impuesto</span><span>{precioFactura(detalle.impuesto)}</span></p>
            <p className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900"><span>Total</span><span>{precioFactura(detalle.total)}</span></p>
          </div>
          {detalle.observaciones && <p className="text-sm text-slate-600"><span className="font-medium text-slate-800">Observaciones:</span> {detalle.observaciones}</p>}

          <VistaImpresionFactura factura={detalle} formato={formato} referencia={referenciaImpresion} />
          <div className="flex justify-end border-t border-slate-100 pt-3"><button type="button" onClick={onCerrar} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Cerrar</button></div>
        </div>
      )}
    </Modal>
  );
}
