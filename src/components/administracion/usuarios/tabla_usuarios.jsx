import { Pencil, KeyRound } from "lucide-react";

function obtenerNombreRol(idRol) {
  const roles = {
    1: "Administrador",
    2: "Operador",
    3: "Consultor",
  };

  return roles[idRol] || "Sin rol";
}

function TablaUsuarios({
  usuarios = [],
  cargando,
  error,
  onEditar,
  onCambiarEstado,
  onRestablecerContrasena,
}) {
  // Mostrar el estado de carga mientras se obtienen los usuarios.
  if (cargando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Cargando usuarios...
      </div>
    );
  }

  // Mostrar el mensaje de error si falla la consulta.
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  // Informar cuando no hay usuarios para mostrar.
  if (usuarios.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h3 className="font-semibold text-slate-800">
          No hay usuarios para mostrar
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Prueba cambiar los filtros o verifica los usuarios registrados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Usuario</th>
              <th className="px-5 py-4 font-semibold">Correo electrónico</th>
              <th className="px-5 py-4 font-semibold">Rol</th>
              <th className="px-5 py-4 font-semibold">Estado</th>
              <th className="px-5 py-4 text-right font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {usuarios.map((usuario) => {
              const activo = usuario.estado === "Activo";

              return (
                <tr
                  key={usuario.id_usuario}
                  className="transition hover:bg-slate-50/70"
                >
                  {/* Información del usuario */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {usuario.nombre_completo}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {usuario.nombre_usuario}
                    </p>
                  </td>

                  {/* Correo electrónico */}
                  <td className="px-5 py-4 text-slate-600">{usuario.correo}</td>

                  {/* Rol */}
                  <td className="px-5 py-4 text-slate-600">
                    {obtenerNombreRol(usuario.id_rol)}
                  </td>

                  {/* Estado */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        activo
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          activo ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />

                      {usuario.estado}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {/* Editar usuario */}
                      <button
                        type="button"
                        onClick={() => onEditar?.(usuario)}
                        title="Editar usuario"
                        aria-label={`Editar a ${usuario.nombre_completo}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={17} aria-hidden="true" />
                      </button>

                      {/* Restablecer contraseña */}
                      <button
                        type="button"
                        onClick={() => onRestablecerContrasena?.(usuario)}
                        title="Restablecer contraseña"
                        aria-label={`Restablecer contraseña de ${usuario.nombre_completo}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <KeyRound size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaUsuarios;
