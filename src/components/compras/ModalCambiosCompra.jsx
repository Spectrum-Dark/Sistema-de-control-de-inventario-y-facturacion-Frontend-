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

const dinero = (v) => (v === undefined || v === null ? "—" : formatearPrecio(v));
const texto = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));

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
      antes: nombresProveedores[antes.id_proveedor] ?? antes.id_proveedor,
      despues: nombresProveedores[despues.id_proveedor] ?? despues.id_proveedor,
    },
    {
      etiqueta: "Fecha de compra",
      antes: antes.fecha_compra,
      despues: despues.fecha_compra,
    },
    {
      etiqueta: "Observaciones",
      antes: antes.observaciones,
      despues: despues.observaciones,
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
    >
      <div className="space-y-5">
        <div className="text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">Compra:</span>{" "}
            {registro.compra?.numero_compra ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-900">Fecha:</span>{" "}
            {formatearFechaHora(registro.fecha_operacion)} ·{" "}
            {registro.usuario?.nombre_completo ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-900">Motivo:</span>{" "}
            {registro.motivo || "—"}
          </p>
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
                  <tr key={c.etiqueta} className={cambio ? "bg-amber-50" : ""}>
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
                    x ? `${x.cantidad} × ${dinero(x.precio_unitario)}` : "—";
                  const cambio = resumen(a) !== resumen(d);

                  return (
                    <tr key={id} className={cambio ? "bg-amber-50" : ""}>
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {nombresProductos[id] ?? `Producto ${id}`}
                      </td>
                      <td className="px-3 py-2 text-slate-600">{resumen(a)}</td>
                      <td className="px-3 py-2 text-slate-900">{resumen(d)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}