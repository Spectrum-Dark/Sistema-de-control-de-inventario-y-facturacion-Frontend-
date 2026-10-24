import { useState } from "react";
import { UserRound, Hash, Phone, Mail, MapPin, Loader2, Save, Plus } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import { obtenerCambios } from "../../utils/compartido/formulario";
import {
  crearCliente,
  actualizarCliente,
} from "../../services/clientes/clientesService";

export default function ModalCliente({ cliente, onCerrar, onGuardado }) {
  const esEdicion = Boolean(cliente?.id_cliente);

  const [form, setForm] = useState({
    nombre_cliente: cliente?.nombre_cliente ?? "",
    identificacion: cliente?.identificacion ?? "",
    telefono: cliente?.telefono ?? "",
    correo: cliente?.correo ?? "",
    direccion: cliente?.direccion ?? "",
    estado: esEdicion ? cliente.estado ?? "Activo" : undefined,
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre_cliente.trim()) {
      setError("El nombre del cliente es obligatorio.");
      return;
    }

    // Los campos opcionales vacíos se envían como null
    const valores = {
      nombre_cliente: form.nombre_cliente.trim(),
      identificacion: form.identificacion.trim() || null,
      telefono: form.telefono.trim() || null,
      correo: form.correo.trim() || null,
      direccion: form.direccion.trim() || null,
    };

    let datos = valores;

    if (esEdicion) {
      // Al editar, solo se envía lo que cambió
      datos = obtenerCambios(valores, {
        nombre_cliente: cliente.nombre_cliente,
        identificacion: cliente.identificacion ?? null,
        telefono: cliente.telefono ?? null,
        correo: cliente.correo ?? null,
        direccion: cliente.direccion ?? null,
      });
      if (form.estado !== cliente.estado) datos.estado = form.estado;

      if (Object.keys(datos).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarCliente(cliente.id_cliente, datos)
        : await crearCliente(datos);

      sileo.success({
        title: esEdicion ? "Cliente actualizado" : "Cliente registrado",
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
      titulo={esEdicion ? "Editar cliente" : "Nuevo cliente"}
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><UserRound size={19} strokeWidth={1.8} /></span>
          <div><p className="text-sm font-semibold text-slate-900">{esEdicion ? "Datos del cliente" : "Nuevo cliente"}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{esEdicion ? "Mantén actualizados los datos de contacto y estado." : "Registra los datos de contacto para facilitar las ventas y el seguimiento."}</p>{esEdicion && <p className="mt-2 text-[10px] font-medium text-slate-400">Registro #{cliente.id_cliente}</p>}</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <CampoFormulario
              id="nombre_cliente"
              label="Nombre del cliente"
              icono={UserRound}
              type="text"
              placeholder="Ej.: Juan Pérez"
              maxLength={150}
              value={form.nombre_cliente}
              onChange={handleChange}
              required
            />
          </div>

        <CampoFormulario
          id="identificacion"
          label="Identificación (opcional)"
          icono={Hash}
          type="text"
          placeholder="Ej.: cédula o RUC"
          maxLength={50}
          value={form.identificacion}
          onChange={handleChange}
        />

        <CampoFormulario
          id="telefono"
          label="Teléfono (opcional)"
          icono={Phone}
          type="tel"
          placeholder="Ej.: 8888-1234"
          maxLength={30}
          value={form.telefono}
          onChange={handleChange}
        />

        <div className="sm:col-span-2">
          <CampoFormulario
            id="correo"
            label="Correo electrónico (opcional)"
            icono={Mail}
            type="email"
            placeholder="cliente@correo.com"
            maxLength={150}
            value={form.correo}
            onChange={handleChange}
          />
        </div>

        <div className="sm:col-span-2">
          <CampoFormulario
            id="direccion"
            label="Dirección (opcional)"
            icono={MapPin}
            type="text"
            placeholder="Ciudad, zona o dirección física"
            maxLength={255}
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        {esEdicion && (
          <div className="sm:col-span-2">
          <CampoSelect
            id="estado"
            label="Estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </CampoSelect>
          </div>
        )}
        </div>

        {!esEdicion && <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">Vista previa</p><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"><UserRound size={16} /></span><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{form.nombre_cliente.trim() || "Nombre del cliente"}</p><p className="mt-0.5 truncate text-xs text-slate-500">{form.identificacion.trim() || form.telefono.trim() || form.correo.trim() || "Sin datos de contacto todavía"}</p></div></div></div>}

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
