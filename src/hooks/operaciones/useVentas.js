
import { useMemo, useState } from "react";

const clientesIniciales = [
  { id_cliente: 1, nombre: "Taller Mecánico El Chino" },
  { id_cliente: 2, nombre: "Distribuidora San José" },
  { id_cliente: 3, nombre: "Cliente de contado" },
  { id_cliente: 4, nombre: "Taller Automotriz Central" },
];

const productosIniciales = [
  {
    id_producto: 1,
    codigo_producto: "REP-001",
    nombre: "Filtro de aceite",
    precio_venta: 180,
    existencia_actual: 25,
  },
  {
    id_producto: 2,
    codigo_producto: "REP-002",
    nombre: "Bujía de platino",
    precio_venta: 120,
    existencia_actual: 40,
  },
  {
    id_producto: 3,
    codigo_producto: "REP-003",
    nombre: "Pastillas de freno",
    precio_venta: 650,
    existencia_actual: 12,
  },
  {
    id_producto: 4,
    codigo_producto: "REP-004",
    nombre: "Filtro de aire",
    precio_venta: 200,
    existencia_actual: 18,
  },
  {
    id_producto: 5,
    codigo_producto: "REP-005",
    nombre: "Aceite para motor",
    precio_venta: 180,
    existencia_actual: 30,
  },
];

const ventasIniciales = [
  {
    id_venta: 1,
    numero_venta: "VTA-0001",
    fecha: "2026-10-08",
    id_cliente: 1,
    cliente: "Taller Mecánico El Chino",
    productos: [
      {
        id_producto: 1,
        codigo_producto: "REP-001",
        nombre: "Filtro de aceite",
        cantidad: 5,
        precio_unitario: 180,
      },
      {
        id_producto: 2,
        codigo_producto: "REP-002",
        nombre: "Bujía de platino",
        cantidad: 13,
        precio_unitario: 120,
      },
    ],
    total: 2460,
    estado: "Procesada",
  },
  {
    id_venta: 2,
    numero_venta: "VTA-0002",
    fecha: "2026-10-07",
    id_cliente: 2,
    cliente: "Distribuidora San José",
    productos: [
      {
        id_producto: 3,
        codigo_producto: "REP-003",
        nombre: "Pastillas de freno",
        cantidad: 1,
        precio_unitario: 650,
      },
      {
        id_producto: 4,
        codigo_producto: "REP-004",
        nombre: "Filtro de aire",
        cantidad: 1,
        precio_unitario: 200,
      },
    ],
    total: 850,
    estado: "Procesada",
  },
];

const obtenerFechaActual = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const calcularTotal = (productos) =>
  productos.reduce(
    (total, producto) =>
      total + producto.cantidad * producto.precio_unitario,
    0
  );

export function useVentas() {
  const [clientes] = useState(clientesIniciales);
  const [productos, setProductos] = useState(productosIniciales);
  const [ventas, setVentas] = useState(ventasIniciales);

  const [idCliente, setIdCliente] = useState("");
  const [fecha, setFecha] = useState(obtenerFechaActual());
  const [productosVenta, setProductosVenta] = useState([]);

  const [idProducto, setIdProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("1");

  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [ventaEditando, setVentaEditando] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const mostrarMensaje = (texto, tipo = "info") => {
    setMensaje(texto);
    setTipoMensaje(tipo);
  };

  const totalVenta = useMemo(
    () => calcularTotal(productosVenta),
    [productosVenta]
  );

  const cantidadProductos = useMemo(
    () =>
      productosVenta.reduce(
        (total, producto) => total + producto.cantidad,
        0
      ),
    [productosVenta]
  );

  const ventasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return ventas.filter((venta) => {
      const coincideBusqueda =
        venta.numero_venta.toLowerCase().includes(termino) ||
        venta.cliente.toLowerCase().includes(termino);

      const coincideEstado =
        filtroEstado === "Todos" || venta.estado === filtroEstado;

      const coincideDesde = !fechaDesde || venta.fecha >= fechaDesde;
      const coincideHasta = !fechaHasta || venta.fecha <= fechaHasta;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideDesde &&
        coincideHasta
      );
    });
  }, [ventas, busqueda, filtroEstado, fechaDesde, fechaHasta]);

  const totalVentas = ventas.filter(
    (venta) => venta.estado !== "Anulada"
  ).length;

  const montoTotalVentas = ventas
    .filter((venta) => venta.estado !== "Anulada")
    .reduce((total, venta) => total + venta.total, 0);

  const productosDisponibles = productos.filter(
    (producto) =>
      producto.existencia_actual > 0 &&
      !productosVenta.some(
        (item) => item.id_producto === producto.id_producto
      )
  );

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroEstado("Todos");
    setFechaDesde("");
    setFechaHasta("");
    setVentaSeleccionada(null);
  };

  const limpiarFormulario = () => {
    setIdCliente("");
    setFecha(obtenerFechaActual());
    setProductosVenta([]);
    setIdProducto("");
    setCantidadProducto("1");
    setVentaEditando(null);
    setMensaje("");
    setTipoMensaje("info");
  };

  const agregarProducto = () => {
    const producto = productos.find(
      (item) => item.id_producto === Number(idProducto)
    );

    if (!producto) {
      mostrarMensaje("Selecciona un producto.", "error");
      return;
    }

    const cantidad = Number(cantidadProducto);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      mostrarMensaje(
        "La cantidad debe ser un entero mayor que cero.",
        "error"
      );
      return;
    }

    const existente = productosVenta.find(
      (item) => item.id_producto === producto.id_producto
    );

    const cantidadActual = existente?.cantidad || 0;

    const cantidadOriginal =
      ventaEditando?.productos.find(
        (item) => item.id_producto === producto.id_producto
      )?.cantidad || 0;

    const disponible = producto.existencia_actual + cantidadOriginal;

    if (cantidadActual + cantidad > disponible) {
      mostrarMensaje(
        `Existencias insuficientes. Disponible: ${disponible}.`,
        "error"
      );
      return;
    }

    if (existente) {
      setProductosVenta((actuales) =>
        actuales.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setProductosVenta((actuales) => [
        ...actuales,
        {
          id_producto: producto.id_producto,
          codigo_producto: producto.codigo_producto,
          nombre: producto.nombre,
          cantidad,
          precio_unitario: producto.precio_venta,
        },
      ]);
    }

    setIdProducto("");
    setCantidadProducto("1");
    mostrarMensaje("Producto agregado correctamente.", "exito");
  };

  const cambiarCantidad = (idProductoVenta, valor) => {
    const cantidad = Number(valor);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      mostrarMensaje(
        "La cantidad debe ser un entero mayor que cero.",
        "error"
      );
      return;
    }

    const producto = productos.find(
      (item) => item.id_producto === idProductoVenta
    );

    if (!producto) return;

    const cantidadOriginal =
      ventaEditando?.productos.find(
        (item) => item.id_producto === idProductoVenta
      )?.cantidad || 0;

    if (cantidad > producto.existencia_actual + cantidadOriginal) {
      mostrarMensaje(
        `Existencias insuficientes. Disponible: ${
          producto.existencia_actual + cantidadOriginal
        }.`,
        "error"
      );
      return;
    }

    setProductosVenta((actuales) =>
      actuales.map((item) =>
        item.id_producto === idProductoVenta
          ? { ...item, cantidad }
          : item
      )
    );

    setMensaje("");
  };

  const quitarProducto = (idProductoVenta) => {
    setProductosVenta((actuales) =>
      actuales.filter(
        (item) => item.id_producto !== idProductoVenta
      )
    );

    setMensaje("");
  };

  const restaurarExistencias = (venta) => {
    setProductos((actuales) =>
      actuales.map((producto) => {
        const itemVendido = venta.productos.find(
          (item) => item.id_producto === producto.id_producto
        );

        if (!itemVendido) return producto;

        return {
          ...producto,
          existencia_actual:
            producto.existencia_actual + itemVendido.cantidad,
        };
      })
    );
  };

  const aplicarExistencias = (productosDeVenta) => {
    setProductos((actuales) =>
      actuales.map((producto) => {
        const itemVendido = productosDeVenta.find(
          (item) => item.id_producto === producto.id_producto
        );

        if (!itemVendido) return producto;

        return {
          ...producto,
          existencia_actual:
            producto.existencia_actual - itemVendido.cantidad,
        };
      })
    );
  };

  const guardarVenta = (evento) => {
    evento?.preventDefault();

    if (!idCliente) {
      mostrarMensaje("Selecciona un cliente.", "error");
      return;
    }

    if (!fecha) {
      mostrarMensaje("Selecciona la fecha de la venta.", "error");
      return;
    }

    if (productosVenta.length === 0) {
      mostrarMensaje("Agrega al menos un producto.", "error");
      return;
    }

    const cliente = clientes.find(
      (item) => item.id_cliente === Number(idCliente)
    );

    if (!cliente) {
      mostrarMensaje("El cliente seleccionado no es válido.", "error");
      return;
    }

    for (const item of productosVenta) {
      const producto = productos.find(
        (actual) => actual.id_producto === item.id_producto
      );

      const cantidadOriginal =
        ventaEditando?.productos.find(
          (anterior) => anterior.id_producto === item.id_producto
        )?.cantidad || 0;

      const disponible =
        (producto?.existencia_actual || 0) + cantidadOriginal;

      if (
        !producto ||
        !Number.isInteger(item.cantidad) ||
        item.cantidad <= 0 ||
        item.cantidad > disponible
      ) {
        mostrarMensaje(
          `No hay existencias suficientes para ${item.nombre}.`,
          "error"
        );
        return;
      }
    }

    const productosGuardados = productosVenta.map((item) => ({
      ...item,
    }));

    const total = calcularTotal(productosGuardados);

    if (ventaEditando) {
      const ventaActualizada = {
        ...ventaEditando,
        id_cliente: Number(idCliente),
        cliente: cliente.nombre,
        fecha,
        productos: productosGuardados,
        total,
        estado: "Modificada",
      };

      setProductos((actuales) =>
        actuales.map((producto) => {
          const cantidadAnterior =
            ventaEditando.productos.find(
              (item) => item.id_producto === producto.id_producto
            )?.cantidad || 0;

          const cantidadNueva =
            productosGuardados.find(
              (item) => item.id_producto === producto.id_producto
            )?.cantidad || 0;

          return {
            ...producto,
            existencia_actual:
              producto.existencia_actual +
              cantidadAnterior -
              cantidadNueva,
          };
        })
      );

      setVentas((actuales) =>
        actuales.map((venta) =>
          venta.id_venta === ventaEditando.id_venta
            ? ventaActualizada
            : venta
        )
      );

      console.log("Actualizar venta:", ventaActualizada);

      mostrarMensaje(
        `${ventaActualizada.numero_venta} se actualizó correctamente.`,
        "exito"
      );
    } else {
      const siguienteId =
        Math.max(0, ...ventas.map((venta) => venta.id_venta)) + 1;

      const nuevaVenta = {
        id_venta: siguienteId,
        numero_venta: `VTA-${String(siguienteId).padStart(4, "0")}`,
        id_cliente: Number(idCliente),
        cliente: cliente.nombre,
        fecha,
        productos: productosGuardados,
        total,
        estado: "Procesada",
      };

      aplicarExistencias(productosGuardados);
      setVentas((actuales) => [nuevaVenta, ...actuales]);

      console.log("Registrar venta:", nuevaVenta);

      mostrarMensaje(
        `${nuevaVenta.numero_venta} se registró correctamente.`,
        "exito"
      );
    }

    setIdCliente("");
    setFecha(obtenerFechaActual());
    setProductosVenta([]);
    setIdProducto("");
    setCantidadProducto("1");
    setVentaEditando(null);
  };

  const editarVenta = (venta) => {
    if (venta.estado === "Anulada") {
      mostrarMensaje("No se puede editar una venta anulada.", "error");
      return;
    }

    setVentaEditando(venta);
    setIdCliente(String(venta.id_cliente));
    setFecha(venta.fecha);
    setProductosVenta(venta.productos.map((item) => ({ ...item })));
    setIdProducto("");
    setCantidadProducto("1");
    setMostrarFormulario(true);
    setMostrarHistorial(false);
    setVentaSeleccionada(null);
    setMensaje("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    mostrarMensaje("Edición cancelada.", "info");
  };

  const anularVenta = (venta) => {
    if (venta.estado === "Anulada") {
      mostrarMensaje("Esta venta ya está anulada.", "error");
      return;
    }

    const confirmar = window.confirm(
      `¿Deseas anular la venta ${venta.numero_venta}? Se devolverán sus productos al inventario.`
    );

    if (!confirmar) return;

    restaurarExistencias(venta);

    const ventaAnulada = {
      ...venta,
      estado: "Anulada",
    };

    setVentas((actuales) =>
      actuales.map((item) =>
        item.id_venta === venta.id_venta ? ventaAnulada : item
      )
    );

    if (ventaSeleccionada === venta.id_venta) {
      setVentaSeleccionada(null);
    }

    if (ventaEditando?.id_venta === venta.id_venta) {
      limpiarFormulario();
    }

    console.log("Anular venta:", ventaAnulada);

    mostrarMensaje(
      `${venta.numero_venta} fue anulada correctamente.`,
      "exito"
    );
  };

  const alternarHistorial = () => {
    setMostrarHistorial((actual) => !actual);
    setMensaje("");
  };

  return {
    clientes,
    productos,
    ventas,
    idCliente,
    setIdCliente,
    fecha,
    setFecha,
    productosVenta,
    idProducto,
    setIdProducto,
    cantidadProducto,
    setCantidadProducto,
    mostrarFormulario,
    setMostrarFormulario,
    mostrarHistorial,
    setMostrarHistorial,
    ventaSeleccionada,
    setVentaSeleccionada,
    ventaEditando,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    mensaje,
    tipoMensaje,
    totalVenta,
    cantidadProductos,
    ventasFiltradas,
    totalVentas,
    montoTotalVentas,
    productosDisponibles,
    mostrarMensaje,
    limpiarFiltros,
    limpiarFormulario,
    agregarProducto,
    cambiarCantidad,
    quitarProducto,
    guardarVenta,
    editarVenta,
    cancelarEdicion,
    anularVenta,
    alternarHistorial,
  };
}
