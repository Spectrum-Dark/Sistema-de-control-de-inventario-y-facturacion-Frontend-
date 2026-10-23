import { peticion } from "../compartido/clienteApi";

export const obtenerInventarioActual = () =>
  peticion("/reportes/inventario/actual");

export const obtenerInventarioStockBajo = () =>
  peticion("/reportes/inventario/stock-bajo");

export const obtenerMovimientosInventario = (filtros = {}) =>
  peticion("/reportes/inventario/movimientos", { metodo: "POST", cuerpo: filtros });

export const obtenerReporteCompras = (filtros = {}) =>
  peticion("/reportes/compras", { metodo: "POST", cuerpo: filtros });

export const obtenerReporteVentas = (filtros = {}) =>
  peticion("/reportes/ventas", { metodo: "POST", cuerpo: filtros });

export const obtenerReporteFacturacion = (filtros = {}) =>
  peticion("/reportes/facturacion", { metodo: "POST", cuerpo: filtros });

export const obtenerReporteClientes = () =>
  peticion("/reportes/clientes");

export const obtenerReporteProveedores = () =>
  peticion("/reportes/proveedores");

export const obtenerProductosMasVendidos = (filtros = {}) =>
  peticion("/reportes/productos/mas-vendidos", { metodo: "POST", cuerpo: filtros });

export const obtenerReporteFinanciero = (filtros = {}) =>
  peticion("/reportes/financiero", { metodo: "POST", cuerpo: filtros });
