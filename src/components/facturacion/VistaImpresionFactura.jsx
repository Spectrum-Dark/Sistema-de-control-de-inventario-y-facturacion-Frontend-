import { createPortal } from "react-dom";
import { fechaFactura, precioFactura } from "../../utils/facturacion/formato";
import "./impresionFactura.css";

export default function VistaImpresionFactura({ factura, formato, referencia }) {
  const venta = factura.venta ?? {};
  const cliente = venta.cliente ?? {};
  const detalles = venta.detalles ?? [];
  const formatoAngosto = formato === "58mm";

  return createPortal((
    <article ref={referencia} id="area-impresion-factura" className={`factura-impresion factura-impresion--${formato}`}>
      <header className="factura-impresion__encabezado">
        <h1>FACTURA</h1>
        <p>{factura.numero_factura}</p>
      </header>
      <div className="factura-impresion__datos">
        <p><strong>Fecha de emisión:</strong> {fechaFactura(factura.fecha_emision)}</p>
        <p><strong>Venta:</strong> {venta.numero_venta ?? "—"}</p>
        <p><strong>Cliente:</strong> {cliente.nombre_cliente ?? "—"}</p>
        {cliente.identificacion && <p><strong>Identificación:</strong> {cliente.identificacion}</p>}
      </div>
      <table>
        <thead><tr><th>Producto</th><th>Cant.</th>{!formatoAngosto && <th>Precio</th>}<th>Importe</th></tr></thead>
        <tbody>{detalles.map((detalle, indice) => (
          <tr key={detalle.id_detalle_venta ?? `${detalle.id_producto}-${indice}`}>
            <td>{detalle.producto?.nombre_producto ?? "Producto"}{detalle.producto?.codigo_producto && <small>{detalle.producto.codigo_producto}</small>}</td>
            <td>{detalle.cantidad}</td>
            {!formatoAngosto && <td>{precioFactura(detalle.precio_unitario)}</td>}
            <td>{precioFactura(detalle.subtotal)}</td>
          </tr>
        ))}</tbody>
      </table>
      <section className="factura-impresion__totales">
        <p><span>Subtotal</span><strong>{precioFactura(factura.subtotal)}</strong></p>
        <p><span>Impuesto</span><strong>{precioFactura(factura.impuesto)}</strong></p>
        <p className="factura-impresion__total"><span>Total</span><strong>{precioFactura(factura.total)}</strong></p>
      </section>
      {factura.observaciones && <p className="factura-impresion__observaciones"><strong>Observaciones:</strong> {factura.observaciones}</p>}
      <footer>Estado: {factura.estado}</footer>
    </article>
  ), document.body);
}
