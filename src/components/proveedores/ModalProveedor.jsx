import { useState } from "react";
import { Truck, Hash, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import {
  crearProveedor,
  actualizarProveedor,
} from "../../services/proveedores/proveedoresService";

const claseCampo =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

// Campos que el backend acepta vacíos (se envían como null)
const CAMPOS_OPCIONALES = ["identificacion", "telefono", "correo", "direccion"];

export default function ModalProveedor({ proveedor, onCerrar, onGuardado }) {
  const esEdicion = Boolean(proveedor);

  const [form, setForm] = useState({
    nombre_proveedor: proveedor?.nombre_proveedor ?? "",
    identificacion: proveedor?.identificacion ?? "",
    telefono: proveedor?.telefono ?? "",
    correo: proveedor?.correo ?? "",
    direccion: proveedor?.direccion ?? "",
    estado: proveedor?.estado ?? "Activo",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = form.nombre_proveedor.trim();
    const cambios = {};

    if (esEdicion) {
      // Al editar, solo se envía lo que cambió
      if (nombre !== proveedor.nombre_proveedor) {
        cambios.nombre_proveedor = nombre;
      }
      CAMPOS_OPCIONALES.forEach((campo) => {
        const valor = form[campo].trim();
        if (valor !== (proveedor[campo] ?? "")) {
          cambios[campo] = valor || null;
        }
      });
      if (form.estado !== proveedor.estado) {
        cambios.estado = form.estado;
      }

      if (Object.keys(cambios).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    const datosNuevos = { nombre_proveedor: nombre };
    CAMPOS_OPCIONALES.forEach((campo) => {
      datosNuevos[campo] = form[campo].trim() || null;
    });

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarProveedor(proveedor.id_proveedor, cambios)
        : await crearProveedor(datosNuevos);

      sileo.success({
        title: esEdicion ? "Proveedor actualizado" : "Proveedor registrado",
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
      titulo={esEdicion ? "Editar proveedor" : "Nuevo proveedor"}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoFormulario
          id="nombre_proveedor"
          label="Nombre del proveedor"
          icono={Truck}
          type="text"
          placeholder="Ej: Repuestos del Norte"
          maxLength={150}
          value={form.nombre_proveedor}
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
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
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
