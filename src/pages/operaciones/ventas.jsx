import useVentas from "../../hooks/operaciones/useVentas";
import Informacion_Venta from "../../components/operaciones/ventas/informacion_venta";
import Agregar_Producto from "../../components/operaciones/ventas/agregar_producto";
import Detalle_Venta from "../../components/operaciones/ventas/detalle_venta";

export default function Ventas() {
  const {
    clientes,
    productos,
    formulario,
    idProductoSeleccionado,
    detalles,
    totalVenta,
    mensaje,
    tipoMensaje,
    setIdProductoSeleccionado,
    manejarCambioFormulario,
    agregarProducto,
    manejarCambioDetalle,
    eliminarProducto,
    confirmarVenta,
    nuevaVenta,
  } = useVentas();

  return (
    <main className="space-y-6">
      {/* Encabezado del módulo */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Ventas
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Registro de ventas de repuestos y preparación de facturas.
        </p>
      </div>

      {/* Formulario principal */}
      <form onSubmit={confirmarVenta} className="space-y-5">
        <Informacion_Venta
          formulario={formulario}
          clientes={clientes}
          manejarCambioFormulario={manejarCambioFormulario}
        />

        <Agregar_Producto
          productos={productos}
          idProductoSeleccionado={idProductoSeleccionado}
          setIdProductoSeleccionado={setIdProductoSeleccionado}
          agregarProducto={agregarProducto}
        />

        <Detalle_Venta
          detalles={detalles}
          manejarCambioDetalle={manejarCambioDetalle}
          eliminarProducto={eliminarProducto}
        />

        {/* Total calculado */}
        <section className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-700">
            Total de la venta:
          </h2>
          <span className="text-xl font-black text-slate-900">
            C$ {Number(totalVenta).toFixed(2)}
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

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={nuevaVenta}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Nueva venta
          </button>

          <button
            type="submit"
            className="rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-green-700 active:scale-[0.98]"
          >
            Confirmar venta
          </button>
        </div>
      </form>
    </main>
  );
}
