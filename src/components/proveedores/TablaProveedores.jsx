import { Truck, Hash, Phone, Mail, MapPin } from 'lucide-react';
import InsigniaEstado from '../compartido/InsigniaEstado';
import AccionesFila from '../compartido/AccionesFila';

// Componente auxiliar 'Vacio' para mostrar un texto estandarizado en gris cursiva cuando un campo opcional no posea información registrada.
const Vacio = () => (
  <span className="text-xs italic text-slate-400">Sin registrar</span>
);

// Componente auxiliar 'IdentidadProveedor' para renderizar el icono representativo, el nombre de la empresa proveedora y su identificación fiscal secundaria.
function IdentidadProveedor({ proveedor }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Truck size={18} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900">
          {proveedor.nombre_proveedor}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">
          {proveedor.identificacion || 'Sin identificación'}
        </span>
      </span>
    </div>
  );
}

// Componente principal 'TablaProveedores' para listar el directorio de proveedores, implementando un diseño dual responsivo (tabla clásica para pantallas extra grandes y tarjetas adaptables para dispositivos móviles y tablets).
export default function TablaProveedores({
  proveedores,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Vista de tabla tradicional para pantallas grandes (XL en adelante) */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-245 text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Proveedor</th>
              <th className="px-5 py-3.5 font-semibold">Contacto</th>
              <th className="px-5 py-3.5 font-semibold">Dirección</th>
              <th className="px-5 py-3.5 font-semibold columna-estado">Estado</th>
              {hayAcciones && (
                <th className="px-5 py-3.5 text-right font-semibold columna-acciones">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {proveedores.map((proveedor) => (
              <tr
                key={proveedor.id_proveedor}
                className="table-row-hover transition-colors"
              >
                <td className="px-5 py-3.5">
                  <IdentidadProveedor proveedor={proveedor} />
                </td>
                <td className="px-5 py-3.5 text-slate-600">
                  <p>{proveedor.telefono || <Vacio />}</p>
                  <p className="mt-0.5 max-w-57.5 truncate text-xs text-slate-500">
                    {proveedor.correo || 'Sin correo'}
                  </p>
                </td>
                <td className="max-w-xs px-5 py-3.5 text-sm text-slate-600">
                  {proveedor.direccion || <Vacio />}
                </td>
                <td className="px-5 py-3.5 columna-estado">
                  <InsigniaEstado estado={proveedor.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-5 py-3.5 columna-acciones">
                    <AccionesFila
                      nombre={proveedor.nombre_proveedor}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(proveedor)}
                      onEliminar={() => onEliminar(proveedor)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas adaptables para dispositivos móviles y pantallas medianas */}
      <div className="space-y-3 xl:hidden">
        {proveedores.map((proveedor) => (
          <article
            key={proveedor.id_proveedor}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <IdentidadProveedor proveedor={proveedor} />
              <InsigniaEstado estado={proveedor.estado} />
            </div>

            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Phone size={14} className="shrink-0 text-slate-400" />
                {proveedor.telefono || <Vacio />}
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Mail size={14} className="shrink-0 text-slate-400" />
                <span className="truncate">
                  {proveedor.correo || <Vacio />}
                </span>
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <MapPin size={14} className="shrink-0 text-slate-400" />
                <span className="line-clamp-2">
                  {proveedor.direccion || <Vacio />}
                </span>
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Hash size={14} className="shrink-0 text-slate-400" />
                {proveedor.identificacion || <Vacio />}
              </p>
            </div>

            {hayAcciones && (
              <div className="mt-3 border-t border-slate-100 pt-1">
                <AccionesFila
                  variante="tarjeta"
                  nombre={proveedor.nombre_proveedor}
                  puedeEditar={puedeEditar}
                  puedeEliminar={puedeEliminar}
                  onEditar={() => onEditar(proveedor)}
                  onEliminar={() => onEliminar(proveedor)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
