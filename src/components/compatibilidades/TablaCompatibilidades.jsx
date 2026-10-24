import { Package, CarFront, Link2 } from 'lucide-react';
import AccionesFila from '../compartido/AccionesFila';

// Componente auxiliar interno para renderizar de manera uniforme los datos de una entidad relacionada (icono, título principal y subtítulo/detalle).
function EntidadRelacionada({ icono: Icono, titulo, detalle }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icono size={18} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900">
          {titulo}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">
          {detalle}
        </span>
      </span>
    </div>
  );
}

// Componente para mostrar la tabla de compatibilidades entre productos y modelos de vehículos, con soporte para vistas de tabla (escritorio) y tarjetas (móviles).
export default function TablaCompatibilidades({
  filas,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  // Bandera lógica que determina si se debe habilitar y renderizar la columna/sección de acciones.
  const hayAcciones = puedeEditar || puedeEliminar;

  // Funciones auxiliares para extraer de manera segura los datos anidados de cada fila.
  const nombreProducto = (fila) =>
    fila.producto?.nombre_producto ?? 'Producto no encontrado';
  const codigoProducto = (fila) =>
    fila.producto?.codigo_producto ?? 'Sin código';
  const nombreModelo = (fila) =>
    fila.modelo?.nombre_modelo ?? 'Modelo no encontrado';

  return (
    <>
      {/* Vista de tabla tradicional, optimizada para pantallas grandes (xl en adelante) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full table-fixed text-left text-sm">
          {/* Definición de los anchos de columna de manera proporcional según la presencia de acciones */}
          <colgroup>
            <col style={{ width: hayAcciones ? '32%' : '38%' }} />
            <col style={{ width: hayAcciones ? '30%' : '36%' }} />
            <col style={{ width: hayAcciones ? '22%' : '26%' }} />
            {hayAcciones && <col style={{ width: '16%' }} />}
          </colgroup>

          {/* Cabecera de la tabla con los títulos descriptivos */}
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Producto</th>
              <th className="px-5 py-3.5 font-semibold">Modelo compatible</th>
              <th className="px-5 py-3.5 font-semibold">Observaciones</th>
              {hayAcciones && (
                <th className="px-5 py-3.5 text-right font-semibold">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          {/* Cuerpo de la tabla: recorre las filas para renderizar la información de cada compatibilidad */}
          <tbody className="divide-y divide-slate-100">
            {filas.map((fila) => (
              <tr
                key={fila.id_compatibilidad}
                className="table-row-hover transition-colors"
              >
                {/* Celda del producto asociado */}
                <td className="px-5 py-3.5">
                  <EntidadRelacionada
                    icono={Package}
                    titulo={nombreProducto(fila)}
                    detalle={codigoProducto(fila)}
                  />
                </td>

                {/* Celda del modelo de vehículo compatible */}
                <td className="px-5 py-3.5">
                  <EntidadRelacionada
                    icono={CarFront}
                    titulo={nombreModelo(fila)}
                    detalle={fila.nombre_marca ?? 'Marca sin registro'}
                  />
                </td>

                {/* Celda de observaciones o nota aclaratoria */}
                <td className="px-5 py-3.5 text-sm text-slate-600">
                  {fila.observaciones ? (
                    <p className="line-clamp-2">{fila.observaciones}</p>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      Sin observaciones
                    </span>
                  )}
                </td>

                {/* Celda de acciones condicional */}
                {hayAcciones && (
                  <td className="px-5 py-3.5">
                    <AccionesFila
                      nombre={`${nombreProducto(fila)} con ${nombreModelo(fila)}`}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(fila)}
                      onEliminar={() => onEliminar(fila)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista alternativa en formato de tarjetas (Cards), diseñada para dispositivos móviles (oculta en xl) */}
      <div className="space-y-3 xl:hidden">
        {filas.map((fila) => (
          <article
            key={fila.id_compatibilidad}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Indicador superior de tipo de relación */}
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">
              <Link2 size={13} /> Relación compatible
            </div>

            {/* Contenido en cuadrícula que enlaza visualmente el producto y el modelo */}
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <EntidadRelacionada
                icono={Package}
                titulo={nombreProducto(fila)}
                detalle={codigoProducto(fila)}
              />
              <Link2 size={16} className="hidden text-slate-400 sm:block" />
              <EntidadRelacionada
                icono={CarFront}
                titulo={nombreModelo(fila)}
                detalle={fila.nombre_marca ?? 'Marca sin registro'}
              />
            </div>

            {/* Observaciones adicionales de la tarjeta si existen */}
            {fila.observaciones && (
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
                {fila.observaciones}
              </p>
            )}

            {/* Sección de acciones para la tarjeta, visible solo si cuenta con permisos */}
            {hayAcciones && (
              <div className="mt-3 border-t border-slate-100 pt-1">
                <AccionesFila
                  variante="tarjeta"
                  nombre={`${nombreProducto(fila)} con ${nombreModelo(fila)}`}
                  puedeEditar={puedeEditar}
                  puedeEliminar={puedeEliminar}
                  onEditar={() => onEditar(fila)}
                  onEliminar={() => onEliminar(fila)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
