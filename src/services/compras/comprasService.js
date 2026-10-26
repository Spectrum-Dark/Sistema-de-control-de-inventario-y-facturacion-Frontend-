import { peticion } from '../compartido/clienteApi';

// Obtiene las compras registradas en el sistema.
export const listarCompras = () => peticion('/compras/listar');

// Consulta los productos que ofrece el proveedor seleccionado.
export const listarProductosPorProveedor = (id) =>
  peticion(`/compras/proveedores/${id}/productos`);

// Registra una compra con su proveedor y detalle de productos.
export const registrarCompra = (datos) =>
  peticion('/compras/registrar', { metodo: 'POST', cuerpo: datos });

// Confirma la compra indicada por su ID.
export const confirmarCompra = (id) =>
  peticion(`/compras/confirmar/${id}`, { metodo: 'POST' });

// Envía los datos de corrección para una compra existente.
export const corregirCompra = (id, datos) =>
  peticion(`/compras/corregir/${id}`, { metodo: 'PUT', cuerpo: datos });
