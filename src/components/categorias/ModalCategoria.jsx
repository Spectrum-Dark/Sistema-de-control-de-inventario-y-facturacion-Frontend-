import { useState } from "react";
import { Tag, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import {
  crearCategoria,
  actualizarCategoria,
} from "../../services/categorias/categoriasService";

const claseCampo =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function ModalCategoria({ categoria, onCerrar, onGuardado }) {
  const esEdicion = Boolean(categoria);

  const [form, setForm] = useState({
    nombre_categoria: categoria?.nombre_categoria ?? "",
    descripcion: categoria?.descripcion ?? "",
    estado: categoria?.estado ?? "Activa",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = form.nombre_categoria.trim();
    const descripcion = form.descripcion.trim();

    // Al editar, solo se envía lo que cambió
    const cambios = {};
    if (esEdicion) {
      if (nombre !== categoria.nombre_categoria) {
        cambios.nombre_categoria = nombre;
      }
      if (descripcion !== (categoria.descripcion ?? "")) {
        cambios.descripcion = descripcion || null;
      }
      if (form.estado !== categoria.estado) {
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
        ? await actualizarCategoria(categoria.id_categoria, cambios)
        : await crearCategoria({
            nombre_categoria: nombre,
            descripcion: descripcion || null,
          });

      sileo.success({
        title: esEdicion ? "Categoría actualizada" : "Categoría registrada",
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
      titulo={esEdicion ? "Editar categoría" : "Nueva categoría"}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoFormulario
          id="nombre_categoria"
          label="Nombre de la categoría"
          icono={Tag}
          type="text"
          placeholder="Ej: Frenos"
          maxLength={100}
          value={form.nombre_categoria}
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
            placeholder="Describe brevemente la categoría"
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
