import { CarFront } from 'lucide-react';
import InsigniaEstado from '../compartido/InsigniaEstado';
import AccionesFila from '../compartido/AccionesFila';
import { formatearAnios } from '../../utils/modelos/formato';

// Componente auxiliar 'IdentidadModelo' para mostrar el icono representativo, el nombre del modelo y su marca asociada.
function IdentidadModelo({ modelo, nombreMarca }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <CarFront size={18} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900">
          {modelo.nombre_modelo}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">
          {nombreMarca}
        </span>
      </span>
    </div>
  );
}

// Componente principal 'TablaModelos' para listar los modelos de vehículos registrados, soportando diseño dual responsivo (tabla tradicional para pantallas extra grandes y tarjetas adaptables para dispositivos móviles y tablets).
export default function TablaModelos({
  modelos,
  nombresMarcas,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Vista de tabla tradicional para pantallas grandes (XL en adelante) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[16%]" />
            <col className={hayAcciones ? 'w-[36%]' : 'w-[48%]'} />
            <col className="w-[12%]" />
            {hayAcciones && <col className="w-[12%]" />}
          </colgroup>
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Modelo y marca</th>
              <th className="px-5 py-3.5 font-semibold">Años</th>
              <th className="px-5 py-3.5 font-semibold">Descripción</th>
              <th className="px-5 py-3.5 font-semibold">Estado</th>
              {hayAcciones && (
                <th className="px-5 py-3.5 text-right font-semibold">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modelos.map((modelo) => (
              <tr
                key={modelo.id_modelo}
                className="table-row-hover transition-colors"
              >
                <td className="px-5 py-3.5">
                  <IdentidadModelo
                    modelo={modelo}
                    nombreMarca={
                      nombresMarcas[modelo.id_marca] ?? 'Marca sin registro'
                    }
                  />
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-slate-600">
                  {formatearAnios(modelo.anio_inicio, modelo.anio_fin)}
                </td>
                <td className="max-w-md px-5 py-3.5 text-sm text-slate-600">
                  {modelo.descripcion ? (
                    <p className="line-clamp-2">{modelo.descripcion}</p>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      Sin descripción
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <InsigniaEstado estado={modelo.estado} />
                </td>
                {hayAcciones && (
                  <td className="px-5 py-3.5">
                    <AccionesFila
                      nombre={modelo.nombre_modelo}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(modelo)}
                      onEliminar={() => onEliminar(modelo)}
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
        {modelos.map((modelo) => (
          <article
            key={modelo.id_modelo}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <IdentidadModelo
                modelo={modelo}
                nombreMarca={
                  nombresMarcas[modelo.id_marca] ?? 'Marca sin registro'
                }
              />
              <InsigniaEstado estado={modelo.estado} />
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">
                Años de fabricación
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {formatearAnios(modelo.anio_inicio, modelo.anio_fin)}
              </p>
              {modelo.descripcion && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {modelo.descripcion}
                </p>
              )}
            </div>

            {hayAcciones && (
              <div className="mt-3 border-t border-slate-100 pt-1">
                <AccionesFila
                  variante="tarjeta"
                  nombre={modelo.nombre_modelo}
                  puedeEditar={puedeEditar}
                  puedeEliminar={puedeEliminar}
                  onEditar={() => onEditar(modelo)}
                  onEliminar={() => onEliminar(modelo)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
