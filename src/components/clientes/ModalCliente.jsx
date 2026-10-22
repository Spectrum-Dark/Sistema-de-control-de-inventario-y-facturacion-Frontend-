import { useState } from "react";
import { UserRound, Hash, Phone, Mail, MapPin, Loader2 } from "lucide-react";
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
  const esEdicion = Boolean(cliente);

  const [form, setForm] = useState({
    nombre_cliente: cliente?.nombre_cliente ?? "",
    identificacion: cliente?.identificacion ?? "",
    telefono: cliente?.telefono ?? "",
    correo: cliente?.correo ?? "",
    direccion: cliente?.direccion ?? "",
    estado: cliente?.estado ?? "Activo",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoFormulario
          id="nombre_cliente"
          label="Nombre del cliente"
          icono={UserRound}
          type="text"
          placeholder="Ej: Juan Pérez"
          maxLength={150}
          value={form.nombre_cliente}
          onChange={handleChange}
          required
        />

        <CampoFormulario
          id="identificacion"
          label="Identificación (opcional)"
          icono={Hash}
          type="text"
          placeholder="RUC, cédula u otro"
          maxLength={50}
          value={form.identificacion}
          onChange={handleChange}
        />

        <CampoFormulario
          id="telefono"
          label="Teléfono (opcional)"
          icono={Phone}
          type="tel"
          maxLength={30}
          value={form.telefono}
          onChange={handleChange}
        />

        <CampoFormulario
          id="correo"
          label="Correo electrónico (opcional)"
          icono={Mail}
          type="email"
          maxLength={150}
          value={form.correo}
          onChange={handleChange}
        />

        <CampoFormulario
          id="direccion"
          label="Dirección (opcional)"
          icono={MapPin}
          type="text"
          maxLength={255}
          value={form.direccion}
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