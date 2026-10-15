/*
|--------------------------------------------------------------------------
| DATOS DEMOSTRATIVOS PARA REPORTES
|--------------------------------------------------------------------------
| Fuente temporal para desarrollar y probar los diez reportes.
| Los registros son ficticios y siguen la estructura de MySQL.
|
| En el futuro, los datos se obtendrán mediante la API REST de Laravel.
|--------------------------------------------------------------------------
*/

// -------------------------------------------------------------------------
// CATEGORÍAS
// -------------------------------------------------------------------------

export const categoriasDemo = [
  { id_categoria: 1, nombre_categoria: "Filtros", estado: "Activo" },
  { id_categoria: 2, nombre_categoria: "Frenos", estado: "Activo" },
  { id_categoria: 3, nombre_categoria: "Lubricantes", estado: "Activo" },
  { id_categoria: 4, nombre_categoria: "Suspensión", estado: "Activo" },
  { id_categoria: 5, nombre_categoria: "Encendido", estado: "Activo" },
];

// -------------------------------------------------------------------------
// USUARIOS
// -------------------------------------------------------------------------

export const usuariosDemo = [
  {
    id_usuario: 1,
    nombre: "Administrador",
    apellido: "Demostrativo",
    nombre_usuario: "admin_demo",
    estado: "Activo",
    id_rol: 1,
  },
  {
    id_usuario: 2,
    nombre: "Operador",
    apellido: "Uno",
    nombre_usuario: "operador_uno_demo",
    estado: "Activo",
    id_rol: 2,
  },
  {
    id_usuario: 3,
    nombre: "Operador",
    apellido: "Dos",
    nombre_usuario: "operador_dos_demo",
    estado: "Activo",
    id_rol: 2,
  },
];

// -------------------------------------------------------------------------
// PROVEEDORES
// -------------------------------------------------------------------------

export const proveedoresDemo = [
  {
    id_proveedor: 1,
    nombre_proveedor: "Proveedor demostrativo uno",
    estado: "Activo",
  },
  {
    id_proveedor: 2,
    nombre_proveedor: "Proveedor demostrativo dos",
    estado: "Activo",
  },
];

// -------------------------------------------------------------------------
// CLIENTES
// -------------------------------------------------------------------------

export const clientesDemo = [
  {
    id_cliente: 1,
    nombre_cliente: "Cliente",
    apellido_cliente: "Uno",
    numero_identificacion: "DEMO-CLI-001",
    estado: "Activo",
  },
  {
    id_cliente: 2,
    nombre_cliente: "Cliente",
    apellido_cliente: "Dos",
    numero_identificacion: "DEMO-CLI-002",
    estado: "Activo",
  },
  {
    id_cliente: 3,
    nombre_cliente: "Cliente",
    apellido_cliente: "Tres",
    numero_identificacion: "DEMO-CLI-003",
    estado: "Activo",
  },
];

// -------------------------------------------------------------------------
// PRODUCTOS
// -------------------------------------------------------------------------

export const productosDemo = [
  {
    id_producto: 1,
    codigo_producto: "REP-001",
    nombre_producto: "Filtro de aceite",
    descripcion: "Filtro de aceite demostrativo",
    id_categoria: 1,
    precio_compra: 100,
    precio_venta: 180,
    existencia_actual: 12,
    existencia_minima: 5,
    existencia_maxima: 30,
    estado: "Activo",
  },
  {
    id_producto: 2,
    codigo_producto: "REP-002",
    nombre_producto: "Bujía",
    descripcion: "Bujía demostrativa",
    id_categoria: 5,
    precio_compra: 60,
    precio_venta: 120,
    existencia_actual: 8,
    existencia_minima: 5,
    existencia_maxima: 25,
    estado: "Activo",
  },
  {
    id_producto: 3,
    codigo_producto: "REP-003",
    nombre_producto: "Pastillas de freno",
    descripcion: "Pastillas de freno demostrativas",
    id_categoria: 2,
    precio_compra: 400,
    precio_venta: 650,
    existencia_actual: 4,
    existencia_minima: 5,
    existencia_maxima: 20,
    estado: "Activo",
  },
  {
    id_producto: 4,
    codigo_producto: "REP-004",
    nombre_producto: "Aceite de motor",
    descripcion: "Aceite de motor demostrativo",
    id_categoria: 3,
    precio_compra: 150,
    precio_venta: 225,
    existencia_actual: 15,
    existencia_minima: 5,
    existencia_maxima: 40,
    estado: "Activo",
  },
  {
    id_producto: 5,
    codigo_producto: "REP-005",
    nombre_producto: "Amortiguador",
    descripcion: "Amortiguador demostrativo",
    id_categoria: 4,
    precio_compra: 250,
    precio_venta: 400,
    existencia_actual: 2,
    existencia_minima: 4,
    existencia_maxima: 15,
    estado: "Activo",
  },
];

// -------------------------------------------------------------------------
// COMPRAS
// -------------------------------------------------------------------------

export const comprasDemo = [
  {
    id_compra: 1,
    numero_compra: "COM-0001",
    fecha_compra: "2026-09-30",
    id_proveedor: 1,
    id_usuario: 2,
    subtotal: 800,
    impuesto: 0,
    total: 800,
    estado: "Registrada",
  },
  {
    id_compra: 2,
    numero_compra: "COM-0002",
    fecha_compra: "2026-10-04",
    id_proveedor: 2,
    id_usuario: 2,
    subtotal: 1500,
    impuesto: 0,
    total: 1500,
    estado: "Registrada",
  },
  {
    id_compra: 3,
    numero_compra: "COM-0003",
    fecha_compra: "2026-10-02",
    id_proveedor: 1,
    id_usuario: 3,
    subtotal: 800,
    impuesto: 0,
    total: 800,
    estado: "Registrada",
  },
];

// -------------------------------------------------------------------------
// DETALLES DE COMPRAS
// -------------------------------------------------------------------------

export const detallesComprasDemo = [
  {
    id_detalle_compra: 1,
    id_compra: 1,
    id_producto: 1,
    cantidad: 5,
    precio_unitario: 100,
    subtotal: 500,
  },
  {
    id_detalle_compra: 2,
    id_compra: 1,
    id_producto: 2,
    cantidad: 5,
    precio_unitario: 60,
    subtotal: 300,
  },
  {
    id_detalle_compra: 3,
    id_compra: 2,
    id_producto: 4,
    cantidad: 10,
    precio_unitario: 150,
    subtotal: 1500,
  },
  {
    id_detalle_compra: 4,
    id_compra: 3,
    id_producto: 3,
    cantidad: 2,
    precio_unitario: 400,
    subtotal: 800,
  },
];

// -------------------------------------------------------------------------
// VENTAS
// -------------------------------------------------------------------------

export const ventasDemo = [
  {
    id_venta: 1,
    numero_venta: "VEN-0001",
    fecha_venta: "2026-10-01",
    id_cliente: 1,
    id_usuario: 2,
    subtotal: 300,
    descuento: 0,
    impuesto: 0,
    total: 300,
    estado: "Registrada",
  },
  {
    id_venta: 2,
    numero_venta: "VEN-0002",
    fecha_venta: "2026-10-03",
    id_cliente: 2,
    id_usuario: 2,
    subtotal: 650,
    descuento: 0,
    impuesto: 0,
    total: 650,
    estado: "Registrada",
  },
  {
    id_venta: 3,
    numero_venta: "VEN-0003",
    fecha_venta: "2026-10-05",
    id_cliente: 1,
    id_usuario: 3,
    subtotal: 450,
    descuento: 0,
    impuesto: 0,
    total: 450,
    estado: "Registrada",
  },
  {
    id_venta: 4,
    numero_venta: "VEN-0004",
    fecha_venta: "2026-10-08",
    id_cliente: 3,
    id_usuario: 3,
    subtotal: 800,
    descuento: 0,
    impuesto: 0,
    total: 800,
    estado: "Registrada",
  },
];

// -------------------------------------------------------------------------
// DETALLES DE VENTAS
// -------------------------------------------------------------------------

export const detallesVentasDemo = [
  {
    id_detalle_venta: 1,
    id_venta: 1,
    id_producto: 1,
    cantidad: 1,
    precio_unitario: 180,
    descuento: 0,
    subtotal: 180,
  },
  {
    id_detalle_venta: 2,
    id_venta: 1,
    id_producto: 2,
    cantidad: 1,
    precio_unitario: 120,
    descuento: 0,
    subtotal: 120,
  },
  {
    id_detalle_venta: 3,
    id_venta: 2,
    id_producto: 3,
    cantidad: 1,
    precio_unitario: 650,
    descuento: 0,
    subtotal: 650,
  },
  {
    id_detalle_venta: 4,
    id_venta: 3,
    id_producto: 4,
    cantidad: 2,
    precio_unitario: 225,
    descuento: 0,
    subtotal: 450,
  },
  {
    id_detalle_venta: 5,
    id_venta: 4,
    id_producto: 5,
    cantidad: 2,
    precio_unitario: 400,
    descuento: 0,
    subtotal: 800,
  },
];

// -------------------------------------------------------------------------
// MOVIMIENTOS DE INVENTARIO
// -------------------------------------------------------------------------

export const movimientosInventarioDemo = [
  {
    id_movimiento: 1,
    id_producto: 1,
    tipo_movimiento: "Compra",
    cantidad: 5,
    existencia_anterior: 8,
    existencia_resultante: 13,
    referencia_operacion: "COM-0001",
    id_usuario: 2,
    fecha_movimiento: "2026-09-30T09:00:00",
    observacion: "Entrada demostrativa por compra",
  },
  {
    id_movimiento: 2,
    id_producto: 2,
    tipo_movimiento: "Compra",
    cantidad: 5,
    existencia_anterior: 4,
    existencia_resultante: 9,
    referencia_operacion: "COM-0001",
    id_usuario: 2,
    fecha_movimiento: "2026-09-30T09:05:00",
    observacion: "Entrada demostrativa por compra",
  },
  {
    id_movimiento: 3,
    id_producto: 1,
    tipo_movimiento: "Venta",
    cantidad: 1,
    existencia_anterior: 13,
    existencia_resultante: 12,
    referencia_operacion: "VEN-0001",
    id_usuario: 2,
    fecha_movimiento: "2026-10-01T10:00:00",
    observacion: "Salida demostrativa por venta",
  },
  {
    id_movimiento: 4,
    id_producto: 2,
    tipo_movimiento: "Venta",
    cantidad: 1,
    existencia_anterior: 9,
    existencia_resultante: 8,
    referencia_operacion: "VEN-0001",
    id_usuario: 2,
    fecha_movimiento: "2026-10-01T10:00:00",
    observacion: "Salida demostrativa por venta",
  },
  {
    id_movimiento: 5,
    id_producto: 3,
    tipo_movimiento: "Compra",
    cantidad: 2,
    existencia_anterior: 3,
    existencia_resultante: 5,
    referencia_operacion: "COM-0003",
    id_usuario: 3,
    fecha_movimiento: "2026-10-02T09:00:00",
    observacion: "Entrada demostrativa por compra",
  },
  {
    id_movimiento: 6,
    id_producto: 3,
    tipo_movimiento: "Venta",
    cantidad: 1,
    existencia_anterior: 5,
    existencia_resultante: 4,
    referencia_operacion: "VEN-0002",
    id_usuario: 2,
    fecha_movimiento: "2026-10-03T11:00:00",
    observacion: "Salida demostrativa por venta",
  },
  {
    id_movimiento: 7,
    id_producto: 4,
    tipo_movimiento: "Compra",
    cantidad: 10,
    existencia_anterior: 7,
    existencia_resultante: 17,
    referencia_operacion: "COM-0002",
    id_usuario: 2,
    fecha_movimiento: "2026-10-04T09:00:00",
    observacion: "Entrada demostrativa por compra",
  },
  {
    id_movimiento: 8,
    id_producto: 4,
    tipo_movimiento: "Venta",
    cantidad: 2,
    existencia_anterior: 17,
    existencia_resultante: 15,
    referencia_operacion: "VEN-0003",
    id_usuario: 3,
    fecha_movimiento: "2026-10-05T12:00:00",
    observacion: "Salida demostrativa por venta",
  },
  {
    id_movimiento: 9,
    id_producto: 5,
    tipo_movimiento: "Venta",
    cantidad: 2,
    existencia_anterior: 4,
    existencia_resultante: 2,
    referencia_operacion: "VEN-0004",
    id_usuario: 3,
    fecha_movimiento: "2026-10-08T14:00:00",
    observacion: "Salida demostrativa por venta",
  },
];

// -------------------------------------------------------------------------
// FACTURAS
// -------------------------------------------------------------------------

export const facturasDemo = [
  {
    id_factura: 1,
    numero_factura: "FAC-0001",
    id_venta: 1,
    fecha_emision: "2026-10-01",
    subtotal: 300,
    descuento: 0,
    impuesto: 0,
    total: 300,
    estado: "Emitida",
  },
  {
    id_factura: 2,
    numero_factura: "FAC-0002",
    id_venta: 2,
    fecha_emision: "2026-10-03",
    subtotal: 650,
    descuento: 0,
    impuesto: 0,
    total: 650,
    estado: "Emitida",
  },
  {
    id_factura: 3,
    numero_factura: "FAC-0003",
    id_venta: 3,
    fecha_emision: "2026-10-05",
    subtotal: 450,
    descuento: 0,
    impuesto: 0,
    total: 450,
    estado: "Emitida",
  },
  {
    id_factura: 4,
    numero_factura: "FAC-0004",
    id_venta: 4,
    fecha_emision: "2026-10-08",
    subtotal: 800,
    descuento: 0,
    impuesto: 0,
    total: 800,
    estado: "Emitida",
  },
];

// -------------------------------------------------------------------------
// EXPORTACIÓN AGRUPADA DE LOS DATOS
// -------------------------------------------------------------------------

const datosReportes = {
  categorias: categoriasDemo,
  usuarios: usuariosDemo,
  proveedores: proveedoresDemo,
  clientes: clientesDemo,
  productos: productosDemo,
  compras: comprasDemo,
  detallesCompras: detallesComprasDemo,
  ventas: ventasDemo,
  detallesVentas: detallesVentasDemo,
  movimientosInventario: movimientosInventarioDemo,
  facturas: facturasDemo,
};

export default datosReportes;
