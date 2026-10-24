import { cargarListadoConCache } from "./cacheListados";
import { listarCategorias } from "../categorias/categoriasService";
import { listarMarcas } from "../marcas/marcasService";
import { listarProveedores } from "../proveedores/proveedoresService";
import { listarModelos } from "../modelos/modelosService";
import { listarProductos } from "../productos/productosService";
import { listarCompatibilidades } from "../compatibilidades/compatibilidadesService";
import { listarClientes } from "../clientes/clientesService";
import { listarCompras } from "../compras/comprasService";
import { listarHistorialCompras } from "../compras/historialComprasService";
import { listarVentas } from "../ventas/ventasService";
import { listarHistorialVentas } from "../ventas/historialVentasService";
import { listarMovimientos } from "../inventario/inventarioService";
import { listarFacturas } from "../facturacion/facturasService";
import { listarUsuarios } from "../usuarios/usuariosService";
import {
  obtenerInventarioActual,
  obtenerInventarioStockBajo,
  obtenerMovimientosInventario,
  obtenerReporteCompras,
  obtenerReporteVentas,
  obtenerReporteFacturacion,
  obtenerReporteClientes,
  obtenerReporteProveedores,
  obtenerProductosMasVendidos,
  obtenerReporteFinanciero,
} from "../reportes/reportesService";
import { cargarDatosDashboard } from "../reportes/dashboardService";

// Calienta en memoria las listas principales antes de que el usuario abra la vista.
const cargasPorRuta = {
  "/dashboard": [cargarDatosDashboard],
  "/categorias": [listarCategorias],
  "/marcas": [listarMarcas],
  "/proveedores": [listarProveedores],
  "/modelos": [listarModelos, listarMarcas],
  "/productos": [listarProductos, listarCategorias, listarProveedores],
  "/compatibilidades": [listarCompatibilidades, listarProductos, listarModelos, listarMarcas],
  "/clientes": [listarClientes],
  "/proformas": [listarClientes, listarProductos],
  "/compras": [listarCompras, listarProveedores, listarProductos],
  "/historial-compras": [listarHistorialCompras, listarProveedores, listarProductos],
  "/movimientos-inventario": [listarMovimientos],
  "/ventas": [listarVentas, listarClientes, listarProductos],
  "/historial-ventas": [listarHistorialVentas, listarClientes],
  "/facturacion": [listarFacturas, listarVentas],
  "/usuarios": [listarUsuarios],
  "/reportes/inventario": [obtenerInventarioActual, obtenerInventarioStockBajo, obtenerMovimientosInventario],
  "/reportes/compras": [obtenerReporteCompras],
  "/reportes/ventas": [obtenerReporteVentas, obtenerProductosMasVendidos],
  "/reportes/facturacion": [obtenerReporteFacturacion, obtenerReporteFinanciero],
  "/reportes/catalogos": [obtenerReporteClientes, obtenerReporteProveedores],
};

export function precargarRuta(ruta) {
  const cargas = cargasPorRuta[ruta];
  if (!cargas) return;
  // La precarga nunca bloquea la navegación ni muestra errores de una vista aún cerrada.
  void Promise.allSettled(cargas.map((cargar) => cargarListadoConCache(cargar)));
}
