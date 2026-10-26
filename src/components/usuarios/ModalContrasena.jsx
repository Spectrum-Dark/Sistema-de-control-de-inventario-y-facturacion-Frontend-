import { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { sileo } from 'sileo';
import Modal from '../compartido/Modal';
import CampoFormulario from '../compartido/CampoFormulario';
import { restablecerContrasena } from '../../services/usuarios/usuariosService';

// Componente modal 'ModalContrasena' para permitir a los administradores restablecer la contraseña de una cuenta de usuario específica, validando la coincidencia de campos e informando sobre el cierre de sesiones activas.
export default function ModalContrasena({ usuario, onCerrar }) {
  const [form, setForm] = useState({
    contrasena: '',
    contrasena_confirmation: '',
  });
  const [verContrasena, setVerContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Manejador genérico para actualizar el estado del formulario y limpiar errores activos.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Manejador del envío del formulario para procesar el restablecimiento de contraseña en la API.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de seguridad: verifica que la nueva contraseña y su confirmación coincidan.
    if (form.contrasena !== form.contrasena_confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setCargando(true);

    try {
      await restablecerContrasena(usuario.id_usuario, form);
      sileo.success({
        title: 'Contraseña actualizada',
        description: `Se restableció la contraseña de ${usuario.nombre_completo}.`,
      });
      onCerrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Botón auxiliar reutilizable para alternar la visibilidad de los campos de contraseña.
  const botonOjo = (
    <button
      type="button"
      onClick={() => setVerContrasena(!verContrasena)}
      className="text-slate-400 hover:text-slate-600"
      aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    >
      {verContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <Modal
      titulo="Restablecer contraseña"
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tarjeta informativa con los datos del usuario seleccionado */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
            <Lock size={17} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-slate-800">
              Restablecer acceso
            </span>
            <span className="mt-0.5 block truncate text-xs text-slate-500">
              {usuario.nombre_completo} · @{usuario.nombre_usuario}
            </span>
          </span>
        </div>

        {/* Nota de seguridad informativa sobre el impacto del restablecimiento en las sesiones activas */}
        <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-slate-400" />
          Al guardar la nueva contraseña, se cerrarán las sesiones abiertas de
          esta cuenta.
        </p>

        {/* Campo para ingresar la nueva contraseña */}
        <CampoFormulario
          id="contrasena"
          label="Nueva contraseña"
          icono={Lock}
          type={verContrasena ? 'text' : 'password'}
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          minLength={8}
          value={form.contrasena}
          onChange={handleChange}
          required
          accionDerecha={botonOjo}
        />

        {/* Campo para confirmar la nueva contraseña */}
        <CampoFormulario
          id="contrasena_confirmation"
          label="Confirmar contraseña"
          icono={Lock}
          type={verContrasena ? 'text' : 'password'}
          placeholder="Repite la contraseña"
          autoComplete="new-password"
          value={form.contrasena_confirmation}
          onChange={handleChange}
          required
        />

        {/* Alerta de error en caso de fallo de validación o comunicación con el servidor */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {error}
          </p>
        )}

        {/* Botones de acción del pie del modal */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
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
            {cargando ? 'Guardando...' : 'Restablecer'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
