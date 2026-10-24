import { useState } from "react";
import { CarFront, Calendar, Loader2, Save, Plus } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import { formatearAnios } from "../../utils/modelos/formato";
import {
  aNumeroONull,
  obtenerCambios,
} from "../../utils/compartido/formulario";
import {
  crearModelo,
  actualizarModelo,
} from "../../services/modelos/modelosService";

export default function ModalModelo({ modelo, marcas, onCerrar, onGuardado }) {
  const esEdicion = Boolean(modelo?.id_modelo);

  const [form, setForm] = useState({
    id_marca: String(modelo?.id_marca ?? ""),
    nombre_modelo: modelo?.nombre_modelo ?? "",
    anio_inicio: modelo?.anio_inicio ?? "",
    anio_fin: modelo?.anio_fin ?? "",
    descripcion: modelo?.descripcion ?? "",
    estado: esEdicion ? modelo.estado ?? "Activo" : undefined,
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

    if (!form.id_marca) {
      setError("Selecciona una marca.");
      return;
    }
    if (!form.nombre_modelo.trim()) {
      setError("El nombre del modelo es obligatorio.");
      return;
    }

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
      ancho="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><CarFront size={19} strokeWidth={1.8} /></span>
          <div><p className="text-sm font-semibold text-slate-900">{esEdicion ? "Detalles del modelo" : "Nuevo modelo de vehículo"}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{esEdicion ? "Actualiza la marca, los años de fabricación o la descripción." : "Asocia el modelo con su marca y define sus años de fabricación."}</p>{esEdicion && <p className="mt-2 text-[10px] font-medium text-slate-400">Registro #{modelo.id_modelo}</p>}</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CampoSelect id="id_marca" label="Marca" value={form.id_marca} onChange={handleChange} required>
            <option value="">Selecciona una marca</option>
            {opcionesMarca.map((marca) => <option key={marca.id_marca} value={marca.id_marca}>{marca.nombre_marca}</option>)}
          </CampoSelect>

          <CampoFormulario
            id="nombre_modelo"
            label="Nombre del modelo"
            icono={CarFront}
            type="text"
            placeholder="Ej.: Corolla"
            maxLength={100}
            value={form.nombre_modelo}
            onChange={handleChange}
            required
          />

          <CampoFormulario
            id="anio_inicio"
            label="Año de inicio"
            icono={Calendar}
            type="number"
            min={1886}
            placeholder="Ej.: 2010 (opcional)"
            value={form.anio_inicio}
            onChange={handleChange}
          />
          <CampoFormulario
            id="anio_fin"
            label="Año de fin"
            icono={Calendar}
            type="number"
            min={1886}
            placeholder="Ej.: 2024 (opcional)"
            value={form.anio_fin}
            onChange={handleChange}
          />
          <div className="sm:col-span-2">
            <CampoTextarea
              id="descripcion"
              label="Descripción (opcional)"
              maxLength={255}
              placeholder="Describe brevemente el modelo o sus variantes"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>

          {esEdicion && (
            <div className="sm:col-span-2">
              <CampoSelect id="estado" label="Estado" value={form.estado} onChange={handleChange}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </CampoSelect>
            </div>
          )}
        </div>

        {!esEdicion && <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">Vista previa</p><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"><CarFront size={16} /></span><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{form.nombre_modelo.trim() || "Nombre del modelo"}</p><p className="mt-0.5 truncate text-xs text-slate-500">{marcas.find((marca) => String(marca.id_marca) === form.id_marca)?.nombre_marca || "Selecciona una marca"} · {formatearAnios(form.anio_inicio || null, form.anio_fin || null)}</p></div></div></div>}

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
