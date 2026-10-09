import { useMemo, useState } from "react";

// Clientes de prueba con el 'Cliente Contado' predeterminado (ID: 1)
const clientesPrueba = [
  { id_cliente: 1, nombre: "Cliente Contado / Venta Rápida" },
  { id_cliente: 2, nombre: "Taller Mecánico El Chino" },
  { id_cliente: 3, nombre: "Distribuidora San José" },
];

const productosPrueba = [
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
    nombre: "Bujía Platino",
    precio_venta: 120,
    existencia_actual: 5,
  },
  {
    id_producto: 3,
    codigo_producto: "REP-003",
    nombre: "Pastillas de freno delanteras",
    precio_venta: 650,
    existencia_actual: 0,
  },
];

function obtenerFechaActual() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

export default function useVentas() {
  const [formulario, setFormulario] = useState({
    id_cliente: "1",
    nombre_cliente_comprobante: "",
    fecha_venta: obtenerFechaActual(),
    observacion: "",
  });

  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState("");
  const [detalles, setDetalles] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const detallesCalculados = useMemo(() => {
    return detalles.map((detalle) => ({
      ...detalle,
      subtotal:
        (Number(detalle.cantidad) || 0) * (Number(detalle.precio_venta) || 0),
    }));
  }, [detalles]);

  const totalVenta = useMemo(() => {
    return detallesCalculados.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );
  }, [detallesCalculados]);

  function manejarCambioFormulario(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setMensaje("");
    setTipoMensaje("");
  }

  function agregarProducto() {
    setMensaje("");
    setTipoMensaje("");

    if (!idProductoSeleccionado) {
      setTipoMensaje("error");
      setMensaje("Selecciona un producto para agregarlo a la venta.");
      return;
    }

    const producto = productosPrueba.find(
      (item) => item.id_producto === Number(idProductoSeleccionado),
    );

    if (!producto) {
      setTipoMensaje("error");
      setMensaje("El producto seleccionado no existe.");
      return;
    }

    if (producto.existencia_actual <= 0) {
      setTipoMensaje("error");
      setMensaje(
        `El producto ${producto.nombre} no tiene existencias disponibles.`,
      );
      return;
    }

    const yaExiste = detalles.some(
      (detalle) => detalle.id_producto === producto.id_producto,
    );

    if (yaExiste) {
      setTipoMensaje("error");
      setMensaje("Este producto ya está en la venta. Modifica su cantidad.");
      return;
    }

    setDetalles((actuales) => [
      ...actuales,
      {
        id_producto: producto.id_producto,
        codigo_producto: producto.codigo_producto,
        nombre: producto.nombre,
        cantidad: 1,
        precio_venta: producto.precio_venta,
        existencia_disponible: producto.existencia_actual,
      },
    ]);

    setIdProductoSeleccionado("");
    setTipoMensaje("exito");
    setMensaje("Producto agregado al detalle de la venta.");
  }

  function manejarCambioDetalle(idProducto, campo, valor) {
    const numero = valor === "" ? "" : Number(valor);

    setDetalles((actuales) =>
      actuales.map((detalle) =>
        detalle.id_producto === idProducto
          ? { ...detalle, [campo]: numero }
          : detalle,
      ),
    );

    setMensaje("");
    setTipoMensaje("");
  }

  function eliminarProducto(idProducto) {
    setDetalles((actuales) =>
      actuales.filter((detalle) => detalle.id_producto !== idProducto),
    );

    setMensaje("");
    setTipoMensaje("");
  }

  // VALIDACIÓN ESTRICTA DE CLIENTE
  function validarVenta() {
    if (!formulario.id_cliente) {
      return "Selecciona el cliente de la venta.";
    }

    const idClienteNum = Number(formulario.id_cliente);
    const tieneNombrePersonalizado =
      formulario.nombre_cliente_comprobante.trim() !== "";

    // Si NO es Cliente Contado (ID != 1) y además escribió un nombre personalizado
    if (idClienteNum !== 1 && tieneNombrePersonalizado) {
      return "Has seleccionado un cliente registrado. Por favor, deja vacío el campo 'Nombre en Factura / Cliente' o selecciona 'Cliente Contado / Venta Rápida' para ingresar un nombre personalizado.";
    }

    if (!formulario.fecha_venta) {
      return "La fecha de venta es obligatoria.";
    }

    if (detalles.length === 0) {
      return "Agrega al menos un producto a la venta.";
    }

    for (const detalle of detalles) {
      if (
        !Number.isInteger(Number(detalle.cantidad)) ||
        Number(detalle.cantidad) <= 0
      ) {
        return `La cantidad de ${detalle.nombre} debe ser un número entero mayor que cero.`;
      }

      if (Number(detalle.cantidad) > detalle.existencia_disponible) {
        return `No hay existencias suficientes de ${detalle.nombre}. Disponibles: ${detalle.existencia_disponible}.`;
      }
    }

    return "";
  }

  function confirmarVenta(evento) {
    evento.preventDefault();

    const error = validarVenta();

    if (error) {
      setTipoMensaje("error");
      setMensaje(error);
      return;
    }

    const clienteObj = clientesPrueba.find(
      (item) => item.id_cliente === Number(formulario.id_cliente),
    );

    // Determinar el nombre final único para la API
    const clienteNombreFinal =
      Number(formulario.id_cliente) === 1
        ? formulario.nombre_cliente_comprobante.trim() || "Cliente Contado"
        : clienteObj?.nombre;

    // Estructura limpia para la API (sin campos vacíos repetidos)
    const ventaPreparada = {
      id_cliente: Number(formulario.id_cliente),
      cliente: clienteNombreFinal, // Nombre unificado único
      fecha_venta: formulario.fecha_venta,
      observacion: formulario.observacion,
      detalles: detallesCalculados.map((detalle) => ({
        id_producto: detalle.id_producto,
        cantidad: Number(detalle.cantidad),
        precio_venta: Number(detalle.precio_venta),
        subtotal: detalle.subtotal,
      })),
      total: totalVenta,
    };

    console.log("Venta preparada para la API:", ventaPreparada);

    setTipoMensaje("exito");
    setMensaje(
      "Venta validada. Los datos están en la consola; todavía no se guardaron en la base de datos.",
    );
  }

  function nuevaVenta() {
    setFormulario({
      id_cliente: "1",
      nombre_cliente_comprobante: "",
      fecha_venta: obtenerFechaActual(),
      observacion: "",
    });

    setIdProductoSeleccionado("");
    setDetalles([]);
    setMensaje("");
    setTipoMensaje("");
  }

  return {
    clientes: clientesPrueba,
    productos: productosPrueba,
    formulario,
    idProductoSeleccionado,
    detalles: detallesCalculados,
    totalVenta,
    mensaje,
    tipoMensaje,
    setIdProductoSeleccionado,
    manejarCambioFormulario,
    agregarProducto,
    manejarCambioDetalle,
    eliminarProducto,
    confirmarVenta,
    nuevaVenta,
  };
}
