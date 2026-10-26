import { createPortal } from 'react-dom';
import { fechaFactura, precioFactura } from '../../utils/facturacion/formato';
import './impresionFactura.css';

// Componente 'VistaImpresionFactura' que utiliza un Portal de React para renderizar directamente en el body del documento el formato optimizado para impresión de facturas (soporta hojas A4 e impresoras térmicas de 58mm y 80mm).
export default function VistaImpresionFactura({
  factura,
  formato,
  referencia,
}) {
  // Extrae y normaliza de forma segura los datos de la venta, cliente y detalles de productos asociados.
  const venta = factura.venta ?? {};
  const cliente = venta.cliente ?? {};
  const detalles = venta.detalles ?? [];
  const formatoAngosto = formato === '58mm';

  // Utiliza createPortal para montar el contenedor de impresión fuera de la jerarquía normal del modal, garantizando que ocupe todo el ancho y se aísle correctamente al momento de imprimir.
  return createPortal(
    <article
      ref={referencia}
      id="area-impresion-factura"
      className={`factura-impresion factura-impresion--${formato}`}
    >
      {/* Cabecera del documento impreso con el título principal y número de factura */}
      <header className="factura-impresion__encabezado">
        <h1>FACTURA</h1>
        <p>{factura.numero_factura}</p>
      </header>

      {/* Sección con los datos generales, fecha de emisión, venta vinculada y datos del cliente */}
      <div className="factura-impresion__datos">
        <p>
          <strong>Fecha de emisión:</strong>{' '}
          {fechaFactura(factura.fecha_emision)}
        </p>
        <p>
          <strong>Venta:</strong> {venta.numero_venta ?? '—'}
        </p>
        <p>
          <strong>Cliente:</strong> {cliente.nombre_cliente ?? '—'}
        </p>
        {cliente.identificacion && (
          <p>
            <strong>Identificación:</strong> {cliente.identificacion}
          </p>
        )}
      </div>

      {/* Tabla detallada de productos (oculta la columna de precio unitario en formatos de 58mm por espacio reducido) */}
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            {!formatoAngosto && <th>Precio</th>}
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, indice) => (
            <tr
              key={
                detalle.id_detalle_venta ?? `${detalle.id_producto}-${indice}`
              }
            >
              <td>
                {detalle.producto?.nombre_producto ?? 'Producto'}
                {detalle.producto?.codigo_producto && (
                  <small>{detalle.producto.codigo_producto}</small>
                )}
              </td>
              <td>{detalle.cantidad}</td>
              {!formatoAngosto && (
                <td>{precioFactura(detalle.precio_unitario)}</td>
              )}
              <td>{precioFactura(detalle.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sección de totales (subtotal, impuesto y total general de la factura) */}
      <section className="factura-impresion__totales">
        <p>
          <span>Subtotal</span>
          <strong>{precioFactura(factura.subtotal)}</strong>
        </p>
        <p>
          <span>Impuesto</span>
          <strong>{precioFactura(factura.impuesto)}</strong>
        </p>
        <p className="factura-impresion__total">
          <span>Total</span>
          <strong>{precioFactura(factura.total)}</strong>
        </p>
      </section>

      {/* Observaciones adicionales si se encuentran especificadas */}
      {factura.observaciones && (
        <p className="factura-impresion__observaciones">
          <strong>Observaciones:</strong> {factura.observaciones}
        </p>
      )}

      {/* Pie de página con el estado actual del comprobante */}
      <footer>Estado: {factura.estado}</footer>
    </article>,
    document.body
  );
}
