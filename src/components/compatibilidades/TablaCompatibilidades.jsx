import { Package, CarFront, Link2 } from "lucide-react";
import AccionesFila from "../compartido/AccionesFila";

function EntidadRelacionada({ icono: Icono, titulo, detalle }) {
  return <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icono size={18} strokeWidth={1.8} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-900">{titulo}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{detalle}</span></span></div>;
}

export default function TablaCompatibilidades({ filas, puedeEditar, puedeEliminar, onEditar, onEliminar }) {
  const hayAcciones = puedeEditar || puedeEliminar;
  const nombreProducto = (fila) => fila.producto?.nombre_producto ?? "Producto no encontrado";
  const codigoProducto = (fila) => fila.producto?.codigo_producto ?? "Sin código";
  const nombreModelo = (fila) => fila.modelo?.nombre_modelo ?? "Modelo no encontrado";
  return <>
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup><col style={{ width: hayAcciones ? "32%" : "38%" }} /><col style={{ width: hayAcciones ? "30%" : "36%" }} /><col style={{ width: hayAcciones ? "22%" : "26%" }} />{hayAcciones && <col style={{ width: "16%" }} />}</colgroup>
        <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500"><tr><th className="px-5 py-3.5 font-semibold">Producto</th><th className="px-5 py-3.5 font-semibold">Modelo compatible</th><th className="px-5 py-3.5 font-semibold">Observaciones</th>{hayAcciones && <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>}</tr></thead>
        <tbody className="divide-y divide-slate-100">{filas.map((fila) => <tr key={fila.id_compatibilidad} className="table-row-hover transition-colors"><td className="px-5 py-3.5"><EntidadRelacionada icono={Package} titulo={nombreProducto(fila)} detalle={codigoProducto(fila)} /></td><td className="px-5 py-3.5"><EntidadRelacionada icono={CarFront} titulo={nombreModelo(fila)} detalle={fila.nombre_marca ?? "Marca sin registro"} /></td><td className="px-5 py-3.5 text-sm text-slate-600">{fila.observaciones ? <p className="line-clamp-2">{fila.observaciones}</p> : <span className="text-xs italic text-slate-400">Sin observaciones</span>}</td>{hayAcciones && <td className="px-5 py-3.5"><AccionesFila nombre={`${nombreProducto(fila)} con ${nombreModelo(fila)}`} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(fila)} onEliminar={() => onEliminar(fila)} /></td>}</tr>)}</tbody>
      </table>
    </div>
    <div className="space-y-3 xl:hidden">{filas.map((fila) => <article key={fila.id_compatibilidad} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400"><Link2 size={13} /> Relación compatible</div><div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><EntidadRelacionada icono={Package} titulo={nombreProducto(fila)} detalle={codigoProducto(fila)} /><Link2 size={16} className="hidden text-slate-400 sm:block" /><EntidadRelacionada icono={CarFront} titulo={nombreModelo(fila)} detalle={fila.nombre_marca ?? "Marca sin registro"} /></div>{fila.observaciones && <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">{fila.observaciones}</p>}{hayAcciones && <div className="mt-3 border-t border-slate-100 pt-1"><AccionesFila variante="tarjeta" nombre={`${nombreProducto(fila)} con ${nombreModelo(fila)}`} puedeEditar={puedeEditar} puedeEliminar={puedeEliminar} onEditar={() => onEditar(fila)} onEliminar={() => onEliminar(fila)} /></div>}</article>)}</div>
  </>;
}
