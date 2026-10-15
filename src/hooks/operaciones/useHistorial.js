
import { useMemo, useState } from "react";

const ventasIniciales = [
  {
    id_venta: 1,
    numero_venta: "VTA-0001",
    fecha_venta: "2026-10-08",
    cliente: "Taller Mecánico El Chino",
    usuario: "Operador",
    total: 2460,
    estado_venta: "Procesada",
    estado_facturacion: "No generada",
    detalles: [
      {
        id_detalle: 1,
        codigo_producto: "REP-001",
        nombre: "Filtro de aceite",
        cantidad: 5,
        precio_venta: 180,
      },
      {
        id_detalle: 2,
        codigo_producto: "REP-002",
        nombre: "Bujía Platino",
        cantidad: 13,
        precio_venta: 120,
      },
    ],
  },
  {
    id_venta: 2,
    numero_venta: "VTA-0002",
    fecha_venta: "2026-10-07",
    cliente: "Distribuidora San José",
    usuario: "Administrador",
    total: 850,
    estado_venta: "Modificada",
    estado_facturacion: "Generada",
    detalles: [
      {
        id_detalle: 3,
        codigo_producto: "REP-003",
        nombre: "Pastillas de freno",
        cantidad: 1,
        precio_venta: 650,
      },
      {
        id_detalle: 4,
        codigo_producto: "REP-004",
        nombre: "Filtro de aire",
        cantidad: 1,
        precio_venta: 200,
      },
    ],
  },
  {
    id_venta: 3,
    numero_venta: "VTA-0003",
    fecha_venta: "2026-10-06",
    cliente: "Cliente de contado",
    usuario: "Operador",
    total: 360,
    estado_venta: "Procesada",
    estado_facturacion: "Generada",
    detalles: [
      {
        id_detalle: 5,
        codigo_producto: "REP-005",
        nombre: "Aceite para motor",
        cantidad: 2,
        precio_venta: 180,
      },
    ],
  },
  {
    id_venta: 4,
    numero_venta: "VTA-0004",
    fecha_venta: "2026-10-05",
    cliente: "Taller Automotriz Central",
    usuario: "Administrador",
    total: 1200,
    estado_venta: "Anulada",
    estado_facturacion: "No generada",
    detalles: [
      {
        id_detalle: 6,
        codigo_producto: "REP-006",
        nombre: "Batería automotriz",
        cantidad: 1,
        precio_venta: 1200,
      },
    ],
  },
  {
    id_venta: 5,
    numero_venta: "VTA-0005",
    fecha_venta: "2026-10-04",
    cliente: "Repuestos del Norte",
    usuario: "Operador",
    total: 540,
    estado_venta: "Reembolsada",
    estado_facturacion: "No generada",
    detalles: [
      {
        id_detalle: 7,
        codigo_producto: "REP-007",
        nombre: "Bujía convencional",
        cantidad: 3,
        precio_venta: 180,
      },
    ],
  },
];

function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function useHistorial() {
  const [busqueda, setBusqueda] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [estadoVenta, setEstadoVenta] = useState("");
  const [estadoFacturacion, setEstadoFacturacion] = useState("");
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const ventasFiltradas = useMemo(() => {
    const termino = normalizarTexto(busqueda);

    return ventasIniciales.filter((venta) => {
      const textoVenta = normalizarTexto(
        `${venta.numero_venta} ${venta.cliente} ${venta.usuario}`,
      );

      return (
        textoVenta.includes(termino) &&
        (!fechaDesde || venta.fecha_venta >= fechaDesde) &&
        (!fechaHasta || venta.fecha_venta <= fechaHasta) &&
        (!estadoVenta || venta.estado_venta === estadoVenta) &&
        (!estadoFacturacion ||
          venta.estado_facturacion === estadoFacturacion)
      );
    });
  }, [
    busqueda,
    fechaDesde,
    fechaHasta,
    estadoVenta,
    estadoFacturacion,
  ]);

  const totalVentas = ventasFiltradas.length;

  const montoTotal = ventasFiltradas.reduce(
    (total, venta) => total + venta.total,
    0,
  );

  const consultarVenta = (venta) => {
    setVentaSeleccionada((actual) =>
      actual?.id_venta === venta.id_venta ? null : venta,
    );
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setFechaDesde("");
    setFechaHasta("");
    setEstadoVenta("");
    setEstadoFacturacion("");
    setVentaSeleccionada(null);
  };

  return {
    ventasFiltradas,
    totalVentas,
    montoTotal,

    busqueda,
    setBusqueda,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    estadoVenta,
    setEstadoVenta,
    estadoFacturacion,
    setEstadoFacturacion,

    ventaSeleccionada,
    consultarVenta,
    limpiarFiltros,
  };
}

export default useHistorial;
