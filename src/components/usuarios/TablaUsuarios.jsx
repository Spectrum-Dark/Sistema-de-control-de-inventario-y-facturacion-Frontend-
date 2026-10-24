import { KeyRound } from "lucide-react";
import { ROLES } from "../../utils/sesion/roles";
import { formatearFecha } from "../../utils/usuarios/formato";
import { esMismaCuenta, puedeModificar } from "../../utils/usuarios/permisos";
import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

function Etiqueta({ children, principal = false }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${principal ? "border-slate-300 bg-slate-100 text-slate-700" : "border-slate-200 bg-white text-slate-500"}`}>
      {children}
    </span>
  );
}

function NombreUsuario({ usuario, usuarioActual }) {
  const inicial = usuario.nombre_completo?.trim().charAt(0).toUpperCase() ?? "?";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
        {inicial}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-slate-900">{usuario.nombre_completo}</span>
          {usuario.es_administrador_principal && <Etiqueta principal>Principal</Etiqueta>}
          {esMismaCuenta(usuario, usuarioActual) && <Etiqueta>Tú</Etiqueta>}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">@{usuario.nombre_usuario}</span>
      </span>
    </div>
  );
}

function Rol({ id }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      {ROLES[id] ?? "Sin rol"}
    </span>
  );
}

export default function TablaUsuarios({ usuarios, usuarioActual, onEditar, onCambiarContrasena }) {
  const extrasDe = (u) => [{
    titulo: "Restablecer contraseña",
    textoCorto: "Contraseña",
    icono: KeyRound,
    onClick: () => onCambiarContrasena(u),
  }];

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-[790px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Usuario</th>
              <th className="px-5 py-3.5 font-semibold">Correo electrónico</th>
              <th className="px-5 py-3.5 font-semibold">Rol</th>
              <th className="px-5 py-3.5 font-semibold">Estado</th>
              <th className="hidden px-5 py-3.5 font-semibold lg:table-cell">Fecha de registro</th>
              <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map((u) => (
              <tr key={u.id_usuario} className="table-row-hover transition-colors">
                <td className="px-5 py-3.5"><NombreUsuario usuario={u} usuarioActual={usuarioActual} /></td>
                <td className="max-w-56 truncate px-5 py-3.5 text-sm text-slate-600" title={u.correo}>{u.correo}</td>
                <td className="px-5 py-3.5"><Rol id={u.id_rol} /></td>
                <td className="px-5 py-3.5"><InsigniaEstado estado={u.estado} /></td>
                <td className="hidden whitespace-nowrap px-5 py-3.5 text-xs text-slate-500 lg:table-cell">{formatearFecha(u.fecha_creacion)}</td>
                <td className="px-5 py-3.5">
                  <AccionesFila
                    nombre={u.nombre_completo}
                    deshabilitado={!puedeModificar(u, usuarioActual)}
                    motivoDeshabilitado="Por seguridad, esta cuenta no se puede modificar ni restablecer desde las operaciones disponibles."
                    puedeEditar
                    onEditar={() => onEditar(u)}
                    extras={extrasDe(u)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 xl:hidden">
        {usuarios.map((u) => (
          <article key={u.id_usuario} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <NombreUsuario usuario={u} usuarioActual={usuarioActual} />
              <InsigniaEstado estado={u.estado} />
            </div>
            <p className="mt-3 truncate border-t border-slate-100 pt-3 text-sm text-slate-600">{u.correo}</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <Rol id={u.id_rol} />
              <span className="text-[11px] text-slate-500">Registrado {formatearFecha(u.fecha_creacion)}</span>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-1">
              <AccionesFila
                variante="tarjeta"
                nombre={u.nombre_completo}
                deshabilitado={!puedeModificar(u, usuarioActual)}
                motivoDeshabilitado="Por seguridad, esta cuenta no se puede modificar ni restablecer desde las operaciones disponibles."
                puedeEditar
                onEditar={() => onEditar(u)}
                extras={extrasDe(u)}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
