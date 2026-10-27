import { UserRound, Hash, Phone, Mail, MapPin } from 'lucide-react';
import InsigniaEstado from '../compartido/InsigniaEstado';
import AccionesFila from '../compartido/AccionesFila';

// Componente auxiliar interno para renderizar de manera uniforme el texto o aviso de campo vacío.
const Vacio = () => (
  <span className="text-xs italic text-slate-400">Sin registrar</span>
);

// Componente auxiliar para mostrar la identidad visual del cliente (icono, nombre e identificación).
function IdentidadCliente({ cliente }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <UserRound size={18} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900">
          {cliente.nombre_cliente}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">
          {cliente.identificacion || 'Sin identificación'}
        </span>
      </span>
    </div>
  );
}

export default function TablaClientes({
  clientes,
  puedeEditar,
  puedeEliminar,
  onEditar,
  onEliminar,
}) {
  // Bandera lógica que determina si se debe habilitar y mostrar la columna o sección de acciones según los permisos.
  const hayAcciones = puedeEditar || puedeEliminar;

  return (
    <>
      {/* Vista de tabla tradicional, optimizada para pantallas grandes (xl en adelante) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full table-fixed text-left text-sm">
          {/* Cabecera de la tabla con los títulos descriptivos de cada columna */}
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Cliente</th>
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

          {/* Cuerpo de la tabla: recorre el listado de clientes para renderizar las filas */}
          <tbody className="divide-y divide-slate-100">
            {clientes.map((cliente) => (
              <tr
                key={cliente.id_cliente}
                className="table-row-hover transition-colors"
              >
                {/* Celda de identidad (avatar e información del cliente) */}
                <td className="px-5 py-3.5">
                  <IdentidadCliente cliente={cliente} />
                </td>

                {/* Celda de contacto (muestra teléfono y correo electrónico de forma apilada) */}
                <td className="px-5 py-3.5 text-slate-600">
                  <p className="whitespace-nowrap">
                    {cliente.telefono || <Vacio />}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {cliente.correo || 'Sin correo'}
                  </p>
                </td>

                {/* Celda de dirección física con limitación de líneas */}
                <td className="px-5 py-3.5 text-sm text-slate-600">
                  <p className="line-clamp-2">
                    {cliente.direccion || <Vacio />}
                  </p>
                </td>

                {/* Celda de estado utilizando el componente InsigniaEstado */}
                <td className="px-5 py-3.5 columna-estado">
                  <InsigniaEstado estado={cliente.estado} />
                </td>

                {/* Celda de acciones condicional con opciones de edición y eliminación */}
                {hayAcciones && (
                  <td className="px-5 py-3.5 columna-acciones">
                    <AccionesFila
                      nombre={cliente.nombre_cliente}
                      puedeEditar={puedeEditar}
                      puedeEliminar={puedeEliminar}
                      onEditar={() => onEditar(cliente)}
                      onEliminar={() => onEliminar(cliente)}
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
        {clientes.map((cliente) => (
          <article
            key={cliente.id_cliente}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Cabecera de la tarjeta: Identidad e insignia de estado */}
            <div className="flex items-start justify-between gap-3">
              <IdentidadCliente cliente={cliente} />
              <InsigniaEstado estado={cliente.estado} />
            </div>

            {/* Contenido en cuadrícula dentro de la tarjeta con iconos de contacto y ubicación */}
            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Phone size={14} className="shrink-0 text-slate-400" />
                {cliente.telefono || <Vacio />}
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Mail size={14} className="shrink-0 text-slate-400" />
                <span className="truncate">{cliente.correo || <Vacio />}</span>
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <MapPin size={14} className="shrink-0 text-slate-400" />
                <span className="line-clamp-2">
                  {cliente.direccion || <Vacio />}
                </span>
              </p>
              <p className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                <Hash size={14} className="shrink-0 text-slate-400" />
                {cliente.identificacion || <Vacio />}
              </p>
            </div>

            {/* Sección de acciones para la tarjeta, visible solo si cuenta con permisos */}
            {hayAcciones && (
              <div className="mt-3 border-t border-slate-100 pt-1">
                <AccionesFila
                  variante="tarjeta"
                  nombre={cliente.nombre_cliente}
                  puedeEditar={puedeEditar}
                  puedeEliminar={puedeEliminar}
                  onEditar={() => onEditar(cliente)}
                  onEliminar={() => onEliminar(cliente)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
