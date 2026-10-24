import { useState } from "react";
import { Loader2, Link2, Package, CarFront, Save, Plus } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import { obtenerCambios } from "../../utils/compartido/formulario";
import {
  crearCompatibilidad,
  actualizarCompatibilidad,
} from "../../services/compatibilidades/compatibilidadesService";

export default function ModalCompatibilidad({
  compatibilidad,
  productos,
  modelos,
  nombresMarcas,
  onCerrar,
  onGuardado,
}) {
  const esEdicion = Boolean(compatibilidad?.id_compatibilidad);

  const [form, setForm] = useState({
    id_producto: String(compatibilidad?.id_producto ?? ""),
    id_modelo: String(compatibilidad?.id_modelo ?? ""),
    observaciones: compatibilidad?.observaciones ?? "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Solo activos, más el producto o modelo actual al editar
  const opcionesProducto = productos.filter(
    (p) =>
      p.estado === "Activo" || p.id_producto === compatibilidad?.id_producto,
  );
  const opcionesModelo = modelos.filter(
    (m) => m.estado === "Activo" || m.id_modelo === compatibilidad?.id_modelo,
  );
  const productoSeleccionado = productos.find((p) => String(p.id_producto) === form.id_producto);
  const modeloSeleccionado = modelos.find((m) => String(m.id_modelo) === form.id_modelo);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id_producto || !form.id_modelo) {
      setError("Selecciona un producto y un modelo.");
      return;
    }

    const valores = {
      id_producto: Number(form.id_producto),
      id_modelo: Number(form.id_modelo),
      observaciones: form.observaciones.trim() || null,
    };

    let datos = valores;

    if (esEdicion) {
      // Al editar, solo se envía lo que cambió
      const original = {
        id_producto: Number(compatibilidad.id_producto),
        id_modelo: Number(compatibilidad.id_modelo),
        observaciones: compatibilidad.observaciones ?? null,
      };
      datos = obtenerCambios(valores, original);

      if (Object.keys(datos).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarCompatibilidad(
            compatibilidad.id_compatibilidad,
            datos,
          )
        : await crearCompatibilidad(datos);

      sileo.success({
        title: esEdicion
          ? "Compatibilidad actualizada"
          : "Compatibilidad registrada",
        description: respuesta.message,
      });
      onGuardado(respuesta.datos, !esEdicion);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal
      titulo={esEdicion ? "Editar compatibilidad" : "Nueva compatibilidad"}
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><Link2 size={19} strokeWidth={1.8} /></span>
          <div><p className="text-sm font-semibold text-slate-900">{esEdicion ? "Datos de compatibilidad" : "Relaciona repuesto y vehículo"}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{esEdicion ? "Actualiza el producto, el modelo o las observaciones." : "Selecciona los elementos que deben quedar vinculados."}</p>{esEdicion && <p className="mt-2 text-[10px] font-medium text-slate-400">Registro #{compatibilidad.id_compatibilidad}</p>}</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CampoSelect id="id_producto" label="Producto" value={form.id_producto} onChange={handleChange} required>
            <option value="">Selecciona un producto</option>
            {opcionesProducto.map((producto) => <option key={producto.id_producto} value={producto.id_producto}>{producto.codigo_producto} – {producto.nombre_producto}</option>)}
          </CampoSelect>
          <CampoSelect id="id_modelo" label="Modelo de vehículo" value={form.id_modelo} onChange={handleChange} required>
            <option value="">Selecciona un modelo</option>
            {opcionesModelo.map((modelo) => <option key={modelo.id_modelo} value={modelo.id_modelo}>{nombresMarcas[modelo.id_marca] ?? "—"} – {modelo.nombre_modelo}</option>)}
          </CampoSelect>
          <div className="sm:col-span-2"><CampoTextarea id="observaciones" label="Observaciones (opcional)" maxLength={255} placeholder="Ej.: solo versiones con ABS" value={form.observaciones} onChange={handleChange} /></div>
        </div>

        {!esEdicion && <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">Vista previa</p><div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="flex min-w-0 items-center gap-2.5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"><Package size={15} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-800">{productoSeleccionado?.nombre_producto || "Producto"}</span><span className="block truncate text-xs text-slate-500">{productoSeleccionado?.codigo_producto || "Código"}</span></span></div><Link2 size={16} className="hidden text-slate-400 sm:block" /><div className="flex min-w-0 items-center gap-2.5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"><CarFront size={15} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-800">{modeloSeleccionado?.nombre_modelo || "Modelo de vehículo"}</span><span className="block truncate text-xs text-slate-500">{modeloSeleccionado ? nombresMarcas[modeloSeleccionado.id_marca] ?? "Marca" : "Marca"}</span></span></div></div></div>}

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={cargando}
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {!cargando && (esEdicion ? <Save size={15} /> : <Plus size={15} />)}
            {cargando
              ? "Guardando..."
              : esEdicion
                ? "Guardar cambios"
                : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
