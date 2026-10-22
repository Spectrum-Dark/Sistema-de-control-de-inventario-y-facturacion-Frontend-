import { Plus, Trash2 } from "lucide-react";
import { subtotalDetalle } from "../../utils/compras/calculos";
import { FILA_VACIA } from "../../utils/compras/detalles";
import { formatearPrecio } from "../../utils/productos/formato";

const claseInput =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function EditorDetallesCompra({ filas, productos, onChange }) {
  const actualizarFila = (indice, cambios) =>
    onChange(filas.map((f, i) => (i === indice ? { ...f, ...cambios } : f)));

  const elegirProducto = (indice, idProducto) => {
    const producto = productos.find((p) => String(p.id_producto) === idProducto);

    actualizarFila(indice, {
      id_producto: idProducto,
      // Al cambiar de producto, el precio pasa a ser el precio de compra del nuevo producto
      ...(producto && { precio_unitario: String(Number(producto.precio_compra)) }),
    });
  };

  const agregarFila = () => onChange([...filas, { ...FILA_VACIA }]);
  const quitarFila = (indice) => onChange(filas.filter((_, i) => i !== indice));

  // Productos ya elegidos: no se pueden repetir en otra fila
  const idsElegidos = filas.map((f) => f.id_producto);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Productos</p>
        <button
          type="button"
          onClick={agregarFila}
          className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          <Plus size={16} />
          Agregar producto
        </button>
      </div>

      {filas.map((fila, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Producto
              </label>
              <select
                aria-label="Producto"
                value={fila.id_producto}
                onChange={(e) => elegirProducto(i, e.target.value)}
                required
                className={claseInput}
              >
                <option value="">Selecciona un producto</option>
                {productos
                  .filter(
                    (p) =>
                      String(p.id_producto) === fila.id_producto ||
                      !idsElegidos.includes(String(p.id_producto))
                  )
                  .map((p) => (
                    <option key={p.id_producto} value={p.id_producto}>
                      {p.codigo_producto} – {p.nombre_producto}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Cantidad
              </label>
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
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Precio unitario
              </label>
              <input
                aria-label="Precio unitario"
                type="number"
                min={0}
                step="0.01"
                value={fila.precio_unitario}
                onChange={(e) =>
                  actualizarFila(i, { precio_unitario: e.target.value })
                }
                required
                className={claseInput}
              />
            </div>

            <div className="flex items-end justify-between gap-2 sm:col-span-2">
              <div>
                <p className="text-xs text-slate-500">Subtotal</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatearPrecio(
                    subtotalDetalle(fila.cantidad, fila.precio_unitario)
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => quitarFila(i)}
                disabled={filas.length === 1}
                aria-label="Quitar producto"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
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