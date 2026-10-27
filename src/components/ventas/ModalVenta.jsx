import { useState } from 'react';
import { Hash, Loader2 } from 'lucide-react';
import { sileo } from 'sileo';
import Modal from '../compartido/Modal';
import CampoFormulario from '../compartido/CampoFormulario';
import CampoSeleccionable from '../compartido/CampoSeleccionable';
import CampoTextarea from '../compartido/CampoTextarea';
import EditorDetallesVenta from './EditorDetallesVenta';
import {
  registrarVenta,
  corregirVenta,
} from '../../services/ventas/ventasService';
import { calcularTotales, TASA_IVA } from '../../utils/ventas/calculos';
import {
  FILA_VACIA,
  filasDesdeDetalles,
  filaCompleta,
  filasAPayload,
} from '../../utils/ventas/detalles';
import { ahoraParaInput } from '../../utils/compartido/fecha';
import {
  aInputFechaVenta,
  deInputFechaVentaAUTC,
} from '../../utils/ventas/fecha';
import { formatearPrecio } from '../../utils/productos/formato';
import { generarCodigoAutomatico } from '../../utils/compartido/codigoAutomatico';

// Componente modal 'ModalVenta' para la gestión unificada del registro de nuevas ventas o la corrección de transacciones ya existentes, controlando detalles, cálculos de totales y validaciones.
export default function ModalVenta({
  venta,
  ventas,
  clientes,
  productos,
  onCerrar,
  onGuardado,
}) {
  const esCorreccion = Boolean(venta);
  const [form, setForm] = useState({
    id_cliente: String(venta?.id_cliente ?? ''),
    numero_venta:
      venta?.numero_venta ??
      generarCodigoAutomatico(ventas, 'numero_venta', 'VTA-'),
    fecha_venta: venta ? aInputFechaVenta(venta.fecha_venta) : ahoraParaInput(),
    observaciones: venta?.observaciones ?? '',
    motivo: '',
  });
  const [filas, setFilas] = useState(
    venta?.detalles?.length
      ? filasDesdeDetalles(venta.detalles)
      : [{ ...FILA_VACIA }]
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const numeroVenta = esCorreccion
    ? form.numero_venta
    : generarCodigoAutomatico(ventas, 'numero_venta', 'VTA-');

  const opcionesProducto = productos;
  const opcionesCliente = [
    ...clientes,
    ...(venta &&
    !clientes.some(
      (cliente) => String(cliente.id_cliente) === String(venta.id_cliente)
    )
      ? [
          {
            ...venta.cliente,
            id_cliente: venta.id_cliente,
            nombre_cliente:
              venta.cliente?.nombre_cliente ?? 'Cliente actual',
          },
        ]
      : []),
  ].map((cliente) => ({
    value: cliente.id_cliente,
    label: cliente.nombre_cliente,
    descripcion:
      cliente.identificacion || cliente.telefono || 'Cliente registrado',
  }));
  const totales = calcularTotales(filas);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };
  const cambiarFilas = (nuevasFilas) => {
    setFilas(nuevasFilas);
    setError('');
  };

  // Manejador del envío del formulario para validar filas de productos, justificaciones de corrección e interactuar con la API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filas.every(filaCompleta)) {
      setError(
        'Completa el producto, la cantidad (entero mayor a 0) y el precio de cada fila.'
      );
      return;
    }
    if (esCorreccion && form.motivo.trim().length < 5) {
      setError('El motivo de la corrección debe tener al menos 5 caracteres.');
      return;
    }

    const detalles = filasAPayload(filas);
    const observaciones = form.observaciones.trim() || null;
    const datos = esCorreccion
      ? {
          motivo: form.motivo.trim(),
          observaciones,
          detalles,
          ...(Number(form.id_cliente) !== Number(venta.id_cliente) && {
            id_cliente: Number(form.id_cliente),
          }),
        }
      : {
          id_cliente: Number(form.id_cliente),
          numero_venta: numeroVenta.trim(),
          ...(form.fecha_venta && {
            fecha_venta: deInputFechaVentaAUTC(form.fecha_venta),
          }),
          observaciones,
          detalles,
        };

    setCargando(true);
    try {
      const respuesta = esCorreccion
        ? await corregirVenta(venta.id_venta, datos)
        : await registrarVenta(datos);
      sileo.success({
        title: esCorreccion ? 'Venta corregida' : 'Venta registrada',
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
      titulo={
        esCorreccion ? `Corregir venta ${venta.numero_venta}` : 'Nueva venta'
      }
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sección de metadatos generales de la venta (cliente, código y fecha) */}
        <section className="space-y-3 border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-semibold text-slate-800">
                Información de venta
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Cliente y datos del registro.
              </p>
            </div>
            {!esCorreccion && (
              <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Nueva operación
              </span>
            )}
          </div>
          <div
            className={`grid grid-cols-1 gap-3 ${esCorreccion ? 'sm:grid-cols-[1.15fr_1fr]' : 'sm:grid-cols-[1.15fr_1fr_1fr]'}`}
          >
            <CampoSeleccionable
              id="id_cliente"
              label="Cliente"
              value={form.id_cliente}
              onChange={handleChange}
              placeholder="Escribe el nombre o identificación"
              maxOpciones={Infinity}
              options={opcionesCliente}
              required
            />
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
                type="datetime-local"
                step="1"
                value={form.fecha_venta}
                onChange={handleChange}
              />
            )}
          </div>
        </section>

        {/* Componente editor para administrar los detalles interactivos de productos */}
        <EditorDetallesVenta
          filas={filas}
          productos={opcionesProducto}
          venta={venta}
          onChange={cambiarFilas}
        />

        {/* Sección inferior con observaciones, motivo de corrección (si aplica) y tarjeta de resumen financiero */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-3">
            <CampoTextarea
              id="observaciones"
              label="Observaciones (opcional)"
              placeholder="Notas sobre la venta"
              rows={2}
              value={form.observaciones}
              onChange={handleChange}
            />
            {esCorreccion && (
              <CampoTextarea
                id="motivo"
                label="Motivo de la corrección"
                placeholder="Explica por qué se corrige la venta (mínimo 5 caracteres)"
                rows={2}
                minLength={5}
                required
                value={form.motivo}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-xs font-semibold text-slate-700">
              Resumen de venta
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatearPrecio(totales.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA ({Math.round(TASA_IVA * 100)} %)</span>
                <span>{formatearPrecio(totales.impuesto)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-800 px-3 py-2.5 font-semibold text-white">
                <span>Total</span>
                <span>{formatearPrecio(totales.total)}</span>
              </div>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
              Importes estimados; el servidor calcula los valores definitivos.
            </p>
          </div>
        </div>

        {/* Mensajes informativos de contexto operativo */}
        {esCorreccion && (
          <>
            <p className="text-xs text-slate-500">
              La corrección ajusta el inventario según las diferencias y queda
              registrada en el historial.
            </p>
          </>
        )}
        {!esCorreccion && (
          <p className="text-xs text-slate-500">
            La venta se registra como pendiente. El inventario cambia al
            confirmarla, siempre que haya existencias suficientes.
          </p>
        )}

        {/* Mensaje de alerta visual en caso de registrarse errores */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Botones de acción del pie del modal */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {cargando
              ? 'Guardando...'
              : esCorreccion
                ? 'Guardar corrección'
                : 'Registrar venta'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
