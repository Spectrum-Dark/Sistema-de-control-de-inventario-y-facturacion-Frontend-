import InsigniaEstado from '../compartido/InsigniaEstado';
import AccionesFila from '../compartido/AccionesFila';
import { formatearPrecio, tieneStockBajo } from '../../utils/productos/formato';

// Componente auxiliar 'Existencia' para renderizar el stock actual del producto, incorporando alertas visuales de stock bajo y los límites mínimo y máximo configurados.
function Existencia({ producto }) {
  const bajo = tieneStockBajo(producto);

  return (
    <>
      <p className={`font-medium ${bajo ? 'text-red-600' : 'text-slate-900'}`}>
        {producto.existencia}
        {bajo && <span className="ml-2 text-xs font-normal">Stock bajo</span>}
      </p>
      <p className="text-xs text-slate-500">
        Mín. {producto.existencia_minima ?? 0} · Máx.{' '}
        {producto.existencia_maxima ?? '—'}
      </p>
    </>
  );
}

// Componente principal 'TablaProductos' para la visualización del catálogo de repuestos e inventario, implementando un diseño responsivo dual (tabla clásica para pantallas medianas/grandes y tarjetas adaptadas para dispositivos móviles).
export default function TablaProductos({
  productos,
  nombresCategorias,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Vista de tabla tradicional optimizada para pantallas medianas y grandes (md en adelante) */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col style={{ width: hayAcciones ? '30%' : '36%' }} />
            <col style={{ width: hayAcciones ? '14%' : '16%' }} />
            <col style={{ width: hayAcciones ? '14%' : '16%' }} />
            <col style={{ width: hayAcciones ? '20%' : '21%' }} />
            <col style={{ width: hayAcciones ? '9%' : '11%' }} />
            {hayAcciones && <col style={{ width: '13%' }} />}
          </colgroup>
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 text-right font-medium">P. compra</th>
              <th className="px-4 py-3 text-right font-medium">P. venta</th>
              <th className="px-4 py-3 font-medium">Existencia</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              {hayAcciones && (
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productos.map((p) => (
              <tr key={p.id_producto} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="truncate font-medium text-slate-900">
                    {p.nombre_producto}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {p.codigo_producto} ·{' '}
                    {nombresCategorias[p.id_categoria] ?? '—'}
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-slate-600">
                  {formatearPrecio(p.precio_compra)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-slate-600">
                  {formatearPrecio(p.precio_venta)}
                </td>
                <td className="px-4 py-3">
                  <Existencia producto={p} />
                </td>
                <td className="px-4 py-3">
                  <InsigniaEstado estado={p.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-4 py-3">
                    <AccionesFila
                      nombre={p.nombre_producto}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(p)}
                      onEliminar={() => onEliminar(p)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas adaptables para dispositivos móviles */}
      <div className="space-y-3 md:hidden">
        {productos.map((p) => (
          <div
            key={p.id_producto}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">
                  {p.nombre_producto}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {p.codigo_producto} ·{' '}
                  {nombresCategorias[p.id_categoria] ?? '—'}
                </p>
              </div>
              <InsigniaEstado estado={p.estado} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Compra</p>
                <p className="text-slate-700">
                  {formatearPrecio(p.precio_compra)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Venta</p>
                <p className="text-slate-700">
                  {formatearPrecio(p.precio_venta)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Existencia</p>
                <p
                  className={
                    tieneStockBajo(p)
                      ? 'font-medium text-red-600'
                      : 'text-slate-700'
                  }
                >
                  {p.existencia}
                </p>
              </div>
            </div>

            {hayAcciones && (
              <AccionesFila
                variante="tarjeta"
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
                onEditar={() => onEditar(p)}
                onEliminar={() => onEliminar(p)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
