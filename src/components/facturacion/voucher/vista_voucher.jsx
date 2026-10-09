import "./vista_voucher.css";

/**
 * Componente VistaVoucher.
 * Renderiza la plantilla imprimible para minipresoras térmicas (58mm, 80mm) y formato A4.
 *
 * @param {Object} props
 * @param {Object} props.factura - Objeto de la factura seleccionada.
 * @param {string} props.formato - Formato de impresión ("58mm", "80mm", "a4").
 */
export default function VistaVoucher({ factura, formato = "58mm" }) {
  if (!factura) {
    return null;
  }

  // Helper para formateo de números a dos decimales
  const moneda = (valor) => Number(valor).toFixed(2);

  return (
    <article className={`voucher voucher-${formato}`} id="vista-voucher">
      {/* Encabezado del comprobante */}
      <div className="voucher-encabezado">
        <h2>FACTURA DE VENTA</h2>
        <p>Sistema de Repuestos Vehiculares</p>
        <p>Documento demostrativo</p>
      </div>

      <hr />

      {/* Datos informativos de la venta */}
      <div className="voucher-datos">
        <p>
          <strong>Factura:</strong> {factura.numero_factura}
        </p>
        <p>
          <strong>Fecha:</strong> {factura.fecha}
        </p>
        <p>
          <strong>Cliente:</strong> {factura.cliente}
        </p>
        <p>
          <strong>Estado:</strong> {factura.estado}
        </p>
      </div>

      <hr />

      {/* Tabla reducida de ítems */}
      <table className="voucher-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {factura.detalles.map((detalle) => (
            <tr key={detalle.id_producto}>
              <td>
                <span>{detalle.codigo_producto}</span>
                <br />
                {detalle.producto}
                <br />
                <small>Precio: {moneda(detalle.precio_venta)}</small>
              </td>
              <td>{detalle.cantidad}</td>
              <td>{moneda(detalle.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Total general del voucher */}
      <div className="voucher-total">
        <strong>TOTAL</strong>
        <strong>C$ {moneda(factura.total)}</strong>
      </div>

      <hr />

      {/* Pie de página institucional */}
      <div className="voucher-pie">
        <p>Gracias por su compra</p>
        <p>Conserve este comprobante</p>
      </div>
    </article>
  );
}
