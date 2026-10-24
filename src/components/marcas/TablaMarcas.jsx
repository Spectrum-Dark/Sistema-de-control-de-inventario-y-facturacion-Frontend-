import { CarFront } from "lucide-react";
import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

function IdentidadMarca({ marca }) {
  return <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><CarFront size={18} strokeWidth={1.8} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-900">{marca.nombre_marca}</span><span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-slate-400">Marca de vehículo</span></span></div>;
}

export default function TablaMarcas({ marcas, puedeEditar, puedeEliminar, onEditar, onEliminar }) {
  const hayAcciones = puedeEditar || puedeEliminar;
  return <>
    <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500"><tr><th className="px-5 py-3.5 font-semibold">Marca</th><th className="px-5 py-3.5 font-semibold">Descripción</th><th className="px-5 py-3.5 font-semibold">Estado</th>{hayAcciones && <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>}</tr></thead>
        <tbody className="divide-y divide-slate-100">{marcas.map((marca) => <tr key={marca.id_marca} className="table-row-hover transition-colors"><td className="px-5 py-3.5"><IdentidadMarca marca={marca} /></td><td className="max-w-md px-5 py-3.5 text-sm text-slate-600">{marca.descripcion ? <p className="line-clamp-2">{marca.descripcion}</p> : <span className="text-xs italic text-slate-400">Sin descripción</span>}</td><td className="px-5 py-3.5"><InsigniaEstado estado={marca.estado} /></td>{hayAcciones && <td className="px-5 py-3.5"><AccionesFila nombre={marca.nombre_marca} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(marca)} onEliminar={() => onEliminar(marca)} /></td>}</tr>)}</tbody>
      </table>
    </div>
    <div className="space-y-3 xl:hidden">{marcas.map((marca) => <article key={marca.id_marca} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><IdentidadMarca marca={marca} /><InsigniaEstado estado={marca.estado} /></div><p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">{marca.descripcion || <span className="text-xs italic text-slate-400">Sin descripción registrada.</span>}</p>{hayAcciones && <div className="mt-3 border-t border-slate-100 pt-1"><AccionesFila variante="tarjeta" nombre={marca.nombre_marca} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(marca)} onEliminar={() => onEliminar(marca)} /></div>}</article>)}</div>
  </>;
}
