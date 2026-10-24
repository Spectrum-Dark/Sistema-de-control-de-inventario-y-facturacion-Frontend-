import { useEffect, useState } from 'react';
import { Hash, Calendar, Loader2, Package, ReceiptText } from 'lucide-react';
import { sileo } from 'sileo';
import Modal from '../compartido/Modal';
import CampoFormulario from '../compartido/CampoFormulario';
import CampoSeleccionable from '../compartido/CampoSeleccionable';
import CampoTextarea from '../compartido/CampoTextarea';
import EditorDetallesCompra from './EditorDetallesCompra';
import {
  registrarCompra,
  corregirCompra,
  listarProductosPorProveedor,
} from '../../services/compras/comprasService';
import { calcularTotales, TASA_IVA } from '../../utils/compras/calculos';
import {
  FILA_VACIA,
  filasDesdeDetalles,
  filaCompleta,
  filasAPayload,
  firmaDetalles,
} from '../../utils/compras/detalles';
import {
  aInputFechaHora,
  ahoraParaInput,
  deInputAFechaHora,
} from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';
import { generarCodigoAutomatico } from '../../utils/compartido/codigoAutomatico';

// Componente modal principal para registrar nuevas compras o corregir compras existentes, incluyendo gestión de proveedor, fechas, detalles dinámicos de productos y cálculo automático de totales.
export default function ModalCompra({
  compra,
  compras,
  proveedores,
  productos,
  onCerrar,
  onGuardado,
}) {
  // Determina si el modal se encuentra en modo corrección (edición de compra existente) o en modo registro nuevo.
  const esCorreccion = Boolean(compra);

  // Estado local para los campos principales del formulario de compra.
  const [form, setForm] = useState({
    id_proveedor: String(compra?.id_proveedor ?? ''),
    numero_compra: compra?.numero_compra ?? '',
    // Si es compra nueva, inicializa con la fecha y hora actuales; si es corrección, mantiene la fecha previa.
    fecha_compra: compra
      ? aInputFechaHora(compra.fecha_compra)
      : ahoraParaInput(),
    observaciones: compra?.observaciones ?? '',
    motivo: '',
  });

  // Estado local para los renglones o detalles de productos asociados a la compra.
  const [filas, setFilas] = useState(
    compra?.detalles?.length
      ? filasDesdeDetalles(compra.detalles)
      : [{ ...FILA_VACIA }]
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Estado local para manejar de forma asíncrona la carga de productos específicos filtrados por proveedor.
  const [estadoProductosProveedor, setEstadoProductosProveedor] = useState(
    () => ({
      id: String(compra?.id_proveedor ?? ''),
      estado: compra?.id_proveedor ? 'cargando' : 'inactivo',
      datos: [],
      error: '',
    })
  );

  // Genera automáticamente el número de compra secuencial si es un registro nuevo.
  const numeroCompra = esCorreccion
    ? form.numero_compra
    : generarCodigoAutomatico(
        compras,
        'numero_compra',
        `COMP-${new Date().getFullYear()}-`
      );

  // Efecto secundario para consultar y actualizar los productos disponibles según el proveedor seleccionado.
  useEffect(() => {
    if (!form.id_proveedor) {
      return undefined;
    }

    let activo = true;
    listarProductosPorProveedor(form.id_proveedor)
      .then(
        (respuesta) =>
          activo &&
          setEstadoProductosProveedor({
            id: String(form.id_proveedor),
            estado: 'listo',
            datos: respuesta.datos,
            error: '',
          })
      )
      .catch(
        (e) =>
          activo &&
          setEstadoProductosProveedor({
            id: String(form.id_proveedor),
            estado: 'error',
            datos: [],
            error: e.message,
          })
      );

    return () => {
      activo = false;
    };
  }, [form.id_proveedor]);

  // Filtra y valida los productos activos y aquellos ya vinculados previamente a la compra.
  const idsEnCompra = new Set(
    String(form.id_proveedor) === String(compra?.id_proveedor ?? '')
      ? (compra?.detalles ?? []).map((d) => String(d.id_producto))
      : []
  );
  const idsSeleccionados = new Set(
    filas.map((fila) => String(fila.id_producto))
  );
  const productosDelProveedor =
    estadoProductosProveedor.id === form.id_proveedor
      ? estadoProductosProveedor.datos
      : [];
  const productosSeleccionados = productos.filter(
    (p) =>
      idsSeleccionados.has(String(p.id_producto)) ||
      idsEnCompra.has(String(p.id_producto))
  );
  const disponibles = new Map();
  [...productosDelProveedor, ...productosSeleccionados].forEach((p) => {
    if (
      p.estado === 'Activo' ||
      idsEnCompra.has(String(p.id_producto)) ||
      idsSeleccionados.has(String(p.id_producto))
    ) {
      disponibles.set(String(p.id_producto), p);
    }
  });
  const opcionesProducto = [...disponibles.values()];
  const opcionesProveedor = proveedores.filter(
    (p) => p.estado === 'Activo' || p.id_proveedor === compra?.id_proveedor
  );

  // Calcula en tiempo real los totales generales (subtotal, impuesto y total) en base a los detalles actuales.
  const totales = calcularTotales(filas);

  // Manejador general de cambios en los campos del formulario principal.
  const handleChange = (e) => {
    if (
      e.target.name === 'id_proveedor' &&
      e.target.value !== form.id_proveedor
    ) {
      setFilas([{ ...FILA_VACIA }]);
      setEstadoProductosProveedor({
        id: e.target.value,
        estado: e.target.value ? 'cargando' : 'inactivo',
        datos: [],
        error: '',
      });
    }
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Actualiza el listado de filas en el editor de detalles de compra.
  const cambiarFilas = (nuevasFilas) => {
    setFilas(nuevasFilas);
    setError('');
  };

  // Maneja el envío del formulario (creación de compra o guardado de corrección con validación diferencial).
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!filas.every(filaCompleta)) {
      setError(
        'Completa el producto, la cantidad (entero mayor a 0) y el precio de cada fila.'
      );
      return;
    }

    const detalles = filasAPayload(filas);
    const observaciones = form.observaciones.trim() || null;
    let datos;

    if (esCorreccion) {
      // Al corregir, calcula y envía únicamente los campos modificados junto con el motivo requerido.
      datos = {};
      if (Number(form.id_proveedor) !== compra.id_proveedor) {
        datos.id_proveedor = Number(form.id_proveedor);
      }
      if (
        form.fecha_compra &&
        form.fecha_compra !== aInputFechaHora(compra.fecha_compra)
      ) {
        datos.fecha_compra = deInputAFechaHora(form.fecha_compra);
      }
      if (observaciones !== (compra.observaciones ?? null)) {
        datos.observaciones = observaciones;
      }
      if (firmaDetalles(detalles) !== firmaDetalles(compra.detalles)) {
        datos.detalles = detalles;
      }

      if (Object.keys(datos).length === 0) {
        setError('No hay cambios para corregir.');
        return;
      }

      datos.motivo = form.motivo.trim();
    } else {
      datos = {
        id_proveedor: Number(form.id_proveedor),
        numero_compra: numeroCompra.trim(),
        observaciones,
        detalles,
      };
      if (form.fecha_compra) {
        datos.fecha_compra = deInputAFechaHora(form.fecha_compra);
      }
    }

    setCargando(true);

    try {
      const respuesta = esCorreccion
        ? await corregirCompra(compra.id_compra, datos)
        : await registrarCompra(datos);

      sileo.success({
        title: esCorreccion ? 'Compra corregida' : 'Compra registrada',
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
        esCorreccion
          ? `Corregir compra ${compra.numero_compra}`
          : 'Nueva compra'
      }
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sección de datos generales de la compra (Proveedor, Número de compra y Fecha) */}
        <section className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600">
              <ReceiptText size={16} />
            </span>
            <div>
              <h3 className="text-xs font-semibold text-slate-800">
                Datos de la compra
              </h3>
              <p className="text-[11px] text-slate-500">
                Proveedor, número y fecha del registro.
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 items-start gap-3 ${esCorreccion ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-3'}`}
          >
            {/* Selector de proveedor asociado */}
            <CampoSeleccionable
              id="id_proveedor"
              label="Proveedor"
              value={form.id_proveedor}
              onChange={handleChange}
              placeholder="Escribe el nombre del proveedor"
              options={opcionesProveedor.map((proveedor) => ({
                value: proveedor.id_proveedor,
                label: proveedor.nombre_proveedor,
                descripcion:
                  proveedor.empresa ||
                  proveedor.telefono ||
                  'Proveedor registrado',
              }))}
              required
            />

            {/* Número de compra generado automáticamente (solo en modo registro nuevo) */}
            {!esCorreccion && (
              <CampoFormulario
                id="numero_compra"
                label="Número de compra"
                icono={Hash}
                type="text"
                placeholder={`COMP-${new Date().getFullYear()}-001`}
                maxLength={50}
                value={numeroCompra}
                onChange={handleChange}
                readOnly
                required
              />
            )}

            {/* Selector de fecha y hora de la compra */}
            <CampoFormulario
              id="fecha_compra"
              label="Fecha y hora de la compra"
              icono={Calendar}
              type="datetime-local"
              step="1"
              value={form.fecha_compra}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Sección de detalle de productos (editor dinámico de líneas) */}
        <section className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
              <Package size={16} />
            </span>
            <div>
              <h3 className="text-xs font-semibold text-slate-800">
                Detalle de productos
              </h3>
              <p className="text-[11px] text-slate-500">
                Selecciona los productos asociados al proveedor.
              </p>
            </div>
          </div>
          <EditorDetallesCompra
            filas={filas}
            productos={opcionesProducto}
            onChange={cambiarFilas}
          />
        </section>

        {/* Indicadores de carga o error al obtener los productos del proveedor seleccionado */}
        {estadoProductosProveedor.id === form.id_proveedor &&
          estadoProductosProveedor.estado === 'cargando' && (
            <p className="text-xs text-slate-500">
              Cargando productos de este proveedor...
            </p>
          )}
        {estadoProductosProveedor.id === form.id_proveedor &&
          estadoProductosProveedor.error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              No se pudieron cargar los productos del proveedor:{' '}
              {estadoProductosProveedor.error}
            </p>
          )}

        {/* Bloque inferior con observaciones, motivo de corrección (si aplica) y resumen de totales */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-3">
            <CampoTextarea
              id="observaciones"
              label="Observaciones (opcional)"
              placeholder="Notas sobre la compra"
              value={form.observaciones}
              onChange={handleChange}
            />

            {/* Campo de motivo obligatorio en caso de correcciones */}
            {esCorreccion && (
              <CampoTextarea
                id="motivo"
                label="Motivo de la corrección"
                placeholder="Explica por qué se corrige la compra (mínimo 5 caracteres)"
                maxLength={2000}
                minLength={5}
                required
                value={form.motivo}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Tarjeta de resumen de montos (subtotal, IVA y total estimado) */}
          <div className="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
            <p className="mb-2 text-xs font-semibold text-slate-700">
              Resumen de compra
            </p>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatearPrecio(totales.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>IVA ({Math.round(TASA_IVA * 100)} %)</span>
              <span>{formatearPrecio(totales.impuesto)}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>Total</span>
              <span>{formatearPrecio(totales.total)}</span>
            </div>
            <p className="pt-1 text-xs text-slate-500">
              Vista previa: el servidor calcula el total definitivo.
            </p>
          </div>
        </div>

        {/* Nota aclaratoria según el modo actual (registro vs corrección) */}
        {esCorreccion ? (
          <p className="text-xs text-slate-500">
            La corrección ajusta el inventario según las diferencias y queda
            registrada en el historial.
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            La compra se registra sin afectar el inventario. Las existencias se
            actualizan cuando la confirmes.
          </p>
        )}

        {/* Alerta de error general del formulario */}
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
                : 'Registrar compra'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
