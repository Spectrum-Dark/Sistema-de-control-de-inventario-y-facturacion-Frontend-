import { useMemo, useState } from "react";

import {
  ventasDemo,
  detallesVentasDemo,
  clientesDemo,
  usuariosDemo,
  productosDemo,
} from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteDetalleVentas() {
  // Filtros del reporte
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  // Identificador de la venta que el usuario selecciona
  const [ventaSeleccionadaId, setVentaSeleccionadaId] = useState(null);

  // Filtrar las ventas según los criterios seleccionados
  const ventasFiltradas = useMemo(() => {
    return ventasDemo.filter((venta) => {
      const cumpleFechaInicio =
        !fechaInicio || venta.fecha_venta >= fechaInicio;

      const cumpleFechaFin = !fechaFin || venta.fecha_venta <= fechaFin;

      const cumpleCliente =
        !clienteSeleccionado ||
        String(venta.id_cliente) === String(clienteSeleccionado);

      const cumpleOperador =
        !operadorSeleccionado ||
        String(venta.id_usuario) === String(operadorSeleccionado);

      return (
        cumpleFechaInicio && cumpleFechaFin && cumpleCliente && cumpleOperador
      );
    });
  }, [fechaInicio, fechaFin, clienteSeleccionado, operadorSeleccionado]);

  // Agregar el nombre del cliente y del operador a cada venta
  const ventas = useMemo(() => {
    return ventasFiltradas.map((venta) => {
      const cliente = clientesDemo.find(
        (item) => item.id_cliente === venta.id_cliente,
      );

      const operador = usuariosDemo.find(
        (item) => item.id_usuario === venta.id_usuario,
      );

      const nombreCliente = cliente
        ? `${cliente.nombre_cliente} ${cliente.apellido_cliente ?? ""}`.trim()
        : "Cliente no disponible";

      const nombreOperador = operador
        ? `${operador.nombre ?? ""} ${operador.apellido ?? ""}`.trim()
        : "Operador no disponible";

      return {
        ...venta,
        cliente: nombreCliente,
        operador: nombreOperador || "Operador no disponible",
      };
    });
  }, [ventasFiltradas]);

  // Mantener una selección válida cuando cambian los filtros
  const ventaSeleccionada =
    ventas.find((venta) => venta.id_venta === ventaSeleccionadaId) ?? null;

  // Obtener los detalles de la venta seleccionada
  const detallesVentaSeleccionada = useMemo(() => {
    if (!ventaSeleccionada) {
      return [];
    }

    return detallesVentasDemo
      .filter((detalle) => detalle.id_venta === ventaSeleccionada.id_venta)
      .map((detalle) => {
        const producto = productosDemo.find(
          (item) => item.id_producto === detalle.id_producto,
        );

        return {
          ...detalle,
          nombre_producto:
            producto?.nombre_producto ?? "Producto no disponible",
          codigo_producto: producto?.codigo_producto ?? "Sin código",
          total_linea: Number(detalle.subtotal ?? 0),
        };
      });
  }, [ventaSeleccionada]);

  // Resumen general de las ventas filtradas
  const resumen = useMemo(() => {
    const totalVendido = ventas.reduce(
      (total, venta) => total + Number(venta.total ?? 0),
      0,
    );

    return {
      cantidadVentas: ventas.length,
      totalVendido,
      cantidadProductos: ventas.reduce((total, venta) => {
        return (
          total +
          detallesVentasDemo
            .filter((detalle) => detalle.id_venta === venta.id_venta)
            .reduce(
              (cantidad, detalle) => cantidad + Number(detalle.cantidad ?? 0),
              0,
            )
        );
      }, 0),
    };
  }, [ventas]);

  // Preparar los datos de exportación en formato maestro-detalle
  const datosExportacion = useMemo(() => {
    const ventasParaExportar = ventaSeleccionada ? [ventaSeleccionada] : ventas;

    return ventasParaExportar.flatMap((venta) => {
      const detalles = detallesVentasDemo.filter(
        (detalle) => detalle.id_venta === venta.id_venta,
      );

      const cliente = clientesDemo.find(
        (item) => item.id_cliente === venta.id_cliente,
      );

      const operador = usuariosDemo.find(
        (item) => item.id_usuario === venta.id_usuario,
      );

      return detalles.map((detalle) => {
        const producto = productosDemo.find(
          (item) => item.id_producto === detalle.id_producto,
        );

        return {
          numero_venta: venta.numero_venta,
          fecha_venta: venta.fecha_venta,
          cliente: cliente
            ? `${cliente.nombre_cliente} ${cliente.apellido_cliente ?? ""}`.trim()
            : "Cliente no disponible",
          operador: operador
            ? `${operador.nombre ?? ""} ${operador.apellido ?? ""}`.trim()
            : "Operador no disponible",
          codigo_producto: producto?.codigo_producto ?? "Sin código",
          nombre_producto:
            producto?.nombre_producto ?? "Producto no disponible",
          cantidad: Number(detalle.cantidad ?? 0),
          precio_unitario: Number(detalle.precio_unitario ?? 0),
          descuento: Number(detalle.descuento ?? 0),
          subtotal: Number(detalle.subtotal ?? 0),
          total_venta: Number(venta.total ?? 0),
        };
      });
    });
  }, [ventas, ventaSeleccionada]);

  // Columnas compartidas por Excel y PDF
  const columnasExportacion = [
    {
      titulo: "N.º de venta",
      campo: "numero_venta",
      ancho: 18,
    },
    {
      titulo: "Fecha",
      campo: "fecha_venta",
      ancho: 15,
    },
    {
      titulo: "Cliente",
      campo: "cliente",
      ancho: 25,
    },
    {
      titulo: "Operador",
      campo: "operador",
      ancho: 22,
    },
    {
      titulo: "Código",
      campo: "codigo_producto",
      ancho: 15,
    },
    {
      titulo: "Producto",
      campo: "nombre_producto",
      ancho: 28,
    },
    {
      titulo: "Cantidad",
      campo: "cantidad",
      ancho: 12,
    },
    {
      titulo: "Precio unitario",
      campo: "precio_unitario",
      ancho: 16,
    },
    {
      titulo: "Descuento",
      campo: "descuento",
      ancho: 13,
    },
    {
      titulo: "Subtotal",
      campo: "subtotal",
      ancho: 14,
    },
    {
      titulo: "Total de venta",
      campo: "total_venta",
      ancho: 15,
    },
  ];

  // Exportar el reporte a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_detalle_ventas",
      nombreHoja: "Detalle de ventas",
      columnas: columnasExportacion,
      datos: datosExportacion,
    });
  };

  // Exportar el reporte a PDF
  const descargarPDF = () => {
    return exportarPDF({
      titulo: "Reporte de detalle de ventas",
      nombreArchivo: "reporte_detalle_ventas",
      orientacion: "landscape",
      parametros: [
        {
          etiqueta: "Fecha inicial",
          valor: fechaInicio || "Todas",
        },
        {
          etiqueta: "Fecha final",
          valor: fechaFin || "Todas",
        },
        {
          etiqueta: "Cliente",
          valor: clientesDemo.find(
            (item) => String(item.id_cliente) === String(clienteSeleccionado),
          )
            ? `${
                clientesDemo.find(
                  (item) =>
                    String(item.id_cliente) === String(clienteSeleccionado),
                ).nombre_cliente
              } ${
                clientesDemo.find(
                  (item) =>
                    String(item.id_cliente) === String(clienteSeleccionado),
                ).apellido_cliente ?? ""
              }`.trim()
            : "Todos",
        },
        {
          etiqueta: "Operador",
          valor:
            usuariosDemo.find(
              (item) =>
                String(item.id_usuario) === String(operadorSeleccionado),
            )?.nombre ?? "Todos",
        },
        {
          etiqueta: "Venta seleccionada",
          valor:
            ventaSeleccionada?.numero_venta ?? "Todas las ventas filtradas",
        },
      ],
      columnas: columnasExportacion,
      datos: datosExportacion,
      resumen: [
        {
          etiqueta: "Cantidad de ventas",
          valor: ventaSeleccionada ? 1 : resumen.cantidadVentas,
        },
        {
          etiqueta: "Total vendido en el filtro",
          valor: resumen.totalVendido.toFixed(2),
        },
        {
          etiqueta: "Unidades vendidas",
          valor: resumen.cantidadProductos,
        },
      ],
    });
  };

  // Preparar la futura consulta a la API REST de Laravel
  const obtenerDetalleVentasDesdeAPI = async () => {
    const parametros = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      id_cliente: clienteSeleccionado,
      id_usuario: operadorSeleccionado,
      id_venta: ventaSeleccionadaId,
    };

    console.log("Parámetros para consultar detalle de ventas:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerDetalleVentas(parametros);
  };

  return {
    // Filtros
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    clienteSeleccionado,
    setClienteSeleccionado,
    operadorSeleccionado,
    setOperadorSeleccionado,

    // Opciones para los filtros
    clientes: clientesDemo,
    operadores: usuariosDemo,

    // Ventas y selección
    ventas,
    ventaSeleccionada,
    ventaSeleccionadaId,
    seleccionarVenta: setVentaSeleccionadaId,

    // Detalle de la venta seleccionada
    detallesVentaSeleccionada,

    // Resumen
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerDetalleVentasDesdeAPI,
  };
}
