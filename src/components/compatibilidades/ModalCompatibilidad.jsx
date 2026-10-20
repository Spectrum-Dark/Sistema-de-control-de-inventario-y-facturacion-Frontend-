import { useState } from "react";
import { Loader2 } from "lucide-react";
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
  const esEdicion = Boolean(compatibilidad);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoSelect
          id="id_producto"
          label="Producto"
          value={form.id_producto}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un producto</option>
          {opcionesProducto.map((p) => (
            <option key={p.id_producto} value={p.id_producto}>
              {p.codigo_producto} – {p.nombre_producto}
            </option>
          ))}
        </CampoSelect>

        <CampoSelect
          id="id_modelo"
          label="Modelo de vehículo"
          value={form.id_modelo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un modelo</option>
          {opcionesModelo.map((m) => (
            <option key={m.id_modelo} value={m.id_modelo}>
              {nombresMarcas[m.id_marca] ?? "—"} – {m.nombre_modelo}
            </option>
          ))}
        </CampoSelect>

        <CampoTextarea
          id="observaciones"
          label="Observaciones (opcional)"
          maxLength={255}
          placeholder="Ej: solo versiones con ABS"
          value={form.observaciones}
          onChange={handleChange}
        />

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
              : esEdicion
                ? "Guardar cambios"
                : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
