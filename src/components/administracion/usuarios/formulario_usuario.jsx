import {
  User,
  AtSign,
  Mail,
  Shield,
  ToggleLeft,
  Save,
  XCircle,
  Loader2,
} from "lucide-react";

/**
 * Componente de formulario para la edición de datos generales, rol y estado de un usuario.
 * Incluye validaciones visuales de errores en tiempo real y soporte para iconos de Lucide.
 */
function FormularioUsuario({
  usuario,
  datosFormulario,
  erroresFormulario,
  cambiarCampoFormulario,
  guardarUsuario,
  cancelarEdicion,
  guardando = false,
}) {
  // Si no hay un usuario seleccionado, no se renderiza nada
  if (!usuario) return null;

  return (
    <section
      className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
      aria-labelledby="titulo-formulario-usuario"
    >
      {/* Encabezado del formulario */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            id="titulo-formulario-usuario"
            className="text-lg font-semibold text-slate-900"
          >
            Editar usuario
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Modifica los datos de la cuenta seleccionada.
          </p>
        </div>
      </div>

      <form onSubmit={guardarUsuario} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* 1. Nombre completo */}
          <div>
            <label
              htmlFor="nombre_completo"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <User size={16} className="text-slate-400" />
              Nombre completo
            </label>
            <input
              id="nombre_completo"
              name="nombre_completo"
              value={datosFormulario.nombre_completo}
              onChange={(evento) =>
                cambiarCampoFormulario("nombre_completo", evento.target.value)
              }
              aria-invalid={Boolean(erroresFormulario.nombre_completo)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            {erroresFormulario.nombre_completo && (
              <p className="mt-1 text-xs text-red-600">
                {erroresFormulario.nombre_completo}
              </p>
            )}
          </div>

          {/* 2. Nombre de usuario */}
          <div>
            <label
              htmlFor="nombre_usuario"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <AtSign size={16} className="text-slate-400" />
              Nombre de usuario
            </label>
            <input
              id="nombre_usuario"
              name="nombre_usuario"
              value={datosFormulario.nombre_usuario}
              onChange={(evento) =>
                cambiarCampoFormulario("nombre_usuario", evento.target.value)
              }
              aria-invalid={Boolean(erroresFormulario.nombre_usuario)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            {erroresFormulario.nombre_usuario && (
              <p className="mt-1 text-xs text-red-600">
                {erroresFormulario.nombre_usuario}
              </p>
            )}
          </div>

          {/* 3. Correo electrónico */}
          <div>
            <label
              htmlFor="correo_usuario"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Mail size={16} className="text-slate-400" />
              Correo electrónico
            </label>
            <input
              id="correo_usuario"
              name="correo"
              type="email"
              value={datosFormulario.correo}
              onChange={(evento) =>
                cambiarCampoFormulario("correo", evento.target.value)
              }
              aria-invalid={Boolean(erroresFormulario.correo)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            {erroresFormulario.correo && (
              <p className="mt-1 text-xs text-red-600">
                {erroresFormulario.correo}
              </p>
            )}
          </div>

          {/* 4. Rol del usuario */}
          <div>
            <label
              htmlFor="rol_usuario"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Shield size={16} className="text-slate-400" />
              Rol
            </label>
            <select
              id="rol_usuario"
              name="id_rol"
              value={datosFormulario.id_rol}
              onChange={(evento) =>
                cambiarCampoFormulario("id_rol", evento.target.value)
              }
              aria-invalid={Boolean(erroresFormulario.id_rol)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="">Seleccionar rol</option>
              <option value="1">Administrador</option>
              <option value="2">Operador</option>
              <option value="3">Consultor</option>
            </select>
            {erroresFormulario.id_rol && (
              <p className="mt-1 text-xs text-red-600">
                {erroresFormulario.id_rol}
              </p>
            )}
          </div>

          {/* 5. Estado de la cuenta */}
          <div>
            <label
              htmlFor="estado_usuario"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <ToggleLeft size={16} className="text-slate-400" />
              Estado de la cuenta
            </label>
            <select
              id="estado_usuario"
              name="estado"
              value={datosFormulario.estado}
              onChange={(evento) =>
                cambiarCampoFormulario("estado", evento.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <p className="mt-1.5 text-xs text-slate-500">
              Los usuarios inactivos no deberían poder iniciar sesión.
            </p>
          </div>
        </div>

        {/* Botones de acción del formulario */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={cancelarEdicion}
            disabled={guardando}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <XCircle size={16} />
            Cancelar
          </button>

          <button
            type="submit"
            disabled={guardando}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {guardando ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={16} />
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioUsuario;
