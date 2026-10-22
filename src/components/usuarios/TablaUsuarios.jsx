import { KeyRound } from "lucide-react";
import { ROLES } from "../../utils/sesion/roles";
import { formatearFecha } from "../../utils/usuarios/formato";
import { esMismaCuenta, puedeModificar } from "../../utils/usuarios/permisos";
import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

function Etiqueta({ children }) {
  return (
    <span className="ml-2 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-700">
      {children}
    </span>
  );
}

function NombreUsuario({ usuario, usuarioActual }) {
  return (
    <>
      {usuario.nombre_completo}
      {usuario.es_administrador_principal && <Etiqueta>Principal</Etiqueta>}
      {esMismaCuenta(usuario, usuarioActual) && <Etiqueta>Tú</Etiqueta>}
    </>
  );
}

export default function TablaUsuarios({
  usuarios,
  usuarioActual,
  onEditar,
  onCambiarContrasena,
}) {
  // Acción adicional de cada fila, además de editar
  const extrasDe = (u) => [
    {
      titulo: "Restablecer contraseña",
      textoCorto: "Contraseña",
      icono: KeyRound,
      onClick: () => onCambiarContrasena(u),
    },
  ];

  return (
    <>
      {/* Tablet y escritorio */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-medium">Correo</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Creado
              </th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map((u) => (
              <tr key={u.id_usuario} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    <NombreUsuario usuario={u} usuarioActual={usuarioActual} />
                  </p>
                  <p className="text-xs text-slate-500">@{u.nombre_usuario}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{u.correo}</td>
                <td className="px-4 py-3 text-slate-600">{ROLES[u.id_rol]}</td>
                <td className="px-4 py-3">
                  <InsigniaEstado estado={u.estado} />
                </td>
                <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                  {formatearFecha(u.fecha_creacion)}
                </td>
                <td className="px-4 py-3">
                  {puedeModificar(u, usuarioActual) && (
                    <AccionesFila
                      nombre={u.nombre_completo}
                      puedeEditar
                      onEditar={() => onEditar(u)}
                      extras={extrasDe(u)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {usuarios.map((u) => (
          <div
            key={u.id_usuario}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  <NombreUsuario usuario={u} usuarioActual={usuarioActual} />
                </p>
                <p className="text-xs text-slate-500">@{u.nombre_usuario}</p>
              </div>
              <InsigniaEstado estado={u.estado} />
            </div>

            <p className="mt-3 truncate text-sm text-slate-600">{u.correo}</p>
            <p className="mt-1 text-xs text-slate-500">{ROLES[u.id_rol]}</p>

            {puedeModificar(u, usuarioActual) && (
              <AccionesFila
                variante="tarjeta"
                puedeEditar
                onEditar={() => onEditar(u)}
                extras={extrasDe(u)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}