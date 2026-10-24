import { Plus, Trash2 } from "lucide-react";
import CampoSeleccionable from "../compartido/CampoSeleccionable";
import { subtotalDetalle } from "../../utils/ventas/calculos";
import { FILA_VACIA } from "../../utils/ventas/detalles";
import { formatearPrecio } from "../../utils/productos/formato";

const claseInput =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function EditorDetallesVenta({ filas, productos, onChange }) {
  const actualizarFila = (indice, cambios) =>
    onChange(filas.map((fila, i) => (i === indice ? { ...fila, ...cambios } : fila)));

  const elegirProducto = (indice, idProducto) => {
    const producto = productos.find((p) => String(p.id_producto) === idProducto);
    actualizarFila(indice, {
      id_producto: idProducto,
      precio_unitario: producto ? String(Number(producto.precio_venta)) : "",
    });
  };

  const quitarOLimpiarFila = (indice) => {
    if (filas[indice]?.id_producto && filas.length > 1) {
      onChange(filas.filter((_, i) => i !== indice));
      return;
    }

    onChange(filas.map((fila, i) => (i === indice ? { ...FILA_VACIA } : fila)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Productos</p>
        <button
          type="button"
          onClick={() => onChange([...filas, { ...FILA_VACIA }])}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Plus size={16} /> Agregar producto
        </button>
      </div>
      {filas.map((fila, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <CampoSeleccionable
                id={`producto_venta_${i}`}
                label="Producto"
                value={fila.id_producto}
                onChange={(evento) => elegirProducto(i, evento.target.value)}
                placeholder="Buscar por código o nombre"
                options={productos
                  .filter((producto) => Number(producto.existencia) > 0)
                  .map((producto) => ({
                    value: producto.id_producto,
                    label: `${producto.codigo_producto} — ${producto.nombre_producto}`,
                    descripcion: `Existencia: ${producto.existencia}`,
                  }))}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500">Cantidad</label>
              <input
                aria-label="Cantidad"
                type="number"
                min={1}
                step="1"
                value={fila.cantidad}
                onChange={(e) => actualizarFila(i, { cantidad: e.target.value })}
                required
                className={claseInput}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-xs font-medium text-slate-500">Precio unitario (C$)</label>
              <input
                aria-label="Precio unitario"
                type="number"
                min={0}
                step="0.01"
                value={fila.precio_unitario}
                readOnly
                required
                className={`${claseInput} cursor-not-allowed bg-slate-100 text-slate-500`}
              />
            </div>
            <div className="flex items-end justify-between gap-2 sm:col-span-2">
              <div>
                <p className="text-xs text-slate-500">Subtotal</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatearPrecio(subtotalDetalle(fila.cantidad, fila.precio_unitario))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => quitarOLimpiarFila(i)}
                aria-label="Quitar producto"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
