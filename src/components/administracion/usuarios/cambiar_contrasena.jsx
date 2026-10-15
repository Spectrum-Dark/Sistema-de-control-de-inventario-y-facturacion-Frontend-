import { useState } from "react";
import { KeyRound, Eye, EyeOff, X, Loader2, ShieldAlert } from "lucide-react";

function CambiarContrasena({
  usuario,
  nuevaContrasena,
  setNuevaContrasena,
  cancelar,
  guardar,
  guardando = false,
}) {
  const [confirmacionContrasena, setConfirmacionContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [errorCoincidencia, setErrorCoincidencia] = useState("");

  // Si no hay un usuario seleccionado, el modal permanece oculto y limpiamos los estados locales aquí mismo
  if (!usuario) {
    if (confirmacionContrasena !== "") {
      setConfirmacionContrasena("");
      setErrorCoincidencia("");
      setMostrarContrasena(false);
    }
    return null;
  }

  const manejarCambioConfirmacion = (e) => {
    const valor = e.target.value;
    setConfirmacionContrasena(valor);
    if (nuevaContrasena && valor && nuevaContrasena !== valor) {
      setErrorCoincidencia("Las contraseñas no coinciden.");
    } else {
      setErrorCoincidencia("");
    }
  };

  const manejarCambioNueva = (e) => {
    const valor = e.target.value;
    setNuevaContrasena(valor);
    if (confirmacionContrasena && valor && confirmacionContrasena !== valor) {
      setErrorCoincidencia("Las contraseñas no coinciden.");
    } else {
      setErrorCoincidencia("");
    }
  };

  const handleCancelar = () => {
    setConfirmacionContrasena("");
    setErrorCoincidencia("");
    setMostrarContrasena(false);
    cancelar();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaContrasena !== confirmacionContrasena) {
      setErrorCoincidencia("Las contraseñas deben coincidir obligatoriamente.");
      return;
    }
    guardar(e, confirmacionContrasena);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-cambiar-contrasena"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Encabezado del Modal */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <KeyRound size={22} aria-hidden="true" />
            </div>

            <div>
              <h2
                id="titulo-cambiar-contrasena"
                className="text-lg font-semibold text-slate-900"
              >
                Restablecer contraseña
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Define credenciales seguras para esta cuenta.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancelar}
            disabled={guardando}
            aria-label="Cerrar formulario"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="usuario_contrasena"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Nombre de usuario
            </label>
            <input
              id="usuario_contrasena"
              type="text"
              value={usuario.nombre_usuario || ""}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 outline-none"
            />
          </div>

          {/* Nueva contraseña */}
          <div>
            <label
              htmlFor="nueva_contrasena"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Nueva contraseña <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <input
                id="nueva_contrasena"
                name="contrasena"
                type={mostrarContrasena ? "text" : "password"}
                value={nuevaContrasena}
                onChange={manejarCambioNueva}
                autoComplete="new-password"
                placeholder="Introduce la nueva contraseña"
                required
                minLength={8}
                disabled={guardando}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() => setMostrarContrasena((visible) => !visible)}
                aria-label={
                  mostrarContrasena
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-slate-700"
              >
                {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label
              htmlFor="confirmar_contrasena"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Confirmar contraseña <span className="text-rose-500">*</span>
            </label>

            <input
              id="confirmar_contrasena"
              name="contrasena_confirmation"
              type={mostrarContrasena ? "text" : "password"}
              value={confirmacionContrasena}
              onChange={manejarCambioConfirmacion}
              autoComplete="new-password"
              placeholder="Repite la nueva contraseña"
              required
              minLength={8}
              disabled={guardando}
              className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 disabled:opacity-50 ${
                errorCoincidencia
                  ? "border-rose-300 focus:border-rose-600 focus:ring-rose-600/10"
                  : "border-slate-200 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />

            {errorCoincidencia && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                <ShieldAlert size={14} />
                {errorCoincidencia}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Debe contener al menos 8 caracteres. El usuario deberá iniciar
            sesión nuevamente tras el cambio.
          </p>

          {/* Botones de acción del modal */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancelar}
              disabled={guardando}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                guardando || !nuevaContrasena.trim() || !!errorCoincidencia
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {guardando ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <KeyRound size={16} />
                  Restablecer contraseña
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CambiarContrasena;
