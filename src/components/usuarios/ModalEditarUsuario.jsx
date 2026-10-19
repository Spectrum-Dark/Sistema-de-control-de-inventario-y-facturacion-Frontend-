import { useState } from "react";
import { User, AtSign, Mail, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import { actualizarUsuario } from "../../services/usuarios/usuariosService";
import {
  puedeCambiarEstado,
  rolesAsignables,
} from "../../utils/usuarios/permisos";
import { ROLES } from "../../utils/sesion/roles";

const claseSelect =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function ModalEditarUsuario({
  usuario,
  usuarioActual,
  onCerrar,
  onGuardado,
}) {
  const [form, setForm] = useState({
    nombre_completo: usuario.nombre_completo,
    nombre_usuario: usuario.nombre_usuario,
    correo: usuario.correo,
    id_rol: String(usuario.id_rol),
    estado: usuario.estado,
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const puedeEstado = puedeCambiarEstado(usuario, usuarioActual);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Solo se envía lo que realmente cambió
    const cambios = {};
    ["nombre_completo", "nombre_usuario", "correo"].forEach((campo) => {
      const valor = form[campo].trim();
      if (valor !== usuario[campo]) cambios[campo] = valor;
    });
    if (Number(form.id_rol) !== usuario.id_rol) {
      cambios.id_rol = Number(form.id_rol);
    }
    if (puedeEstado && form.estado !== usuario.estado) {
      cambios.estado = form.estado;
    }

    if (Object.keys(cambios).length === 0) {
      setError("No hay cambios para guardar.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await actualizarUsuario(usuario.id_usuario, cambios);
      sileo.success({
        title: "Usuario actualizado",
        description: respuesta.message,
      });
      onGuardado(respuesta.datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal titulo="Editar usuario" onCerrar={onCerrar} bloqueado={cargando}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoFormulario
          id="nombre_completo"
          label="Nombre completo"
          icono={User}
          type="text"
          maxLength={200}
          value={form.nombre_completo}
          onChange={handleChange}
          required
        />

        <CampoFormulario
          id="nombre_usuario"
          label="Nombre de usuario"
          icono={AtSign}
          type="text"
          maxLength={80}
          value={form.nombre_usuario}
          onChange={handleChange}
          required
        />

        <CampoFormulario
          id="correo"
          label="Correo electrónico"
          icono={Mail}
          type="email"
          maxLength={150}
          value={form.correo}
          onChange={handleChange}
          required
        />

        <div>
          <label
            htmlFor="id_rol"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Rol
          </label>
          <select
            id="id_rol"
            name="id_rol"
            value={form.id_rol}
            onChange={handleChange}
            className={claseSelect}
          >
            {rolesAsignables(usuario, usuarioActual).map((id) => (
              <option key={id} value={id}>
                {ROLES[id]}
              </option>
            ))}
          </select>
        </div>

        {puedeEstado && (
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
              className={claseSelect}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Un usuario inactivo no puede iniciar sesión.
            </p>
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
            {cargando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </Modal>
  );
}