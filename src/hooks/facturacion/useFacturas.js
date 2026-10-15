import { useMemo, useState } from "react";

// ============================================================
// FACTURAS DE PRUEBA
// Datos temporales para desarrollar y probar el módulo.
// Posteriormente se obtendrán desde la API REST de Laravel.
// ============================================================

const facturasPrueba = [
  {
    id_factura: 1,
    numero_factura: "FAC-0001",
    fecha: "2026-10-01",
    cliente: "Cliente Contado / Venta Rápida",
    total: 300,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 1,
        codigo_producto: "REP-001",
        producto: "Filtro de aceite",
        cantidad: 1,
        precio_venta: 180,
        subtotal: 180,
      },
      {
        id_producto: 2,
        codigo_producto: "REP-002",
        producto: "Bujía Platino",
        cantidad: 1,
        precio_venta: 120,
        subtotal: 120,
      },
    ],
  },
  {
    id_factura: 2,
    numero_factura: "FAC-0002",
    fecha: "2026-10-02",
    cliente: "Taller Mecánico El Chino",
    total: 650,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 3,
        codigo_producto: "REP-003",
        producto: "Pastillas de freno",
        cantidad: 1,
        precio_venta: 650,
        subtotal: 650,
      },
    ],
  },
  {
    id_factura: 3,
    numero_factura: "FAC-0003",
    fecha: "2026-10-02",
    cliente: "Distribuidora San José",
    total: 1280,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 4,
        codigo_producto: "REP-004",
        producto: "Aceite de Motor 20W50",
        cantidad: 2,
        precio_venta: 280,
        subtotal: 560,
      },
      {
        id_producto: 9,
        codigo_producto: "REP-009",
        producto: "Cadena de transmisión",
        cantidad: 1,
        precio_venta: 720,
        subtotal: 720,
      },
    ],
  },
  {
    id_factura: 4,
    numero_factura: "FAC-0004",
    fecha: "2026-10-03",
    cliente: "Bryan MQ",
    total: 1200,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 5,
        codigo_producto: "REP-005",
        producto: "Disco de freno delantero",
        cantidad: 1,
        precio_venta: 1200,
        subtotal: 1200,
      },
    ],
  },
  {
    id_factura: 5,
    numero_factura: "FAC-0005",
    fecha: "2026-10-03",
    cliente: "Autorepuestos El Chino",
    total: 850,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 6,
        codigo_producto: "REP-006",
        producto: "Amortiguador trasero",
        cantidad: 1,
        precio_venta: 850,
        subtotal: 850,
      },
    ],
  },
  {
    id_factura: 6,
    numero_factura: "FAC-0006",
    fecha: "2026-10-04",
    cliente: "Cliente Contado / Venta Rápida",
    total: 320,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 7,
        codigo_producto: "REP-007",
        producto: "Filtro de aire alto flujo",
        cantidad: 1,
        precio_venta: 320,
        subtotal: 320,
      },
    ],
  },
  {
    id_factura: 7,
    numero_factura: "FAC-0007",
    fecha: "2026-10-04",
    cliente: "Taller Hermanos López",
    total: 1450,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 8,
        codigo_producto: "REP-008",
        producto: "Batería Gel 12V",
        cantidad: 1,
        precio_venta: 1450,
        subtotal: 1450,
      },
    ],
  },
  {
    id_factura: 8,
    numero_factura: "FAC-0008",
    fecha: "2026-10-05",
    cliente: "Inversiones del Pacífico",
    total: 1600,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 10,
        codigo_producto: "REP-010",
        producto: "Kit de arrastre completo",
        cantidad: 1,
        precio_venta: 1600,
        subtotal: 1600,
      },
    ],
  },
  {
    id_factura: 9,
    numero_factura: "FAC-0009",
    fecha: "2026-10-05",
    cliente: "Carlos Mendoza",
    total: 450,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 11,
        codigo_producto: "REP-011",
        producto: "Líquido de frenos DOT4",
        cantidad: 3,
        precio_venta: 150,
        subtotal: 450,
      },
    ],
  },
  {
    id_factura: 10,
    numero_factura: "FAC-0010",
    fecha: "2026-10-06",
    cliente: "Cliente Contado / Venta Rápida",
    total: 950,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 12,
        codigo_producto: "REP-012",
        producto: "Faro delantero LED",
        cantidad: 1,
        precio_venta: 950,
        subtotal: 950,
      },
    ],
  },
  {
    id_factura: 11,
    numero_factura: "FAC-0011",
    fecha: "2026-10-06",
    cliente: "Servicio Técnico Express",
    total: 1850,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 13,
        codigo_producto: "REP-013",
        producto: "Llanta 110/90-17",
        cantidad: 1,
        precio_venta: 1850,
        subtotal: 1850,
      },
    ],
  },
  {
    id_factura: 12,
    numero_factura: "FAC-0012",
    fecha: "2026-10-07",
    cliente: "Mecanica General Rivas",
    total: 320,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 14,
        codigo_producto: "REP-014",
        producto: "Cámara neumático 3.00-18",
        cantidad: 2,
        precio_venta: 160,
        subtotal: 320,
      },
    ],
  },
  {
    id_factura: 13,
    numero_factura: "FAC-0013",
    fecha: "2026-10-07",
    cliente: "Cliente Contado / Venta Rápida",
    total: 1100,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 15,
        codigo_producto: "REP-015",
        producto: "Carburador PZ30 Racing",
        cantidad: 1,
        precio_venta: 1100,
        subtotal: 1100,
      },
    ],
  },
  {
    id_factura: 14,
    numero_factura: "FAC-0014",
    fecha: "2026-10-07",
    cliente: "Transportes Chichigalpa",
    total: 260,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 16,
        codigo_producto: "REP-016",
        producto: "Cable de embrague",
        cantidad: 2,
        precio_venta: 130,
        subtotal: 260,
      },
    ],
  },
  {
    id_factura: 15,
    numero_factura: "FAC-0015",
    fecha: "2026-10-08",
    cliente: "Taller El Impacto",
    total: 340,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 19,
        codigo_producto: "REP-019",
        producto: "Kit de anillos para pistón",
        cantidad: 1,
        precio_venta: 340,
        subtotal: 340,
      },
    ],
  },
  {
    id_factura: 16,
    numero_factura: "FAC-0016",
    fecha: "2026-10-08",
    cliente: "Cliente Contado / Venta Rápida",
    total: 580,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 21,
        codigo_producto: "REP-021",
        producto: "Banda de freno trasera",
        cantidad: 2,
        precio_venta: 290,
        subtotal: 580,
      },
    ],
  },
  {
    id_factura: 17,
    numero_factura: "FAC-0017",
    fecha: "2026-10-08",
    cliente: "Repuestos Velásquez",
    total: 420,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 22,
        codigo_producto: "REP-022",
        producto: "Espejo retrovisor deportivo",
        cantidad: 1,
        precio_venta: 420,
        subtotal: 420,
      },
    ],
  },
  {
    id_factura: 18,
    numero_factura: "FAC-0018",
    fecha: "2026-10-09",
    cliente: "Roberto Juárez",
    total: 280,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 24,
        codigo_producto: "REP-024",
        producto: "Puños universales de goma",
        cantidad: 2,
        precio_venta: 140,
        subtotal: 280,
      },
    ],
  },
  {
    id_factura: 19,
    numero_factura: "FAC-0019",
    fecha: "2026-10-09",
    cliente: "Taller Mecánico El Chino",
    total: 530,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 25,
        codigo_producto: "REP-025",
        producto: "Regulador de voltaje 12V",
        cantidad: 1,
        precio_venta: 530,
        subtotal: 530,
      },
    ],
  },
  {
    id_factura: 20,
    numero_factura: "FAC-0020",
    fecha: "2026-10-09",
    cliente: "Cliente Contado / Venta Rápida",
    total: 480,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 26,
        codigo_producto: "REP-026",
        producto: "CDI alto rendimiento",
        cantidad: 1,
        precio_venta: 480,
        subtotal: 480,
      },
    ],
  },
  {
    id_factura: 21,
    numero_factura: "FAC-0021",
    fecha: "2026-10-09",
    cliente: "Taller Central",
    total: 310,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 27,
        codigo_producto: "REP-027",
        producto: "Bobina de encendido",
        cantidad: 1,
        precio_venta: 310,
        subtotal: 310,
      },
    ],
  },
  {
    id_factura: 22,
    numero_factura: "FAC-0022",
    fecha: "2026-10-09",
    cliente: "Bryan MQ",
    total: 1980,
    estado: "Emitida",
    detalles: [
      {
        id_producto: 30,
        codigo_producto: "REP-030",
        producto: "Llanta 90/90-19 Doble Propósito",
        cantidad: 1,
        precio_venta: 1980,
        subtotal: 1980,
      },
    ],
  },
];

// ============================================================
// UTILIDAD PARA BUSCAR SIN DIFERENCIAR MAYÚSCULAS NI TILDES
// ============================================================

function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ============================================================
// HOOK PRINCIPAL DE FACTURACIÓN
// ============================================================

export default function useFacturas() {
  const [busqueda, setBusquedaInterna] = useState("");
  const [fechaDesde, setFechaDesdeInterna] = useState("");
  const [fechaHasta, setFechaHastaInterna] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const elementosPorPagina = 10;

  // Filtrar por número de factura, cliente y fechas.
  const facturasFiltradas = useMemo(() => {
    const texto = normalizarTexto(busqueda);

    return facturasPrueba.filter((factura) => {
      const coincideBusqueda = [factura.numero_factura, factura.cliente].some(
        (campo) => normalizarTexto(campo).includes(texto),
      );

      const coincideFechaDesde = !fechaDesde || factura.fecha >= fechaDesde;

      const coincideFechaHasta = !fechaHasta || factura.fecha <= fechaHasta;

      return coincideBusqueda && coincideFechaDesde && coincideFechaHasta;
    });
  }, [busqueda, fechaDesde, fechaHasta]);

  // Calcular páginas según el resultado de los filtros.
  const totalRegistros = facturasFiltradas.length;
  const totalPaginas = Math.ceil(totalRegistros / elementosPorPagina) || 1;

  // Evitar que la página actual supere las páginas disponibles.
  const paginaSegura = Math.min(paginaActual, totalPaginas);

  const facturasPaginadas = useMemo(() => {
    const inicio = (paginaSegura - 1) * elementosPorPagina;

    return facturasFiltradas.slice(inicio, inicio + elementosPorPagina);
  }, [facturasFiltradas, paginaSegura]);

  // Seleccionar una factura o cerrar su detalle.
  function consultarFactura(factura) {
    setFacturaSeleccionada(factura);
  }

  // Actualizar búsqueda y volver a la primera página.
  function setBusqueda(valor) {
    setBusquedaInterna(valor);
    setPaginaActual(1);
  }

  function setFechaDesde(valor) {
    setFechaDesdeInterna(valor);
    setPaginaActual(1);
  }

  function setFechaHasta(valor) {
    setFechaHastaInterna(valor);
    setPaginaActual(1);
  }

  // Limpiar todos los filtros y la selección actual.
  function limpiarFiltros() {
    setBusquedaInterna("");
    setFechaDesdeInterna("");
    setFechaHastaInterna("");
    setFacturaSeleccionada(null);
    setPaginaActual(1);
  }

  // Cambiar de página respetando los límites.
  function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  }

  return {
    facturas: facturasPaginadas,
    totalRegistros,
    paginaActual: paginaSegura,
    totalPaginas,
    busqueda,
    fechaDesde,
    fechaHasta,
    facturaSeleccionada,
    setBusqueda,
    setFechaDesde,
    setFechaHasta,
    consultarFactura,
    limpiarFiltros,
    cambiarPagina,
  };
}
