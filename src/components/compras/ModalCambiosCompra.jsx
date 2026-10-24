import Modal from "../compartido/Modal";
import { ArrowLeftRight, ClipboardList, Package } from "lucide-react";
import { formatearPrecio } from "../../utils/productos/formato";
import { formatearFechaHora } from "../../utils/compartido/fecha";

// Los datos pueden llegar como objeto o como texto JSON
const leer = (valor) => {
  if (!valor) return {};
  if (typeof valor !== "string") return valor;
  try {
    return JSON.parse(valor);
  } catch {
    return {};
  }
};

const dinero = (v) => (v === undefined || v === null ? "Sin dato registrado" : formatearPrecio(v));
const texto = (v) => (v === undefined || v === null || v === "" ? "Sin dato registrado" : String(v));

export default function ModalCambiosCompra({
  registro,
  nombresProveedores,
  nombresProductos,
  onCerrar,
}) {
  const antes = leer(registro.datos_anteriores);
  const despues = leer(registro.datos_nuevos);
  const esConfirmacion = registro.tipo_operacion === "Confirmacion";

  const campos = [
    { etiqueta: "Estado", antes: antes.estado, despues: despues.estado },
    {
      etiqueta: "Proveedor",
      antes: nombresProveedores[antes.id_proveedor] ?? (antes.id_proveedor ? `Proveedor ${antes.id_proveedor}` : "Proveedor sin información"),
      despues: nombresProveedores[despues.id_proveedor] ?? (despues.id_proveedor ? `Proveedor ${despues.id_proveedor}` : "Proveedor sin información"),
    },
    {
      etiqueta: "Fecha de compra",
      antes: antes.fecha_compra ? formatearFechaHora(antes.fecha_compra, { hora12: true }) : "Sin fecha registrada",
      despues: despues.fecha_compra ? formatearFechaHora(despues.fecha_compra, { hora12: true }) : "Sin fecha registrada",
    },
    {
      etiqueta: "Observaciones",
      antes: antes.observaciones || "Sin observaciones",
      despues: despues.observaciones || "Sin observaciones",
    },
    {
      etiqueta: "Subtotal",
      antes: dinero(antes.subtotal),
      despues: dinero(despues.subtotal),
    },
    {
      etiqueta: "Impuesto",
      antes: dinero(antes.impuesto),
      despues: dinero(despues.impuesto),
    },
    {
      etiqueta: "Total",
      antes: dinero(antes.total),
      despues: dinero(despues.total),
    },
  ];

  // Productos de ambas versiones, sin repetir
  const detallesAntes = antes.detalles ?? [];
  const detallesDespues = despues.detalles ?? [];
  const idsProductos = [
    ...new Set([...detallesAntes, ...detallesDespues].map((d) => d.id_producto)),
  ];
  const buscar = (lista, id) => lista.find((d) => d.id_producto === id);

  const metadatos = [
    { etiqueta: "Compra", valor: registro.compra?.numero_compra ?? "Compra sin número" },
    { etiqueta: "Operación", valor: esConfirmacion ? "Confirmación" : "Corrección" },
    { etiqueta: "Fecha y hora", valor: formatearFechaHora(registro.fecha_operacion, { hora12: true }) },
    { etiqueta: "Usuario", valor: registro.usuario?.nombre_completo ?? "Usuario no disponible" },
  ];

  return (
    <Modal
      titulo={esConfirmacion ? "Confirmación de la compra" : "Cambios de la corrección"}
      onCerrar={onCerrar}
      ancho="max-w-3xl"
    >
      <div className="space-y-4">
        <section className="grid gap-2 sm:grid-cols-2" aria-label="Datos del movimiento">
          {metadatos.map((dato) => <div key={dato.etiqueta} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{dato.etiqueta}</p><p className="mt-1 truncate text-sm font-medium text-slate-900">{dato.valor}</p></div>)}
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
              {campos.map((c) => {
                const cambio = texto(c.antes) !== texto(c.despues);
                return (
                    <tr key={c.etiqueta} className={cambio ? "table-row-hover" : ""}>
                    <td className="px-3 py-2.5 font-medium text-slate-700">
                      {c.etiqueta}
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{texto(c.antes)}</td>
                    <td className="px-3 py-2.5 text-slate-900">{texto(c.despues)}</td>
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
                {idsProductos.map((id) => {
                  const a = buscar(detallesAntes, id);
                  const d = buscar(detallesDespues, id);
                  const resumen = (x) =>
                    x ? `${x.cantidad} × ${dinero(x.precio_unitario)}` : "No estaba en la compra";
                  const cambio = resumen(a) !== resumen(d);

                  return (
                    <tr key={id} className={cambio ? "table-row-hover" : ""}>
                      <td className="px-3 py-2.5 font-medium text-slate-700">
                        {nombresProductos[id] ?? `Producto ${id ?? "sin identificar"}`}
                      </td>
                      <td className="px-3 py-2.5 text-slate-600">{resumen(a)}</td>
                      <td className="px-3 py-2.5 text-slate-900">{resumen(d)}</td>
                    </tr>
                  );
                })}
                {idsProductos.length === 0 && (
                  <tr><td colSpan="3" className="px-3 py-6 text-center text-xs text-slate-500">Este registro no contiene detalles de productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-end border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
