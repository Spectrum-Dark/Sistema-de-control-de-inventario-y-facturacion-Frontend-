import { Tag } from "lucide-react";
import InsigniaEstado from "../compartido/InsigniaEstado";
import AccionesFila from "../compartido/AccionesFila";

// Componente auxiliar interno para renderizar de manera consistente la identidad visual de la categoría (icono y nombre).
function IdentidadCategoria({ categoria }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* Contenedor del icono representativo */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Tag size={17} strokeWidth={1.8} />
      </span>
      {/* Información textual de la categoría */}
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900">
          {categoria.nombre_categoria}
        </span>
        <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Categoría de repuestos
        </span>
      </span>
    </div>
  );
}

export default function TablaCategorias({
  categorias,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  // Bandera lógica que determina si se debe mostrar la columna o sección de acciones según los permisos del usuario.
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Vista de tabla tradicional, optimizada para pantallas grandes (xl en adelante) con desplazamiento horizontal si es necesario */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-190 text-left text-sm">
          {/* Cabecera de la tabla con los títulos de las columnas */}
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Categoría</th>
              <th className="px-5 py-3.5 font-semibold">Descripción</th>
              <th className="px-5 py-3.5 font-semibold columna-estado">Estado</th>
              {/* Renderiza la columna de acciones de forma condicional */}
              {hayAcciones && (
                <th className="px-5 py-3.5 text-right font-semibold columna-acciones">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          {/* Cuerpo de la tabla: recorre el arreglo de categorías para renderizar cada fila */}
          <tbody className="divide-y divide-slate-100">
            {categorias.map((categoria) => (
              <tr
                key={categoria.id_categoria}
                className="table-row-hover transition-colors"
              >
                {/* Celda de identidad (icono y nombre) */}
                <td className="px-5 py-3.5">
                  <IdentidadCategoria categoria={categoria} />
                </td>

                {/* Celda de descripción: maneja de forma segura texto extenso limitando líneas o mostrando un aviso si está vacía */}
                <td className="max-w-md px-5 py-3.5 text-sm text-slate-600">
                  {categoria.descripcion ? (
                    <p className="line-clamp-2">{categoria.descripcion}</p>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      Sin descripción
                    </span>
                  )}
                </td>

                {/* Celda de estado utilizando el componente reutilizable InsigniaEstado */}
                <td className="px-5 py-3.5 columna-estado">
                  <InsigniaEstado estado={categoria.estado} />
                </td>

                {/* Celda de acciones condicional con los botones de editar y eliminar */}
                {hayAcciones && (
                  <td className="px-5 py-3.5 columna-acciones">
                    <AccionesFila
                      nombre={categoria.nombre_categoria}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(categoria)}
                      onEliminar={() => onEliminar(categoria)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista alternativa en formato de tarjetas (Cards), diseñada para dispositivos móviles y pantallas medianas (oculta en xl) */}
      <div className="space-y-3 xl:hidden">
        {categorias.map((categoria) => (
          <article
            key={categoria.id_categoria}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Cabecera de la tarjeta: Identidad a la izquierda e insignia de estado a la derecha */}
            <div className="flex items-start justify-between gap-3">
              <IdentidadCategoria categoria={categoria} />
              <InsigniaEstado estado={categoria.estado} />
            </div>

            {/* Contenido de la descripción dentro de la tarjeta */}
            <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
              {categoria.descripcion || (
                <span className="text-xs italic text-slate-400">
                  Sin descripción registrada.
                </span>
              )}
            </p>

            {/* Sección de acciones en la tarjeta, visible solo si cuenta con permisos */}
            {hayAcciones && (
              <div className="mt-3 border-t border-slate-100 pt-1">
                <AccionesFila
                  variante="tarjeta"
                  nombre={categoria.nombre_categoria}
                  puedeEditar={puedeEditar}
                  puedeEliminar={puedeEliminar}
                  onEditar={() => onEditar(categoria)}
                  onEliminar={() => onEliminar(categoria)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
