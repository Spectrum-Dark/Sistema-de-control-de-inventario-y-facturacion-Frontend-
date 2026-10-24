import { Plus, Trash2 } from 'lucide-react';
import CampoSeleccionable from '../compartido/CampoSeleccionable';
import { subtotalDetalle } from '../../utils/compras/calculos';
import { FILA_VACIA } from '../../utils/compras/detalles';
import { formatearPrecio } from '../../utils/productos/formato';

// Constante que define las clases CSS reutilizables para los inputs dentro del editor de detalles de compra.
const claseInput =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200';

// Componente para gestionar dinámicamente los detalles de una compra (selección de productos, cantidades, precios unitarios y subtotales).
export default function EditorDetallesCompra({ filas, productos, onChange }) {
  // Función auxiliar para actualizar los campos de una fila específica dentro del listado de detalles.
  const actualizarFila = (indice, cambios) =>
    onChange(filas.map((f, i) => (i === indice ? { ...f, ...cambios } : f)));

  // Manejador cuando el usuario selecciona un producto en una fila; actualiza el ID y asigna automáticamente su precio de compra.
  const elegirProducto = (indice, idProducto) => {
    const producto = productos.find(
      (p) => String(p.id_producto) === idProducto
    );

    actualizarFila(indice, {
      id_producto: idProducto,
      // Al cambiar de producto, el precio unitario se actualiza automáticamente con el precio de compra registrado.
      precio_unitario: producto ? String(Number(producto.precio_compra)) : '',
    });
  };

  // Agrega una nueva fila vacía al final del arreglo de detalles.
  const agregarFila = () => onChange([...filas, { ...FILA_VACIA }]);

  // Elimina una fila o la reinicia a su estado vacío si es el único registro disponible.
  const quitarOLimpiarFila = (indice) => {
    if (filas[indice]?.id_producto && filas.length > 1) {
      onChange(filas.filter((_, i) => i !== indice));
      return;
    }

    onChange(filas.map((fila, i) => (i === indice ? { ...FILA_VACIA } : fila)));
  };

  // Mapea los IDs de los productos ya seleccionados para evitar duplicados en otras filas.
  const idsElegidos = filas.map((f) => f.id_producto);

  return (
    <div className="space-y-3">
      {/* Cabecera de la sección con título y botón para agregar nuevos productos al detalle */}
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

      {/* Recorrido de cada una de las filas que componen el detalle de compra */}
      {filas.map((fila, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-3"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            {/* Campo seleccionable de productos (filtra los ya elegidos para evitar repeticiones) */}
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

            {/* Campo de cantidad de unidades a comprar */}
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
                onChange={(e) =>
                  actualizarFila(i, { cantidad: e.target.value })
                }
                required
                className={claseInput}
              />
            </div>

            {/* Campo de precio unitario (bloqueado en modo de solo lectura ya que se hereda del producto) */}
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

            {/* Cálculo del subtotal por línea y botón para eliminar la fila */}
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
