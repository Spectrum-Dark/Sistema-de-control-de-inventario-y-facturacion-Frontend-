import { useState } from "react";
import { Hash, Calendar, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import EditorDetallesCompra from "./EditorDetallesCompra";
import {
  registrarCompra,
  corregirCompra,
} from "../../services/compras/comprasService";
import { calcularTotales, TASA_IVA } from "../../utils/compras/calculos";
import {
  FILA_VACIA,
  filasDesdeDetalles,
  filaCompleta,
  filasAPayload,
  firmaDetalles,
} from "../../utils/compras/detalles";
import {
  aInputFechaHora,
  ahoraParaInput,
  deInputAFechaHora,
} from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

export default function ModalCompra({
  compra,
  proveedores,
  productos,
  onCerrar,
  onGuardado,
}) {
  const esCorreccion = Boolean(compra);

  const [form, setForm] = useState({
    id_proveedor: String(compra?.id_proveedor ?? ""),
    numero_compra: compra?.numero_compra ?? "",
    // Compra nueva: fecha y hora actuales. Corrección: la que ya tenía.
    fecha_compra: compra
      ? aInputFechaHora(compra.fecha_compra)
      : ahoraParaInput(),
    observaciones: compra?.observaciones ?? "",
    motivo: "",
  });
  const [filas, setFilas] = useState(
    compra?.detalles?.length
      ? filasDesdeDetalles(compra.detalles)
      : [{ ...FILA_VACIA }]
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Solo activos, más los que ya tenía la compra al corregirla
  const idsEnCompra = (compra?.detalles ?? []).map((d) => d.id_producto);
  const opcionesProducto = productos.filter(
    (p) => p.estado === "Activo" || idsEnCompra.includes(p.id_producto)
  );
  const opcionesProveedor = proveedores.filter(
    (p) => p.estado === "Activo" || p.id_proveedor === compra?.id_proveedor
  );

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
      setError(
        "Completa el producto, la cantidad (entero mayor a 0) y el precio de cada fila."
      );
      return;
    }

    const detalles = filasAPayload(filas);
    const observaciones = form.observaciones.trim() || null;
    let datos;

    if (esCorreccion) {
      // Solo se envía lo que cambió
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
        setError("No hay cambios para corregir.");
        return;
      }

      datos.motivo = form.motivo.trim();
    } else {
      datos = {
        id_proveedor: Number(form.id_proveedor),
        numero_compra: form.numero_compra.trim(),
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
        title: esCorreccion ? "Compra corregida" : "Compra registrada",
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
          : "Nueva compra"
      }
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CampoSelect
            id="id_proveedor"
            label="Proveedor"
            value={form.id_proveedor}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un proveedor</option>
            {opcionesProveedor.map((p) => (
              <option key={p.id_proveedor} value={p.id_proveedor}>
                {p.nombre_proveedor}
              </option>
            ))}
          </CampoSelect>

          {!esCorreccion && (
            <CampoFormulario
              id="numero_compra"
              label="Número de compra"
              icono={Hash}
              type="text"
              placeholder="Ej: COMPRA-001"
              maxLength={50}
              value={form.numero_compra}
              onChange={handleChange}
              required
            />
          )}

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

        <CampoTextarea
          id="observaciones"
          label="Observaciones (opcional)"
          placeholder="Notas sobre la compra"
          value={form.observaciones}
          onChange={handleChange}
        />

        <EditorDetallesCompra
          filas={filas}
          productos={opcionesProducto}
          onChange={cambiarFilas}
        />

        <div className="ml-auto w-full space-y-1 rounded-lg bg-slate-50 p-4 text-sm sm:w-72">
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

        {esCorreccion ? (
          <>
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
            <p className="text-xs text-slate-500">
              La corrección ajusta el inventario según las diferencias y queda
              registrada en el historial.
            </p>
          </>
        ) : (
          <p className="text-xs text-slate-500">
            La compra se registra sin afectar el inventario. Las existencias
            se actualizan cuando la confirmes.
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
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
              ? "Guardando..."
              : esCorreccion
              ? "Guardar corrección"
              : "Registrar compra"}
          </button>
        </div>
      </form>
    </Modal>
  );
}