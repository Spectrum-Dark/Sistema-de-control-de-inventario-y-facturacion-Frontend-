import { useState } from "react";
import { Car, Calendar, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import {
  aNumeroONull,
  obtenerCambios,
} from "../../utils/compartido/formulario";
import {
  crearModelo,
  actualizarModelo,
} from "../../services/modelos/modelosService";

export default function ModalModelo({ modelo, marcas, onCerrar, onGuardado }) {
  const esEdicion = Boolean(modelo);

  const [form, setForm] = useState({
    id_marca: String(modelo?.id_marca ?? ""),
    nombre_modelo: modelo?.nombre_modelo ?? "",
    anio_inicio: modelo?.anio_inicio ?? "",
    anio_fin: modelo?.anio_fin ?? "",
    descripcion: modelo?.descripcion ?? "",
    estado: modelo?.estado ?? "Activo",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Para un modelo nuevo, solo marcas activas; al editar se incluye también la actual
  const opcionesMarca = marcas.filter(
    (m) => m.estado === "Activa" || m.id_marca === modelo?.id_marca,
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valores = {
      id_marca: Number(form.id_marca),
      nombre_modelo: form.nombre_modelo.trim(),
      anio_inicio: aNumeroONull(form.anio_inicio),
      anio_fin: aNumeroONull(form.anio_fin),
      descripcion: form.descripcion.trim() || null,
    };

    if (
      valores.anio_inicio !== null &&
      valores.anio_fin !== null &&
      valores.anio_fin < valores.anio_inicio
    ) {
      setError(
        "El año de finalización no puede ser menor que el año de inicio.",
      );
      return;
    }

    let datos = valores;

    if (esEdicion) {
      // Al editar, solo se envía lo que cambió
      const original = {
        id_marca: Number(modelo.id_marca),
        nombre_modelo: modelo.nombre_modelo,
        anio_inicio: aNumeroONull(modelo.anio_inicio),
        anio_fin: aNumeroONull(modelo.anio_fin),
        descripcion: modelo.descripcion ?? null,
      };
      datos = obtenerCambios(valores, original);
      if (form.estado !== modelo.estado) datos.estado = form.estado;

      if (Object.keys(datos).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarModelo(modelo.id_modelo, datos)
        : await crearModelo(datos);

      sileo.success({
        title: esEdicion ? "Modelo actualizado" : "Modelo registrado",
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
      titulo={esEdicion ? "Editar modelo" : "Nuevo modelo"}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoSelect
          id="id_marca"
          label="Marca"
          value={form.id_marca}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una marca</option>
          {opcionesMarca.map((m) => (
            <option key={m.id_marca} value={m.id_marca}>
              {m.nombre_marca}
            </option>
          ))}
        </CampoSelect>

        <CampoFormulario
          id="nombre_modelo"
          label="Nombre del modelo"
          icono={Car}
          type="text"
          placeholder="Ej: Corolla"
          maxLength={100}
          value={form.nombre_modelo}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <CampoFormulario
            id="anio_inicio"
            label="Año de inicio"
            icono={Calendar}
            type="number"
            min={1886}
            placeholder="Opcional"
            value={form.anio_inicio}
            onChange={handleChange}
          />
          <CampoFormulario
            id="anio_fin"
            label="Año de fin"
            icono={Calendar}
            type="number"
            min={1886}
            placeholder="Opcional"
            value={form.anio_fin}
            onChange={handleChange}
          />
        </div>

        <CampoTextarea
          id="descripcion"
          label="Descripción (opcional)"
          maxLength={255}
          placeholder="Describe brevemente el modelo"
          value={form.descripcion}
          onChange={handleChange}
        />

        {esEdicion && (
          <CampoSelect
            id="estado"
            label="Estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </CampoSelect>
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
