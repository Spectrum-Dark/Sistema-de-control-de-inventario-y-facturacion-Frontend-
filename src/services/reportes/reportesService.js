import { peticion } from '../compartido/clienteApi';

// Obtiene el estado actual de existencias.
export const obtenerInventarioActual = () =>
  peticion('/reportes/inventario/actual');

// Obtiene los productos cuyo nivel de existencias es bajo.
export const obtenerInventarioStockBajo = () =>
  peticion('/reportes/inventario/stock-bajo');

// Solicita movimientos de inventario aplicando los filtros recibidos.
export const obtenerMovimientosInventario = (filtros = {}) =>
  peticion('/reportes/inventario/movimientos', {
    metodo: 'POST',
    cuerpo: filtros,
  });

// Solicita el reporte de compras con los filtros seleccionados.
export const obtenerReporteCompras = (filtros = {}) =>
  peticion('/reportes/compras', { metodo: 'POST', cuerpo: filtros });

// Solicita el reporte de ventas con los filtros seleccionados.
export const obtenerReporteVentas = (filtros = {}) =>
  peticion('/reportes/ventas', { metodo: 'POST', cuerpo: filtros });

// Solicita el reporte de facturación con los filtros seleccionados.
export const obtenerReporteFacturacion = (filtros = {}) =>
  peticion('/reportes/facturacion', { metodo: 'POST', cuerpo: filtros });

// Obtiene los indicadores generales de clientes.
export const obtenerReporteClientes = () => peticion('/reportes/clientes');

// Obtiene los indicadores generales de proveedores.
export const obtenerReporteProveedores = () =>
  peticion('/reportes/proveedores');

// Solicita los productos más vendidos para el periodo indicado.
export const obtenerProductosMasVendidos = (filtros = {}) =>
  peticion('/reportes/productos/mas-vendidos', {
    metodo: 'POST',
    cuerpo: filtros,
  });

// Solicita el resumen financiero con los filtros seleccionados.
export const obtenerReporteFinanciero = (filtros = {}) =>
  peticion('/reportes/financiero', { metodo: 'POST', cuerpo: filtros });
