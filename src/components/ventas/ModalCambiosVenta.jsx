import Modal from "../compartido/Modal";
import { ArrowLeftRight, Package } from "lucide-react";
import { formatearFechaHora } from "../../utils/compartido/fecha";
import { formatearPrecio } from "../../utils/productos/formato";

const leer = (valor) => {
  if (!valor) return {};
  if (typeof valor !== "string") return valor;
  try {
    return JSON.parse(valor);
  } catch {
    return {};
  }
};

const texto = (valor) =>
  valor === undefined || valor === null || valor === "" ? "Sin dato registrado" : String(valor);
const dinero = (valor) =>
  valor === undefined || valor === null ? "Sin dato registrado" : formatearPrecio(valor);

const nombreCliente = (datos, nombresClientes) =>
  datos.cliente?.nombre_cliente ??
  nombresClientes[datos.id_cliente] ??
  (datos.id_cliente ? `Cliente ${datos.id_cliente}` : "Cliente sin información");

const indexarDetalles = (detalles = []) => {
  const ocurrencias = {};
  return detalles.map((detalle) => {
    const id = String(detalle.id_producto ?? "sin-id");
    ocurrencias[id] = (ocurrencias[id] ?? 0) + 1;
    return { ...detalle, clave: `${id}-${ocurrencias[id]}` };
  });
};

function Dato({ etiqueta, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{etiqueta}</p>
      <div className="mt-1 truncate text-sm font-medium text-slate-900">{children}</div>
    </div>
  );
}

export default function ModalCambiosVenta({ registro, nombresClientes, onCerrar }) {
  const antes = leer(registro.datos_anteriores);
  const despues = leer(registro.datos_nuevos);
  const campos = [
    { etiqueta: "Estado", antes: antes.estado, despues: despues.estado },
    {
      etiqueta: "Cliente",
      antes: nombreCliente(antes, nombresClientes),
      despues: nombreCliente(despues, nombresClientes),
    },
    {
      etiqueta: "Fecha de venta",
      antes: antes.fecha_venta
        ? formatearFechaHora(antes.fecha_venta, { hora12: true })
        : undefined,
      despues: despues.fecha_venta
        ? formatearFechaHora(despues.fecha_venta, { hora12: true })
        : undefined,
    },
    {
      etiqueta: "Observaciones",
      antes: antes.observaciones || "Sin observaciones",
      despues: despues.observaciones || "Sin observaciones",
    },
    { etiqueta: "Subtotal", antes: dinero(antes.subtotal), despues: dinero(despues.subtotal) },
    { etiqueta: "Impuesto", antes: dinero(antes.impuesto), despues: dinero(despues.impuesto) },
    { etiqueta: "Total", antes: dinero(antes.total), despues: dinero(despues.total) },
  ];

  const detallesAntes = indexarDetalles(antes.detalles);
  const detallesDespues = indexarDetalles(despues.detalles);
  const porClave = (detalles) => Object.fromEntries(detalles.map((detalle) => [detalle.clave, detalle]));
  const mapaAntes = porClave(detallesAntes);
  const mapaDespues = porClave(detallesDespues);
  const claves = [...new Set([...detallesAntes, ...detallesDespues].map((detalle) => detalle.clave))];

  const resumenDetalle = (detalle) =>
    detalle
      ? `${detalle.cantidad} × ${dinero(detalle.precio_unitario)} · Subtotal ${dinero(detalle.subtotal)}`
      : "No estaba en la venta";

  return (
    <Modal
      titulo={registro.tipo_operacion === "Anulacion" ? "Cambios de la anulación" : "Cambios de la corrección"}
      onCerrar={onCerrar}
      ancho="max-w-3xl"
    >
      <div className="space-y-4">
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Datos del movimiento">
          <Dato etiqueta="Venta">{registro.venta?.numero_venta ?? "Venta sin número"}</Dato>
          <Dato etiqueta="Operación">{registro.tipo_operacion === "Anulacion" ? "Anulación" : "Corrección"}</Dato>
          <Dato etiqueta="Fecha y hora">
            {formatearFechaHora(registro.fecha_operacion, { hora12: true })}
          </Dato>
          <Dato etiqueta="Usuario">{registro.usuario?.nombre_completo ?? "Usuario no disponible"}</Dato>
          <div className="rounded-xl border border-slate-200 p-3 sm:col-span-2"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Motivo</p><p className="mt-1 text-sm leading-relaxed text-slate-800">{registro.motivo || "Sin motivo registrado"}</p></div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2"><ArrowLeftRight size={15} className="text-slate-500" /><h3 className="text-xs font-semibold text-slate-800">Comparación de datos</h3></div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Campo</th>
                <th className="px-3 py-2.5 font-semibold">Antes</th>
                <th className="px-3 py-2.5 font-semibold">Después</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campos.map((campo) => {
                const cambio = texto(campo.antes) !== texto(campo.despues);
                return (
                  <tr key={campo.etiqueta} className={cambio ? "bg-slate-50" : ""}>
                    <td className="px-3 py-2.5 font-medium text-slate-700">{campo.etiqueta}</td>
                    <td className="px-3 py-2.5 text-slate-600">{texto(campo.antes)}</td>
                    <td className="px-3 py-2.5 text-slate-900">{texto(campo.despues)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2"><Package size={15} className="text-slate-500" /><h3 className="text-xs font-semibold text-slate-800">Productos modificados</h3></div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Producto</th>
                  <th className="px-3 py-2.5 font-semibold">Antes</th>
                  <th className="px-3 py-2.5 font-semibold">Después</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {claves.length ? claves.map((clave) => {
                  const anterior = mapaAntes[clave];
                  const nuevo = mapaDespues[clave];
                  const producto = nuevo?.producto ?? anterior?.producto;
                  const nombre = producto?.nombre_producto ?? `Producto ${producto?.id_producto ?? nuevo?.id_producto ?? anterior?.id_producto ?? "sin identificar"}`;
                  const cambio = resumenDetalle(anterior) !== resumenDetalle(nuevo);
                  return (
                    <tr key={clave} className={cambio ? "bg-slate-50" : ""}>
                      <td className="px-3 py-2.5 font-medium text-slate-700">
                        {nombre}
                        {producto?.codigo_producto && <span className="block text-xs font-normal text-slate-500">{producto.codigo_producto}</span>}
                      </td>
                      <td className="px-3 py-2.5 text-slate-600">{resumenDetalle(anterior)}</td>
                      <td className="px-3 py-2.5 text-slate-900">{resumenDetalle(nuevo)}</td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan="3" className="px-3 py-6 text-center text-xs text-slate-500">Este registro no contiene detalles de productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-end border-t border-slate-100 pt-3">
          <button type="button" onClick={onCerrar} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Cerrar</button>
        </div>
      </div>
    </Modal>
  );
}
