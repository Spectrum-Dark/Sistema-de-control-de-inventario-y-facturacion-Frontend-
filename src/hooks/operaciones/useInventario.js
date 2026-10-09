import { useMemo, useState } from "react";

// Datos de prueba ampliados
const productosPrueba = [
  {
    id_producto: 1,
    codigo_producto: "REP-001",
    nombre: "Filtro de aceite",
    categoria: "Filtros",
    existencia_actual: 25,
    existencia_minima: 10,
    existencia_maxima: 50,
  },
  {
    id_producto: 2,
    codigo_producto: "REP-002",
    nombre: "Bujía Platino",
    categoria: "Encendido",
    existencia_actual: 5,
    existencia_minima: 10,
    existencia_maxima: 100,
  },
  {
    id_producto: 3,
    codigo_producto: "REP-003",
    nombre: "Pastillas de freno",
    categoria: "Frenos",
    existencia_actual: 0,
    existencia_minima: 5,
    existencia_maxima: 30,
  },
  {
    id_producto: 4,
    codigo_producto: "REP-004",
    nombre: "Aceite de Motor 20W50",
    categoria: "Lubricantes",
    existencia_actual: 40,
    existencia_minima: 15,
    existencia_maxima: 80,
  },
  {
    id_producto: 5,
    codigo_producto: "REP-005",
    nombre: "Disco de Freno Delantero",
    categoria: "Frenos",
    existencia_actual: 8,
    existencia_minima: 10,
    existencia_maxima: 25,
  },
  {
    id_producto: 6,
    codigo_producto: "REP-006",
    nombre: "Amortiguador Trasero",
    categoria: "Suspensión",
    existencia_actual: 12,
    existencia_minima: 6,
    existencia_maxima: 20,
  },
  {
    id_producto: 7,
    codigo_producto: "REP-007",
    nombre: "Filtro de Aire",
    categoria: "Filtros",
    existencia_actual: 18,
    existencia_minima: 8,
    existencia_maxima: 40,
  },
  {
    id_producto: 8,
    codigo_producto: "REP-008",
    nombre: "Batería 12V 12Ah",
    categoria: "Eléctrico",
    existencia_actual: 4,
    existencia_minima: 5,
    existencia_maxima: 15,
  },
  {
    id_producto: 9,
    codigo_producto: "REP-009",
    nombre: "Cadena de Transmisión 520H",
    categoria: "Tracción",
    existencia_actual: 15,
    existencia_minima: 5,
    existencia_maxima: 30,
  },
  {
    id_producto: 10,
    codigo_producto: "REP-010",
    nombre: "Kit de Arrastre",
    categoria: "Tracción",
    existencia_actual: 7,
    existencia_minima: 4,
    existencia_maxima: 15,
  },
  {
    id_producto: 11,
    codigo_producto: "REP-011",
    nombre: "Líquido de Frenos DOT4",
    categoria: "Fluidos",
    existencia_actual: 30,
    existencia_minima: 10,
    existencia_maxima: 60,
  },
  {
    id_producto: 12,
    codigo_producto: "REP-012",
    nombre: "Faro Delantero LED",
    categoria: "Iluminación",
    existencia_actual: 0,
    existencia_minima: 3,
    existencia_maxima: 10,
  },
];

const movimientosPrueba = [
  {
    id: 1,
    codigo_producto: "REP-001",
    producto: "Filtro de aceite",
    tipo: "Entrada",
    cantidad: 30,
    fecha: "2026-10-01",
    referencia: "Compra CMP-001",
  },
  {
    id: 2,
    codigo_producto: "REP-001",
    producto: "Filtro de aceite",
    tipo: "Salida",
    cantidad: 5,
    fecha: "2026-10-02",
    referencia: "Venta VNT-014",
  },
  {
    id: 3,
    codigo_producto: "REP-002",
    producto: "Bujía Platino",
    tipo: "Entrada",
    cantidad: 20,
    fecha: "2026-10-02",
    referencia: "Compra CMP-001",
  },
  {
    id: 4,
    codigo_producto: "REP-002",
    producto: "Bujía Platino",
    tipo: "Salida",
    cantidad: 15,
    fecha: "2026-10-03",
    referencia: "Venta VNT-018",
  },
  {
    id: 5,
    codigo_producto: "REP-003",
    producto: "Pastillas de freno",
    tipo: "Entrada",
    cantidad: 10,
    fecha: "2026-10-03",
    referencia: "Compra CMP-002",
  },
  {
    id: 6,
    codigo_producto: "REP-003",
    producto: "Pastillas de freno",
    tipo: "Salida",
    cantidad: 10,
    fecha: "2026-10-04",
    referencia: "Venta VNT-022",
  },
  {
    id: 7,
    codigo_producto: "REP-004",
    producto: "Aceite de Motor 20W50",
    tipo: "Entrada",
    cantidad: 50,
    fecha: "2026-10-04",
    referencia: "Compra CMP-003",
  },
  {
    id: 8,
    codigo_producto: "REP-004",
    producto: "Aceite de Motor 20W50",
    tipo: "Salida",
    cantidad: 10,
    fecha: "2026-10-05",
    referencia: "Venta VNT-025",
  },
  {
    id: 9,
    codigo_producto: "REP-005",
    producto: "Disco de Freno Delantero",
    tipo: "Entrada",
    cantidad: 12,
    fecha: "2026-10-05",
    referencia: "Compra CMP-003",
  },
  {
    id: 10,
    codigo_producto: "REP-005",
    producto: "Disco de Freno Delantero",
    tipo: "Salida",
    cantidad: 4,
    fecha: "2026-10-06",
    referencia: "Venta VNT-029",
  },
  {
    id: 11,
    codigo_producto: "REP-006",
    producto: "Amortiguador Trasero",
    tipo: "Entrada",
    cantidad: 15,
    fecha: "2026-10-06",
    referencia: "Compra CMP-004",
  },
  {
    id: 12,
    codigo_producto: "REP-006",
    producto: "Amortiguador Trasero",
    tipo: "Salida",
    cantidad: 3,
    fecha: "2026-10-07",
    referencia: "Venta VNT-031",
  },
  {
    id: 13,
    codigo_producto: "REP-007",
    producto: "Filtro de Aire",
    tipo: "Entrada",
    cantidad: 25,
    fecha: "2026-10-07",
    referencia: "Compra CMP-004",
  },
  {
    id: 14,
    codigo_producto: "REP-007",
    producto: "Filtro de Aire",
    tipo: "Salida",
    cantidad: 7,
    fecha: "2026-10-08",
    referencia: "Venta VNT-035",
  },
  {
    id: 15,
    codigo_producto: "REP-008",
    producto: "Batería 12V 12Ah",
    tipo: "Entrada",
    cantidad: 10,
    fecha: "2026-10-08",
    referencia: "Compra CMP-005",
  },
  {
    id: 16,
    codigo_producto: "REP-008",
    producto: "Batería 12V 12Ah",
    tipo: "Salida",
    cantidad: 6,
    fecha: "2026-10-08",
    referencia: "Venta VNT-038",
  },
  {
    id: 17,
    codigo_producto: "REP-009",
    producto: "Cadena de Transmisión 520H",
    tipo: "Entrada",
    cantidad: 20,
    fecha: "2026-10-08",
    referencia: "Compra CMP-005",
  },
  {
    id: 18,
    codigo_producto: "REP-009",
    producto: "Cadena de Transmisión 520H",
    tipo: "Salida",
    cantidad: 5,
    fecha: "2026-10-09",
    referencia: "Venta VNT-040",
  },
  {
    id: 19,
    codigo_producto: "REP-010",
    producto: "Kit de Arrastre",
    tipo: "Entrada",
    cantidad: 10,
    fecha: "2026-10-09",
    referencia: "Compra CMP-006",
  },
  {
    id: 20,
    codigo_producto: "REP-010",
    producto: "Kit de Arrastre",
    tipo: "Salida",
    cantidad: 3,
    fecha: "2026-10-09",
    referencia: "Venta VNT-041",
  },
  {
    id: 21,
    codigo_producto: "REP-011",
    producto: "Líquido de Frenos DOT4",
    tipo: "Entrada",
    cantidad: 35,
    fecha: "2026-10-09",
    referencia: "Compra CMP-006",
  },
  {
    id: 22,
    codigo_producto: "REP-011",
    producto: "Líquido de Frenos DOT4",
    tipo: "Salida",
    cantidad: 5,
    fecha: "2026-10-09",
    referencia: "Venta VNT-043",
  },
];

function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function obtenerEstado(producto) {
  if (producto.existencia_actual <= 0) return "Agotado";
  if (producto.existencia_actual <= producto.existencia_minima) return "Bajo";
  return "Normal";
}

export default function useInventario() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Estados de paginación
  const [paginaProductos, setPaginaProductos] = useState(1);
  const [paginaMovimientos, setPaginaMovimientos] = useState(1);

  // Filtrado de productos
  const productosFiltrados = useMemo(() => {
    const texto = normalizarTexto(busqueda);

    return productosPrueba
      .map((producto) => ({
        ...producto,
        estado: obtenerEstado(producto),
      }))
      .filter((producto) => {
        const coincideBusqueda = [
          producto.codigo_producto,
          producto.nombre,
          producto.categoria,
        ].some((campo) => normalizarTexto(campo).includes(texto));

        const coincideEstado =
          filtroEstado === "Todos" || producto.estado === filtroEstado;

        return coincideBusqueda && coincideEstado;
      });
  }, [busqueda, filtroEstado]);

  // Resumen global
  const resumen = useMemo(() => {
    return {
      totalProductos: productosPrueba.length,
      unidadesExistentes: productosPrueba.reduce(
        (total, producto) => total + producto.existencia_actual,
        0,
      ),
      productosBajos: productosPrueba.filter(
        (producto) => obtenerEstado(producto) === "Bajo",
      ).length,
      productosAgotados: productosPrueba.filter(
        (producto) => obtenerEstado(producto) === "Agotado",
      ).length,
    };
  }, []);

  // Filtrado de movimientos por producto
  const movimientosFiltrados = useMemo(() => {
    if (!productoSeleccionado) return movimientosPrueba;

    return movimientosPrueba.filter(
      (movimiento) =>
        movimiento.codigo_producto === productoSeleccionado.codigo_producto,
    );
  }, [productoSeleccionado]);

  // Paginación Existencias (10 en 10)
  const productosPaginados = useMemo(() => {
    const inicio = (paginaProductos - 1) * 10;
    return productosFiltrados.slice(inicio, inicio + 10);
  }, [productosFiltrados, paginaProductos]);

  const totalPaginasProductos = Math.ceil(productosFiltrados.length / 10) || 1;

  // Paginación Movimientos (20 en 20)
  const movimientosPaginados = useMemo(() => {
    const inicio = (paginaMovimientos - 1) * 20;
    return movimientosFiltrados.slice(inicio, inicio + 20);
  }, [movimientosFiltrados, paginaMovimientos]);

  const totalPaginasMovimientos =
    Math.ceil(movimientosFiltrados.length / 20) || 1;

  function consultarProducto(producto) {
    setProductoSeleccionado(producto);
    setPaginaMovimientos(1); // Reiniciar paginación al cambiar selección
  }

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroEstado("Todos");
    setProductoSeleccionado(null);
    setPaginaProductos(1);
    setPaginaMovimientos(1);
  }

  return {
    productos: productosPaginados,
    totalProductosTotal: productosFiltrados.length,
    paginaProductos,
    totalPaginasProductos,
    setPaginaProductos,

    movimientos: movimientosPaginados,
    totalMovimientosTotal: movimientosFiltrados.length,
    paginaMovimientos,
    totalPaginasMovimientos,
    setPaginaMovimientos,

    resumen,
    busqueda,
    filtroEstado,
    productoSeleccionado,
    setBusqueda,
    setFiltroEstado,
    consultarProducto,
    limpiarFiltros,
  };
}
