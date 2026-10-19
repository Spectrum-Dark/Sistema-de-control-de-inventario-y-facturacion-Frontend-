import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import { restablecerContrasena } from "../../services/usuarios/usuariosService";

export default function ModalContrasena({ usuario, onCerrar }) {
  const [form, setForm] = useState({
    contrasena: "",
    contrasena_confirmation: "",
  });
  const [verContrasena, setVerContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.contrasena !== form.contrasena_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      await restablecerContrasena(usuario.id_usuario, form);
      sileo.success({
        title: "Contraseña actualizada",
        description: `Se restableció la contraseña de ${usuario.nombre_completo}.`,
      });
      onCerrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const botonOjo = (
    <button
      type="button"
      onClick={() => setVerContrasena(!verContrasena)}
      className="text-slate-400 hover:text-slate-600"
      aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
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
        <p className="text-sm text-slate-600">
          Nueva contraseña para{" "}
          <span className="font-medium text-slate-900">
            {usuario.nombre_completo}
          </span>
          . Sus sesiones abiertas se cerrarán.
        </p>

        <CampoFormulario
          id="contrasena"
          label="Nueva contraseña"
          icono={Lock}
          type={verContrasena ? "text" : "password"}
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          minLength={8}
          value={form.contrasena}
          onChange={handleChange}
          required
          accionDerecha={botonOjo}
        />

        <CampoFormulario
          id="contrasena_confirmation"
          label="Confirmar contraseña"
          icono={Lock}
          type={verContrasena ? "text" : "password"}
          placeholder="Repite la contraseña"
          autoComplete="new-password"
          value={form.contrasena_confirmation}
          onChange={handleChange}
          required
        />

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
            {cargando ? "Guardando..." : "Restablecer"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
