import useCompras from "../../hooks/operaciones/useCompras";
import Informacion_Compra from "../../components/operaciones/compras/informacion_compra";
import Agregar_Producto from "../../components/operaciones/compras/agregar_producto";
import Detalle_Compra from "../../components/operaciones/compras/detalle_compra";

export default function Compras() {
  const {
    proveedores,
    productos,
    formulario,
    idProductoSeleccionado,
    detalles,
    totalCompra,
    mensaje,
    tipoMensaje,
    setIdProductoSeleccionado,
    manejarCambioFormulario,
    agregarProducto,
    manejarCambioDetalle,
    eliminarProducto,
    confirmarCompra,
    nuevaCompra,
  } = useCompras();

  return (
    <main className="space-y-6">
      {/* Título del módulo */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Compras
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Registro y consulta de compras de repuestos.
        </p>
      </div>

      {/* Formulario principal */}
      <form onSubmit={confirmarCompra} className="space-y-5">
        <Informacion_Compra
          formulario={formulario}
          proveedores={proveedores}
          manejarCambioFormulario={manejarCambioFormulario}
        />

        <Agregar_Producto
          productos={productos}
          idProductoSeleccionado={idProductoSeleccionado}
          setIdProductoSeleccionado={setIdProductoSeleccionado}
          agregarProducto={agregarProducto}
        />

        <Detalle_Compra
          detalles={detalles}
          manejarCambioDetalle={manejarCambioDetalle}
          eliminarProducto={eliminarProducto}
        />

        {/* Total calculado */}
        <section className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-700">
            Total de la compra:
          </h2>
          <span className="text-xl font-black text-slate-900">
            C$ {Number(totalCompra).toFixed(2)}
          </span>
        </section>

        {/* Mensajes de validación y confirmación */}
        {mensaje && (
          <p
            role="status"
            className={`rounded-xl border p-3 text-xs font-semibold animate-in fade-in ${
              tipoMensaje === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {tipoMensaje === "error" ? "Error: " : ""}
            {mensaje}
          </p>
        )}

        {/* Acciones del formulario */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={nuevaCompra}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Nueva compra
          </button>

          <button
            type="submit"
            className="rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-green-700 active:scale-[0.98]"
          >
            Confirmar compra
          </button>
        </div>
      </form>
    </main>
  );
}