import { useState } from "react";
import { User, AtSign, Mail, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import { obtenerCambios } from "../../utils/compartido/formulario";
import { actualizarUsuario } from "../../services/usuarios/usuariosService";
import {
  puedeCambiarEstado,
  rolesAsignables,
} from "../../utils/usuarios/permisos";
import { ROLES } from "../../utils/sesion/roles";

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

  // Solo el Administrador principal puede cambiar el estado
  const puedeEstado = puedeCambiarEstado(usuario, usuarioActual);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Solo se envía lo que realmente cambió
    const cambios = obtenerCambios(
      {
        nombre_completo: form.nombre_completo.trim(),
        nombre_usuario: form.nombre_usuario.trim(),
        correo: form.correo.trim(),
        id_rol: Number(form.id_rol),
      },
      {
        nombre_completo: usuario.nombre_completo,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        id_rol: Number(usuario.id_rol),
      }
    );
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

        <CampoSelect
          id="id_rol"
          label="Rol"
          value={form.id_rol}
          onChange={handleChange}
        >
          {rolesAsignables(usuario, usuarioActual).map((id) => (
            <option key={id} value={id}>
              {ROLES[id]}
            </option>
          ))}
        </CampoSelect>

        {puedeEstado && (
          <div>
            <CampoSelect
              id="estado"
              label="Estado"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </CampoSelect>
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