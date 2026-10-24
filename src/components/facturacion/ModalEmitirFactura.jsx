import { useMemo, useState } from "react";
import { FileCheck2, Loader2, ReceiptText } from "lucide-react";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSeleccionable from "../compartido/CampoSeleccionable";
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
      <form onSubmit={enviar} className="space-y-4">
        {ventasDisponibles.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">No hay ventas confirmadas pendientes de facturar.</p>
        ) : (
          <>
            <div className="space-y-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600"><ReceiptText size={16} /></span><div><h3 className="text-xs font-semibold text-slate-800">Datos de emisión</h3><p className="text-[11px] text-slate-500">Selecciona la venta confirmada que deseas facturar.</p></div></div>
              <CampoSeleccionable
                id="venta_factura"
                label="Venta confirmada"
                value={idVenta}
                onChange={(evento) => setIdVenta(evento.target.value)}
                placeholder="Buscar por número o cliente"
                options={ventasDisponibles.map((venta) => ({
                  value: venta.id_venta,
                  label: `${venta.numero_venta} · ${venta.cliente?.nombre_cliente ?? "Cliente"}`,
                  descripcion: `Total ${precioFactura(venta.total)} · ${fechaFactura(venta.fecha_venta)}`,
                }))}
                required
              />
            </div>

            {ventaSeleccionada && (
              <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                <div><p className="text-xs text-slate-500">Cliente</p><p className="mt-1 text-sm font-medium text-slate-800">{ventaSeleccionada.cliente?.nombre_cliente ?? "—"}</p></div>
                <div><p className="text-xs text-slate-500">Fecha de venta</p><p className="mt-1 text-sm text-slate-700">{fechaFactura(ventaSeleccionada.fecha_venta)}</p></div>
                <div><p className="text-xs text-slate-500">Subtotal</p><p className="mt-1 text-sm text-slate-700">{precioFactura(ventaSeleccionada.subtotal)}</p></div>
                <div><p className="text-xs text-slate-500">Total</p><p className="mt-1 text-sm font-semibold text-slate-900">{precioFactura(ventaSeleccionada.total)}</p></div>
              </div>
            )}

            <CampoFormulario id="numero_factura" label="Número de factura" value={numeroFactura} maxLength={50} autoComplete="off" sinIcono readOnly required />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Observaciones <span className="font-normal text-slate-400">(opcional)</span></span>
              <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} maxLength={255} rows={2} className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </label>
          </>
        )}

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button type="button" onClick={onCerrar} disabled={cargando} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60">Cerrar</button>
          {ventasDisponibles.length > 0 && <button type="submit" disabled={cargando} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:opacity-60">{cargando ? <Loader2 size={16} className="animate-spin" /> : <FileCheck2 size={16} />}{cargando ? "Emitiendo..." : "Emitir factura"}</button>}
        </div>
      </form>
    </Modal>
  );
}
