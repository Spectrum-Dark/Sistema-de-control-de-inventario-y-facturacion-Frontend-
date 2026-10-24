import { UserRound, Hash, Phone, Mail, MapPin } from "lucide-react";
import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

const Vacio = () => <span className="text-xs italic text-slate-400">Sin registrar</span>;

function IdentidadCliente({ cliente }) {
  return <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><UserRound size={18} strokeWidth={1.8} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-900">{cliente.nombre_cliente}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{cliente.identificacion || "Sin identificación"}</span></span></div>;
}

export default function TablaClientes({ clientes, puedeEditar, puedeEliminar, onEditar, onEliminar }) {
  const hayAcciones = puedeEditar || puedeEliminar;
  return <>
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup><col style={{ width: hayAcciones ? "27%" : "32%" }} /><col style={{ width: hayAcciones ? "24%" : "27%" }} /><col style={{ width: hayAcciones ? "23%" : "26%" }} /><col style={{ width: hayAcciones ? "10%" : "10%" }} />{hayAcciones && <col style={{ width: "16%" }} />}</colgroup>
        <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500"><tr><th className="px-5 py-3.5 font-semibold">Cliente</th><th className="px-5 py-3.5 font-semibold">Contacto</th><th className="px-5 py-3.5 font-semibold">Dirección</th><th className="px-5 py-3.5 font-semibold">Estado</th>{hayAcciones && <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>}</tr></thead>
        <tbody className="divide-y divide-slate-100">{clientes.map((cliente) => <tr key={cliente.id_cliente} className="table-row-hover transition-colors"><td className="px-5 py-3.5"><IdentidadCliente cliente={cliente} /></td><td className="px-5 py-3.5 text-slate-600"><p className="whitespace-nowrap">{cliente.telefono || <Vacio />}</p><p className="mt-0.5 truncate text-xs text-slate-500">{cliente.correo || "Sin correo"}</p></td><td className="px-5 py-3.5 text-sm text-slate-600"><p className="line-clamp-2">{cliente.direccion || <Vacio />}</p></td><td className="px-5 py-3.5"><InsigniaEstado estado={cliente.estado} /></td>{hayAcciones && <td className="px-5 py-3.5"><AccionesFila nombre={cliente.nombre_cliente} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(cliente)} onEliminar={() => onEliminar(cliente)} /></td>}</tr>)}</tbody>
      </table>
    </div>
    <div className="space-y-3 xl:hidden">{clientes.map((cliente) => <article key={cliente.id_cliente} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><IdentidadCliente cliente={cliente} /><InsigniaEstado estado={cliente.estado} /></div><div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2"><p className="flex min-w-0 items-center gap-2 text-sm text-slate-600"><Phone size={14} className="shrink-0 text-slate-400" />{cliente.telefono || <Vacio />}</p><p className="flex min-w-0 items-center gap-2 text-sm text-slate-600"><Mail size={14} className="shrink-0 text-slate-400" /><span className="truncate">{cliente.correo || <Vacio />}</span></p><p className="flex min-w-0 items-center gap-2 text-sm text-slate-600"><MapPin size={14} className="shrink-0 text-slate-400" /><span className="line-clamp-2">{cliente.direccion || <Vacio />}</span></p><p className="flex min-w-0 items-center gap-2 text-sm text-slate-600"><Hash size={14} className="shrink-0 text-slate-400" />{cliente.identificacion || <Vacio />}</p></div>{hayAcciones && <div className="mt-3 border-t border-slate-100 pt-1"><AccionesFila variante="tarjeta" nombre={cliente.nombre_cliente} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(cliente)} onEliminar={() => onEliminar(cliente)} /></div>}</article>)}</div>
  </>;
}
