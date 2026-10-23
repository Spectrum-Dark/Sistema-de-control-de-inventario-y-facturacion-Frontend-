import Modal from "../compartido/Modal";
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

  return (
    <Modal
      titulo={esConfirmacion ? "Confirmación de la compra" : "Cambios de la corrección"}
      onCerrar={onCerrar}
      ancho="max-w-3xl"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div><p className="text-xs text-slate-500">Compra</p><p className="font-medium text-slate-900">{registro.compra?.numero_compra ?? "Compra sin número"}</p></div>
          <div><p className="text-xs text-slate-500">Operación</p><p className="text-slate-900">{esConfirmacion ? "Confirmación" : "Corrección"}</p></div>
          <div><p className="text-xs text-slate-500">Fecha y hora</p><p className="text-slate-900">{formatearFechaHora(registro.fecha_operacion, { hora12: true })}</p></div>
          <div><p className="text-xs text-slate-500">Usuario</p><p className="text-slate-900">{registro.usuario?.nombre_completo ?? "Usuario no disponible"}</p></div>
          <div className="rounded-xl bg-slate-50 p-3 sm:col-span-2"><p className="text-xs text-slate-500">Motivo</p><p className="text-sm text-slate-900">{registro.motivo || "Sin motivo registrado"}</p></div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Campo</th>
                <th className="px-3 py-2 font-medium">Antes</th>
                <th className="px-3 py-2 font-medium">Después</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campos.map((c) => {
                const cambio = texto(c.antes) !== texto(c.despues);
                return (
                  <tr key={c.etiqueta} className={cambio ? "bg-slate-50" : ""}>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {c.etiqueta}
                    </td>
                    <td className="px-3 py-2 text-slate-600">{texto(c.antes)}</td>
                    <td className="px-3 py-2 text-slate-900">{texto(c.despues)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-900">Productos</p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-medium">Producto</th>
                  <th className="px-3 py-2 font-medium">Antes</th>
                  <th className="px-3 py-2 font-medium">Después</th>
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
                    <tr key={id} className={cambio ? "bg-slate-50" : ""}>
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {nombresProductos[id] ?? `Producto ${id ?? "sin identificar"}`}
                      </td>
                      <td className="px-3 py-2 text-slate-600">{resumen(a)}</td>
                      <td className="px-3 py-2 text-slate-900">{resumen(d)}</td>
                    </tr>
                  );
                })}
                {idsProductos.length === 0 && (
                  <tr><td colSpan="3" className="px-3 py-4 text-center text-slate-500">Este registro no contiene detalles de productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
