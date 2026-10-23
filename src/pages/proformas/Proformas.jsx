import { useState } from "react";
import { Printer, RotateCw } from "lucide-react";
import CampoSelect from "../../components/compartido/CampoSelect";
import EditorDetallesVenta from "../../components/ventas/EditorDetallesVenta";
import VistaProforma from "../../components/proformas/VistaProforma";
import { useClientes } from "../../hooks/clientes/useClientes";
import { useProductos } from "../../hooks/productos/useProductos";
import { calcularTotales, subtotalDetalle } from "../../utils/ventas/calculos";
import { FILA_VACIA, filaCompleta } from "../../utils/ventas/detalles";
import { formatearPrecio } from "../../utils/productos/formato";

export default function Proformas() {
  const {
    clientes,
    cargando: cargandoClientes,
    error: errorClientes,
    recargar: recargarClientes,
  } = useClientes();
  const {
    productos,
    cargando: cargandoProductos,
    error: errorProductos,
    recargar: recargarProductos,
  } = useProductos();
  const [idCliente, setIdCliente] = useState("");
  const [filas, setFilas] = useState([{ ...FILA_VACIA }]);
  const [observaciones, setObservaciones] = useState("");
  const [proforma, setProforma] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState("");

  const totales = calcularTotales(filas);
  const cargando = cargandoClientes || cargandoProductos;
  const errorDatos = errorClientes || errorProductos;

  const prepararProforma = (evento) => {
    evento.preventDefault();
    setErrorFormulario("");

    if (!idCliente) {
      setErrorFormulario("Selecciona un cliente para continuar.");
      return;
    }
    if (!filas.length || !filas.every(filaCompleta)) {
      setErrorFormulario("Completa el producto, la cantidad y el precio de cada fila.");
      return;
    }

    const cliente = clientes.find(
      (elemento) => String(elemento.id_cliente) === idCliente,
    );
    if (!cliente) {
      setErrorFormulario("No se encontró el cliente seleccionado. Actualiza los datos e inténtalo de nuevo.");
      return;
    }

    const detalles = filas.map((fila) => {
      const producto = productos.find(
        (elemento) => String(elemento.id_producto) === fila.id_producto,
      );
      return {
        codigo: producto?.codigo_producto ?? "",
        nombre: producto?.nombre_producto ?? "Producto no disponible",
        cantidad: Number(fila.cantidad),
        precioUnitario: Number(fila.precio_unitario),
        subtotal: subtotalDetalle(fila.cantidad, fila.precio_unitario),
      };
    });

    setProforma({
      cliente,
      detalles,
      observaciones: observaciones.trim(),
      fecha: new Date().toISOString(),
      ...calcularTotales(filas),
    });
  };

  const cambiarCliente = (evento) => {
    setIdCliente(evento.target.value);
    setProforma(null);
  };

  const cambiarFilas = (nuevasFilas) => {
    setFilas(nuevasFilas);
    setProforma(null);
  };

  const cambiarObservaciones = (evento) => {
    setObservaciones(evento.target.value);
    setProforma(null);
  };

  const recargarDatos = () => {
    recargarClientes();
    recargarProductos();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Proformas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Prepara e imprime una cotización para el cliente.
        </p>
      </header>

      {errorDatos ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm text-red-700">{errorDatos}</p>
          <button
            type="button"
            onClick={recargarDatos}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-700 underline"
          >
            <RotateCw size={15} /> Reintentar carga
          </button>
        </section>
      ) : cargando ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Cargando clientes y productos...
        </div>
      ) : (
        <form
          onSubmit={prepararProforma}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="max-w-xl">
            <CampoSelect
              id="cliente_proforma"
              label="Cliente"
              value={idCliente}
              onChange={cambiarCliente}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre_cliente}
                </option>
              ))}
            </CampoSelect>
          </div>

          <EditorDetallesVenta
            filas={filas}
            productos={productos}
            onChange={cambiarFilas}
          />

          <div>
            <label
              htmlFor="observaciones_proforma"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Observaciones (opcional)
            </label>
            <textarea
              id="observaciones_proforma"
              rows={3}
              value={observaciones}
              onChange={cambiarObservaciones}
              placeholder="Notas para incluir en la proforma"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="ml-auto w-full space-y-1 rounded-xl bg-slate-50 p-4 text-sm sm:w-72">
            <p className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatearPrecio(totales.subtotal)}</span>
            </p>
            <p className="flex justify-between text-slate-600">
              <span>IVA (15 %)</span>
              <span>{formatearPrecio(totales.impuesto)}</span>
            </p>
            <p className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900">
              <span>Total</span>
              <span>{formatearPrecio(totales.total)}</span>
            </p>
          </div>

          {errorFormulario && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorFormulario}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
            {proforma && (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
              >
                <Printer size={16} /> Exportar / PDF
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Preparar proforma
            </button>
          </div>

          {proforma && <VistaProforma proforma={proforma} />}
        </form>
      )}
    </div>
  );
}
