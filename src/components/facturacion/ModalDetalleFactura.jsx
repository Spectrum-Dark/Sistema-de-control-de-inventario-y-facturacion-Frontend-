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
    <Modal titulo={`Factura ${factura.numero_factura}`} onCerrar={onCerrar} ancho="max-w-3xl">
      {cargando ? (
        <div className="flex items-center justify-center gap-2 py-14 text-sm text-slate-500"><Loader2 size={20} className="animate-spin" />Cargando factura...</div>
      ) : error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error}</div>
      ) : detalle && (
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-xs text-slate-500">Estado</p><div className="mt-1"><InsigniaEstado estado={detalle.estado} /></div></div>
              <div><p className="text-xs text-slate-500">Fecha de emisión</p><p className="mt-1 text-sm text-slate-800">{fechaFactura(detalle.fecha_emision)}</p></div>
              <div><p className="text-xs text-slate-500">Venta</p><p className="mt-1 text-sm text-slate-800">{detalle.venta?.numero_venta ?? "—"}</p></div>
              <div><p className="text-xs text-slate-500">Cliente</p><p className="mt-1 text-sm text-slate-800">{detalle.venta?.cliente?.nombre_cliente ?? "—"}</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="formato-impresion-factura">Formato de impresión</label>
              <select id="formato-impresion-factura" value={formato} onChange={(e) => setFormato(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">
                <option value="a4">Hoja A4 / PDF</option><option value="58mm">Térmica 58 mm</option><option value="80mm">Térmica 80 mm</option>
              </select>
              <button type="button" onClick={exportarExcel} disabled={exportandoExcel} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">{exportandoExcel ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}{exportandoExcel ? "Generando Excel..." : "Excel de esta factura"}</button>
              <button type="button" onClick={imprimir} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"><Printer size={16} />Exportar / PDF</button>
            </div>
          </div>
          {errorExcel && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{errorExcel}</p>}

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2.5">Producto</th><th className="px-3 py-2.5 text-right">Cant.</th><th className="px-3 py-2.5 text-right">Precio</th><th className="px-3 py-2.5 text-right">Importe</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{(detalle.venta?.detalles ?? []).map((item, indice) => <tr key={item.id_detalle_venta ?? `${item.id_producto}-${indice}`}><td className="px-3 py-2.5"><p className="font-medium text-slate-800">{item.producto?.nombre_producto ?? "—"}</p><p className="text-xs text-slate-500">{item.producto?.codigo_producto ?? ""}</p></td><td className="px-3 py-2.5 text-right text-slate-700">{item.cantidad}</td><td className="px-3 py-2.5 text-right text-slate-700">{precioFactura(item.precio_unitario)}</td><td className="px-3 py-2.5 text-right font-medium text-slate-900">{precioFactura(item.subtotal)}</td></tr>)}</tbody>
            </table>
          </div>

          <div className="ml-auto w-full space-y-2 rounded-xl bg-slate-50 p-4 text-sm sm:w-72">
            <p className="flex justify-between text-slate-600"><span>Subtotal</span><span>{precioFactura(detalle.subtotal)}</span></p>
            <p className="flex justify-between text-slate-600"><span>Impuesto</span><span>{precioFactura(detalle.impuesto)}</span></p>
            <p className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900"><span>Total</span><span>{precioFactura(detalle.total)}</span></p>
          </div>
          {detalle.observaciones && <p className="text-sm text-slate-600"><span className="font-medium text-slate-800">Observaciones:</span> {detalle.observaciones}</p>}

          <VistaImpresionFactura factura={detalle} formato={formato} referencia={referenciaImpresion} />
          <div className="flex justify-end border-t border-slate-100 pt-4"><button type="button" onClick={onCerrar} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cerrar</button></div>
        </div>
      )}
    </Modal>
  );
}
