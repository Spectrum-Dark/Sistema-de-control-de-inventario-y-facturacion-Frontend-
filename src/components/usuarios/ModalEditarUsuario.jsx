import { useState } from 'react';
import { User, AtSign, Mail, Loader2 } from 'lucide-react';
import { sileo } from 'sileo';
import Modal from '../compartido/Modal';
import CampoFormulario from '../compartido/CampoFormulario';
import CampoSelect from '../compartido/CampoSelect';
import { obtenerCambios } from '../../utils/compartido/formulario';
import { actualizarUsuario } from '../../services/usuarios/usuariosService';
import {
  puedeCambiarEstado,
  rolesAsignables,
} from '../../utils/usuarios/permisos';
import { ROLES } from '../../utils/sesion/roles';

// Componente modal 'ModalEditarUsuario' para modificar la información de una cuenta existente, controlando dinámicamente los roles asignables y la gestión de estado de acuerdo con los permisos del usuario autenticado.
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
  const [error, setError] = useState('');

  // Determina si el usuario autenticado posee permisos suficientes para modificar el estado de la cuenta.
  const puedeEstado = puedeCambiarEstado(usuario, usuarioActual);

  // Manejador genérico para actualizar el estado del formulario y limpiar avisos de error.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Manejador del envío del formulario para procesar las modificaciones realizadas sobre el usuario en la API.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filtra y extrae únicamente los valores que han cambiado respecto a la información original del usuario.
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
      setError('No hay cambios para guardar.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await actualizarUsuario(usuario.id_usuario, cambios);
      sileo.success({
        title: 'Usuario actualizado',
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
    <Modal
      titulo="Editar usuario"
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        {/* Cabecera informativa con avatar generado a partir de la inicial del usuario */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-semibold text-slate-700 shadow-sm">
            {usuario.nombre_completo.trim().charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-slate-800">
              Cuenta seleccionada
            </span>
            <span className="mt-0.5 block truncate text-xs text-slate-500">
              @{usuario.nombre_usuario} · {ROLES[usuario.id_rol]}
            </span>
          </span>
        </div>

        {/* Campo para editar el nombre completo del usuario */}
        <div className="sm:col-span-2">
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
        </div>

        {/* Campo para modificar el identificador o nombre de usuario */}
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

        {/* Campo para actualizar la dirección de correo electrónico */}
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

        {/* Selector de rol de acceso limitado por la jerarquía devuelta por 'rolesAsignables' */}
        <CampoSelect
          id="id_rol"
          label="Rol de acceso"
          value={form.id_rol}
          onChange={handleChange}
        >
          {rolesAsignables(usuario, usuarioActual).map((id) => (
            <option key={id} value={id}>
              {ROLES[id]}
            </option>
          ))}
        </CampoSelect>

        {/* Selector condicional de estado de la cuenta (visible si cuenta con permisos) */}
        {puedeEstado && (
          <div>
            <CampoSelect
              id="estado"
              label="Estado de la cuenta"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </CampoSelect>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
              Una cuenta inactiva no puede iniciar sesión.
            </p>
          </div>
        )}

        {/* Mensaje de alerta en caso de registrarse errores durante la actualización */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 sm:col-span-2">
            {error}
          </p>
        )}

        {/* Botones de acción del pie del modal */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 sm:col-span-2">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
