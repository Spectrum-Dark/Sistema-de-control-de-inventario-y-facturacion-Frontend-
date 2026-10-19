import { useState } from "react";
import { Car, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import {
  crearMarca,
  actualizarMarca,
} from "../../services/marcas/marcasService";

const claseCampo =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function ModalMarca({ marca, onCerrar, onGuardado }) {
  const esEdicion = Boolean(marca);

  const [form, setForm] = useState({
    nombre_marca: marca?.nombre_marca ?? "",
    descripcion: marca?.descripcion ?? "",
    estado: marca?.estado ?? "Activa",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = form.nombre_marca.trim();
    const descripcion = form.descripcion.trim();

    // Al editar, solo se envía lo que cambió
    const cambios = {};
    if (esEdicion) {
      if (nombre !== marca.nombre_marca) {
        cambios.nombre_marca = nombre;
      }
      if (descripcion !== (marca.descripcion ?? "")) {
        cambios.descripcion = descripcion || null;
      }
      if (form.estado !== marca.estado) {
        cambios.estado = form.estado;
      }

      if (Object.keys(cambios).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarMarca(marca.id_marca, cambios)
        : await crearMarca({
            nombre_marca: nombre,
            descripcion: descripcion || null,
          });

      sileo.success({
        title: esEdicion ? "Marca actualizada" : "Marca registrada",
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
      titulo={esEdicion ? "Editar marca" : "Nueva marca"}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoFormulario
          id="nombre_marca"
          label="Nombre de la marca"
          icono={Car}
          type="text"
          placeholder="Ej: Toyota"
          maxLength={100}
          value={form.nombre_marca}
          onChange={handleChange}
          required
        />

        <div>
          <label
            htmlFor="descripcion"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Descripción{" "}
            <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            maxLength={255}
            placeholder="Describe brevemente la marca"
            value={form.descripcion}
            onChange={handleChange}
            className={`${claseCampo} resize-none`}
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {form.descripcion.length}/255
          </p>
        </div>

        {esEdicion && (
          <div>
            <label
              htmlFor="estado"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className={claseCampo}
            >
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
          </div>
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
              : esEdicion
              ? "Guardar cambios"
              : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}