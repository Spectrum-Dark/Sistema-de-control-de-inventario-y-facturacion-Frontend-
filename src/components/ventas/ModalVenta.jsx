import { useState } from "react";
import { Calendar, Hash, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import EditorDetallesVenta from "./EditorDetallesVenta";
import { registrarVenta, corregirVenta } from "../../services/ventas/ventasService";
import { calcularTotales, TASA_IVA } from "../../utils/ventas/calculos";
import {
  FILA_VACIA,
  filasDesdeDetalles,
  filaCompleta,
  filasAPayload,
} from "../../utils/ventas/detalles";
import { ahoraParaInput } from "../../utils/compartido/fecha";
import {
  aInputFechaVenta,
  deInputFechaVentaAUTC,
} from "../../utils/ventas/fecha";
import { formatearPrecio } from "../../utils/productos/formato";
import { generarCodigoAutomatico } from "../../utils/compartido/codigoAutomatico";

export default function ModalVenta({ venta, ventas, clientes, productos, onCerrar, onGuardado }) {
  const esCorreccion = Boolean(venta);
  const [form, setForm] = useState({
    id_cliente: String(venta?.id_cliente ?? ""),
    numero_venta: venta?.numero_venta ?? generarCodigoAutomatico(ventas, "numero_venta", "VTA-"),
    fecha_venta: venta ? aInputFechaVenta(venta.fecha_venta) : ahoraParaInput(),
    observaciones: venta?.observaciones ?? "",
    motivo: "",
  });
  const [filas, setFilas] = useState(
    venta?.detalles?.length ? filasDesdeDetalles(venta.detalles) : [{ ...FILA_VACIA }],
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const numeroVenta = esCorreccion
    ? form.numero_venta
    : generarCodigoAutomatico(ventas, "numero_venta", "VTA-");

  const opcionesProducto = productos;
  const totales = calcularTotales(filas);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const cambiarFilas = (nuevasFilas) => {
    setFilas(nuevasFilas);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filas.every(filaCompleta)) {
      setError("Completa el producto, la cantidad (entero mayor a 0) y el precio de cada fila.");
      return;
    }
    if (esCorreccion && form.motivo.trim().length < 5) {
      setError("El motivo de la corrección debe tener al menos 5 caracteres.");
      return;
    }

    const detalles = filasAPayload(filas);
    const observaciones = form.observaciones.trim() || null;
    const datos = esCorreccion
      ? { motivo: form.motivo.trim(), observaciones, detalles }
      : {
          id_cliente: Number(form.id_cliente),
          numero_venta: numeroVenta.trim(),
          ...(form.fecha_venta && { fecha_venta: deInputFechaVentaAUTC(form.fecha_venta) }),
          observaciones,
          detalles,
        };

    setCargando(true);
    try {
      const respuesta = esCorreccion
        ? await corregirVenta(venta.id_venta, datos)
        : await registrarVenta(datos);
      sileo.success({
        title: esCorreccion ? "Venta corregida" : "Venta registrada",
        description: respuesta.message,
      });
      onGuardado(respuesta.datos, !esCorreccion);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal
      titulo={esCorreccion ? `Corregir venta ${venta.numero_venta}` : "Nueva venta"}
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {esCorreccion ? (
            <CampoFormulario
              id="id_cliente"
              label="Cliente"
              type="text"
              value={venta.cliente?.nombre_cliente ?? "Cliente no disponible"}
              readOnly
            />
          ) : (
            <CampoSelect id="id_cliente" label="Cliente" value={form.id_cliente} onChange={handleChange} required>
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nombre_cliente}</option>
              ))}
            </CampoSelect>
          )}
          {!esCorreccion && (
            <CampoFormulario
              id="numero_venta"
              label="Número de venta"
              icono={Hash}
              type="text"
              placeholder="VTA-001"
              maxLength={50}
              value={numeroVenta}
              onChange={handleChange}
              readOnly
              required
            />
          )}
          {!esCorreccion && (
            <CampoFormulario
              id="fecha_venta"
              label="Fecha y hora de la venta"
              icono={Calendar}
              type="datetime-local"
              step="1"
              value={form.fecha_venta}
              onChange={handleChange}
            />
          )}
        </div>

        <CampoTextarea
          id="observaciones"
          label="Observaciones (opcional)"
          placeholder="Notas sobre la venta"
          value={form.observaciones}
          onChange={handleChange}
        />
        <EditorDetallesVenta filas={filas} productos={opcionesProducto} onChange={cambiarFilas} />

        <div className="ml-auto w-full space-y-1 rounded-lg bg-slate-50 p-4 text-sm sm:w-72">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatearPrecio(totales.subtotal)}</span></div>
          <div className="flex justify-between text-slate-600"><span>IVA ({Math.round(TASA_IVA * 100)} %)</span><span>{formatearPrecio(totales.impuesto)}</span></div>
          <div className="flex justify-between font-semibold text-slate-900"><span>Total</span><span>{formatearPrecio(totales.total)}</span></div>
          <p className="pt-1 text-xs text-slate-500">Vista previa; el servidor calcula los importes definitivos.</p>
        </div>

        {esCorreccion && (
          <>
            <CampoTextarea
              id="motivo"
              label="Motivo de la corrección"
              placeholder="Explica por qué se corrige la venta (mínimo 5 caracteres)"
              minLength={5}
              required
              value={form.motivo}
              onChange={handleChange}
            />
            <p className="text-xs text-slate-500">La corrección ajusta el inventario según las diferencias y queda registrada en el historial.</p>
          </>
        )}
        {!esCorreccion && <p className="text-xs text-slate-500">La venta se registra como pendiente. El inventario cambia al confirmarla, siempre que haya existencias suficientes.</p>}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCerrar} disabled={cargando} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">Cancelar</button>
          <button type="submit" disabled={cargando} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60">
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {cargando ? "Guardando..." : esCorreccion ? "Guardar corrección" : "Registrar venta"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
