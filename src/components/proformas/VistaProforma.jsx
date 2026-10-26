import { createPortal } from 'react-dom';
import { formatearFechaHora } from '../../utils/compartido/fecha';
import { formatearPrecio } from '../../utils/productos/formato';
import './proforma.css';

// Componente de renderizado aislado 'VistaProforma' que utiliza React Portals para inyectar la estructura de la cotización directamente en el cuerpo del documento (document.body), optimizando su formato exclusivo para impresión y exportación A4.
export default function VistaProforma({ proforma }) {
  return createPortal(
    <article id="area-impresion-proforma" className="proforma-impresion">
      {/* Cabecera de la proforma: título principal, subtítulo y metadatos de la fecha de emisión formateados */}
      <header className="proforma-impresion__encabezado">
        <div>
          <h1>PROFORMA</h1>
          <p>Cotización de productos</p>
        </div>
        <div className="proforma-impresion__fecha">
          <span>Fecha de emisión</span>
          <strong>
            {formatearFechaHora(proforma.fecha, { hora12: true })}
          </strong>
        </div>
      </header>

      {/* Sección con la información general y de identificación del cliente */}
      <section className="proforma-impresion__cliente">
        <h2>Cliente</h2>
        <p>{proforma.cliente.nombre_cliente}</p>
        {proforma.cliente.identificacion && (
          <p>Identificación: {proforma.cliente.identificacion}</p>
        )}
      </section>

      {/* Tabla detallada de ítems, cantidades, precios unitarios y subtotales cotizados */}
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {proforma.detalles.map((detalle, indice) => (
            <tr key={`${detalle.codigo}-${indice}`}>
              <td>
                <strong>{detalle.nombre}</strong>
                {detalle.codigo && <small>{detalle.codigo}</small>}
              </td>
              <td>{detalle.cantidad}</td>
              <td>{formatearPrecio(detalle.precioUnitario)}</td>
              <td>{formatearPrecio(detalle.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bloque de totales: subtotal, desglose de impuesto (IVA 15%) y total general en córdobas */}
      <section className="proforma-impresion__totales">
        <p>
          <span>Subtotal</span>
          <strong>{formatearPrecio(proforma.subtotal)}</strong>
        </p>
        <p>
          <span>IVA (15 %)</span>
          <strong>{formatearPrecio(proforma.impuesto)}</strong>
        </p>
        <p className="proforma-impresion__total">
          <span>Total</span>
          <strong>{formatearPrecio(proforma.total)}</strong>
        </p>
      </section>

      {/* Sección condicional para notas u observaciones adicionales de la cotización */}
      {proforma.observaciones && (
        <section className="proforma-impresion__observaciones">
          <h2>Observaciones</h2>
          <p>{proforma.observaciones}</p>
        </section>
      )}

      {/* Pie de página con aclaratoria legal/operativa de la proforma */}
      <footer>
        Documento de cotización. No registra una venta ni modifica el
        inventario.
      </footer>
    </article>,
    document.body
  );
}
