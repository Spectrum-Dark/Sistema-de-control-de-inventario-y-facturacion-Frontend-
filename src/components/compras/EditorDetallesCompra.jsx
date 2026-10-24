import { Plus, Trash2 } from "lucide-react";
import CampoSeleccionable from "../compartido/CampoSeleccionable";
import { subtotalDetalle } from "../../utils/compras/calculos";
import { FILA_VACIA } from "../../utils/compras/detalles";
import { formatearPrecio } from "../../utils/productos/formato";

const claseInput =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function EditorDetallesCompra({ filas, productos, onChange }) {
  const actualizarFila = (indice, cambios) =>
    onChange(filas.map((f, i) => (i === indice ? { ...f, ...cambios } : f)));

  const elegirProducto = (indice, idProducto) => {
    const producto = productos.find((p) => String(p.id_producto) === idProducto);

    actualizarFila(indice, {
      id_producto: idProducto,
      // Al cambiar de producto, el precio pasa a ser el precio de compra del nuevo producto
      precio_unitario: producto ? String(Number(producto.precio_compra)) : "",
    });
  };

  const agregarFila = () => onChange([...filas, { ...FILA_VACIA }]);
  const quitarOLimpiarFila = (indice) => {
    if (filas[indice]?.id_producto && filas.length > 1) {
      onChange(filas.filter((_, i) => i !== indice));
      return;
    }

    onChange(filas.map((fila, i) => (i === indice ? { ...FILA_VACIA } : fila)));
  };

  // Productos ya elegidos: no se pueden repetir en otra fila
  const idsElegidos = filas.map((f) => f.id_producto);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Productos</p>
        <button
          type="button"
          onClick={agregarFila}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Plus size={16} />
          Agregar producto
        </button>
      </div>

      {filas.map((fila, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <CampoSeleccionable
                id={`producto_compra_${i}`}
                label="Producto"
                value={fila.id_producto}
                onChange={(evento) => elegirProducto(i, evento.target.value)}
                placeholder="Buscar por código o nombre"
                options={productos
                  .filter(
                    (p) =>
                      String(p.id_producto) === fila.id_producto ||
                      !idsElegidos.includes(String(p.id_producto))
                  )
                  .map((p) => ({
                    value: p.id_producto,
                    label: `${p.codigo_producto} — ${p.nombre_producto}`,
                    descripcion: `Precio compra: ${formatearPrecio(p.precio_compra)}`,
                  }))}
                required
              />
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
                readOnly
                required
                className={`${claseInput} cursor-not-allowed bg-slate-100 text-slate-500`}
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
