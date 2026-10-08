/*unction useDashboard() {
  // Contiene toda la información que necesita el Dashboard.
  // Actualmente usamos datos temporales porque el backend Laravel
  // todavía no está conectado.
  const datosDashboard = {
    indicadores: {
      productos: 0,
      clientes: 0,
      ventasPeriodo: 0,
      comprasPeriodo: 0,
      stockBajo: 0,
      valorInventario: 0,
    },

    // Datos que posteriormente vendrán desde Laravel
    // para alimentar el gráfico de ventas por período.
    ventasPorPeriodo: {
      etiquetas: [
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb",
        "Dom",
      ],
      valores: [0, 0, 0, 0, 0, 0, 0],
    },

    // Productos con mayor cantidad de unidades vendidas.
    productosMasVendidos: {
      etiquetas: [],
      valores: [],
    },

    // Clasificación del estado actual del inventario.
    estadoInventario: {
      etiquetas: [
        "Normal",
        "Bajo",
        "Agotado",
      ],
      valores: [0, 0, 0],
    },

    // Cantidad de ventas agrupadas por categoría.
    ventasPorCategoria: {
      etiquetas: [],
      valores: [],
    },

    // Lista de productos que tienen existencia igual o inferior
    // al mínimo establecido.
    productosStockBajo: [],

    // Operaciones más recientes realizadas en el sistema.
    ultimasOperaciones: [],
  }

  // El hook expone los datos para que la página Dashboard
  // pueda distribuirlos a los diferentes componentes.
  return {
    datosDashboard,
  }
}

export default useDashboard*/

/* Datosss temporales--------------------------------------------------------------------------------- */

function useDashboard() {
  // Contiene toda la información que necesita el Dashboard.
  // Por ahora utilizamos datos de prueba porque Laravel todavía
  // no está conectado al frontend.
  const datosDashboard = {
    // Información utilizada por las tarjetas de indicadores.
    indicadores: {
      productos: 248,
      clientes: 86,
      ventasPeriodo: 15420,
      comprasPeriodo: 9820,
      stockBajo: 12,
      valorInventario: 486750.50,
    },

    // Datos utilizados para mostrar las ventas realizadas
    // durante los diferentes días del período seleccionado.
    ventasPorPeriodo: {
      etiquetas: [
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb",
        "Dom",
      ],

      valores: [
        1850,
        2340,
        1980,
        2760,
        3210,
        1940,
        1340,
      ],
    },

    // Productos que han registrado la mayor cantidad
    // de unidades vendidas durante el período.
    productosMasVendidos: {
      etiquetas: [
        "Filtro de aceite",
        "Pastillas de freno",
        "Bujías",
        "Filtro de aire",
        "Correa de distribución",
      ],

      valores: [
        86,
        72,
        64,
        51,
        43,
      ],
    },

    // Clasificación de los productos según el estado
    // actual de sus existencias.
    estadoInventario: {
      etiquetas: [
        "Normal",
        "Bajo",
        "Agotado",
      ],

      valores: [
        198,
        32,
        18,
      ],
    },

    // Ventas agrupadas según la categoría del producto.
    ventasPorCategoria: {
      etiquetas: [
        "Motor",
        "Frenos",
        "Suspensión",
        "Eléctrico",
        "Filtros",
      ],

      valores: [
        4850,
        3620,
        2740,
        2310,
        1900,
      ],
    },

    // Productos cuya existencia actual se encuentra
    // en el mínimo establecido o por debajo de este.
    productosStockBajo: [
      {
        id_producto: 1,
        nombre: "Filtro de aceite Toyota",
        existencia: 4,
        minimo: 10,
      },
      {
        id_producto: 2,
        nombre: "Pastillas de freno delanteras",
        existencia: 3,
        minimo: 8,
      },
      {
        id_producto: 3,
        nombre: "Bujías NGK",
        existencia: 5,
        minimo: 12,
      },
      {
        id_producto: 4,
        nombre: "Filtro de aire Nissan",
        existencia: 2,
        minimo: 6,
      },
    ],

    // Operaciones realizadas recientemente en el sistema.
    // Posteriormente esta información será obtenida desde Laravel.
    ultimasOperaciones: [
      {
        id: 1,
        tipo: "Venta",
        descripcion: "Venta de repuestos registrada",
        fecha: "07/10/2026 13:45",
      },
      {
        id: 2,
        tipo: "Compra",
        descripcion: "Compra de productos registrada",
        fecha: "07/10/2026 11:20",
      },
      {
        id: 3,
        tipo: "Venta",
        descripcion: "Venta de repuestos registrada",
        fecha: "06/10/2026 16:10",
      },
      {
        id: 4,
        tipo: "Ajuste de inventario",
        descripcion: "Movimiento de inventario registrado",
        fecha: "06/10/2026 14:35",
      },
      {
        id: 5,
        tipo: "Compra",
        descripcion: "Compra de productos registrada",
        fecha: "05/10/2026 09:50",
      },
    ],
  }

  // El hook entrega todos los datos a la página Dashboard.
  // La página se encarga de distribuirlos a cada componente.
  return {
    datosDashboard,
  }
}

export default useDashboard