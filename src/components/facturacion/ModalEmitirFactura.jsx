import { useMemo, useState } from "react";
import { FileCheck2, Loader2 } from "lucide-react";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import { fechaFactura, precioFactura } from "../../utils/facturacion/formato";
import { generarCodigoAutomatico } from "../../utils/compartido/codigoAutomatico";

export default function ModalEmitirFactura({ ventas, facturas, onEmitir, onCerrar }) {
  const ventasFacturadas = useMemo(() => new Set(facturas.map((factura) => factura.id_venta)), [facturas]);
  const ventasDisponibles = ventas.filter((venta) => venta.estado === "Confirmada" && !ventasFacturadas.has(venta.id_venta));
  const [idVenta, setIdVenta] = useState(ventasDisponibles[0] ? String(ventasDisponibles[0].id_venta) : "");
  const numeroFactura = generarCodigoAutomatico(
    facturas,
    "numero_factura",
    `FAC-${new Date().getFullYear()}-`,
  );
  const [observaciones, setObservaciones] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const ventaSeleccionada = ventasDisponibles.find((venta) => String(venta.id_venta) === idVenta);

  const enviar = async (evento) => {
    evento.preventDefault();
    if (!idVenta) return setError("Selecciona una venta confirmada sin factura.");
    if (!numeroFactura.trim()) return setError("No se pudo generar el número de factura.");
    if (numeroFactura.trim().length > 50) return setError("El número de factura no puede superar 50 caracteres.");

    setCargando(true);
    setError("");
    try {
      await onEmitir({
        id_venta: Number(idVenta),
        numero_factura: numeroFactura.trim(),
        ...(observaciones.trim() && { observaciones: observaciones.trim() }),
      });
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <Modal titulo="Emitir factura" onCerrar={onCerrar} bloqueado={cargando} ancho="max-w-xl">
      <form onSubmit={enviar} className="space-y-5">
        {ventasDisponibles.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">No hay ventas confirmadas pendientes de facturar.</p>
        ) : (
          <>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Venta confirmada</span>
              <select value={idVenta} onChange={(e) => setIdVenta(e.target.value)} required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                {ventasDisponibles.map((venta) => <option key={venta.id_venta} value={venta.id_venta}>{venta.numero_venta} · {venta.cliente?.nombre_cliente ?? "Cliente"}</option>)}
              </select>
            </label>

            {ventaSeleccionada && (
              <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                <div><p className="text-xs text-slate-500">Cliente</p><p className="mt-1 text-sm font-medium text-slate-800">{ventaSeleccionada.cliente?.nombre_cliente ?? "—"}</p></div>
                <div><p className="text-xs text-slate-500">Fecha de venta</p><p className="mt-1 text-sm text-slate-700">{fechaFactura(ventaSeleccionada.fecha_venta)}</p></div>
                <div><p className="text-xs text-slate-500">Subtotal</p><p className="mt-1 text-sm text-slate-700">{precioFactura(ventaSeleccionada.subtotal)}</p></div>
                <div><p className="text-xs text-slate-500">Total</p><p className="mt-1 text-sm font-semibold text-slate-900">{precioFactura(ventaSeleccionada.total)}</p></div>
              </div>
            )}

            <CampoFormulario id="numero_factura" label="Número de factura" value={numeroFactura} maxLength={50} autoComplete="off" sinIcono readOnly required />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Observaciones <span className="font-normal text-slate-400">(opcional)</span></span>
              <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} maxLength={255} rows={3} className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </label>
          </>
        )}

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onCerrar} disabled={cargando} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">Cerrar</button>
          {ventasDisponibles.length > 0 && <button type="submit" disabled={cargando} className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:opacity-60">{cargando ? <Loader2 size={16} className="animate-spin" /> : <FileCheck2 size={16} />}{cargando ? "Emitiendo..." : "Emitir factura"}</button>}
        </div>
      </form>
    </Modal>
  );
}
