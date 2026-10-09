import { useMemo, useState } from "react";

// Datos temporales para probar el módulo.
const proveedoresPrueba = [
  { id_proveedor: 1, nombre: "Proveedor de prueba 1" },
  { id_proveedor: 2, nombre: "Proveedor de prueba 2" },
];

const productosPrueba = [
  {
    id_producto: 1,
    codigo_producto: "REP-001",
    nombre: "Filtro de aceite",
    precio_compra: 120,
  },
  {
    id_producto: 2,
    codigo_producto: "REP-002",
    nombre: "Bujía",
    precio_compra: 85,
  },
  {
    id_producto: 3,
    codigo_producto: "REP-003",
    nombre: "Pastillas de freno",
    precio_compra: 450,
  },
];

function obtenerFechaActual() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

export default function useCompras() {
  // Datos del encabezado de la compra.
  const [formulario, setFormulario] = useState({
    id_proveedor: "",
    fecha_compra: obtenerFechaActual(),
    observacion: "",
  });

  // Producto que se agregará al detalle.
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState("");

  // Lista de productos incluidos en la compra.
  const [detalles, setDetalles] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // Calcula el subtotal de cada producto y el total de la compra.
  const detallesCalculados = useMemo(() => {
    return detalles.map((detalle) => ({
      ...detalle,
      subtotal:
        (Number(detalle.cantidad) || 0) * (Number(detalle.precio_compra) || 0),
    }));
  }, [detalles]);

  const totalCompra = useMemo(() => {
    return detallesCalculados.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );
  }, [detallesCalculados]);

  // Actualiza los campos del encabezado.
  function manejarCambioFormulario(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setMensaje("");
  }

  // Agrega un producto al detalle de la compra.
  function agregarProducto() {
    setMensaje("");
    setTipoMensaje("");

    if (!idProductoSeleccionado) {
      setTipoMensaje("error");
      setMensaje("Selecciona un producto para agregarlo a la compra.");
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

    // Evita que el mismo producto aparezca dos veces.
    const yaExiste = detalles.some(
      (detalle) => detalle.id_producto === producto.id_producto,
    );

    if (yaExiste) {
      setTipoMensaje("error");
      setMensaje("Este producto ya está en la compra. Modifica su cantidad.");
      return;
    }

    setDetalles((actuales) => [
      ...actuales,
      {
        id_producto: producto.id_producto,
        codigo_producto: producto.codigo_producto,
        nombre: producto.nombre,
        cantidad: 1,
        precio_compra: producto.precio_compra,
      },
    ]);

    setIdProductoSeleccionado("");
    setTipoMensaje("exito");
    setMensaje("Producto agregado al detalle de la compra.");
  }

  // Permite modificar cantidad y precio de compra por producto.
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
  }

  // Elimina un producto del detalle.
  function eliminarProducto(idProducto) {
    setDetalles((actuales) =>
      actuales.filter((detalle) => detalle.id_producto !== idProducto),
    );

    setMensaje("");
  }

  // Valida los datos antes de preparar la compra.
  function validarCompra() {
    if (!formulario.id_proveedor) {
      return "Selecciona el proveedor de la compra.";
    }

    if (!formulario.fecha_compra) {
      return "La fecha de compra es obligatoria.";
    }

    if (detalles.length === 0) {
      return "Agrega al menos un producto a la compra.";
    }

    for (const detalle of detalles) {
      if (
        !Number.isInteger(Number(detalle.cantidad)) ||
        Number(detalle.cantidad) <= 0
      ) {
        return `La cantidad de ${detalle.nombre} debe ser un número entero mayor que cero.`;
      }

      if (
        detalle.precio_compra === "" ||
        !Number.isFinite(Number(detalle.precio_compra)) ||
        Number(detalle.precio_compra) <= 0
      ) {
        return `El precio de compra de ${detalle.nombre} debe ser mayor que cero.`;
      }
    }

    return "";
  }

  // Prepara los datos de la compra.
  function confirmarCompra(evento) {
    evento.preventDefault();

    const error = validarCompra();

    if (error) {
      setTipoMensaje("error");
      setMensaje(error);
      return;
    }

    const proveedor = proveedoresPrueba.find(
      (item) => item.id_proveedor === Number(formulario.id_proveedor),
    );

    // Estructura provisional del envío a la futura API.
    const compraPreparada = {
      ...formulario,
      id_proveedor: Number(formulario.id_proveedor),
      detalles: detallesCalculados.map((detalle) => ({
        id_producto: detalle.id_producto,
        cantidad: Number(detalle.cantidad),
        precio_compra: Number(detalle.precio_compra),
        subtotal: detalle.subtotal,
      })),
      total: totalCompra,
    };

    console.log("Proveedor seleccionado:", proveedor);
    console.log("Compra preparada para la API:", compraPreparada);

    setTipoMensaje("exito");
    setMensaje(
      "Compra validada. Los datos se prepararon en la consola; todavía no se guardaron en la base de datos.",
    );
  }

  // Deja el formulario listo para registrar otra compra.
  function nuevaCompra() {
    setFormulario({
      id_proveedor: "",
      fecha_compra: obtenerFechaActual(),
      observacion: "",
    });

    setIdProductoSeleccionado("");
    setDetalles([]);
    setMensaje("");
    setTipoMensaje("");
  }

  return {
    proveedores: proveedoresPrueba,
    productos: productosPrueba,
    formulario,
    idProductoSeleccionado,
    detalles: detallesCalculados,
    totalCompra,
    mensaje,
    tipoMensaje,
    setIdProductoSeleccionado,
    manejarCambioFormulario,
    agregarProducto,
    manejarCambioDetalle,
    eliminarProducto,
    confirmarCompra,
    nuevaCompra,
  };
}
