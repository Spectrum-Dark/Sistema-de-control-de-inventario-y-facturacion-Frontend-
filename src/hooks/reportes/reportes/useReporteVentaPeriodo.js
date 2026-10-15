import { useMemo, useState } from "react";

import {
  ventasDemo,
  clientesDemo,
  usuariosDemo,
} from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteVentaPeriodo() {
  // Filtros del reporte
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  // Generar el reporte aplicando los filtros seleccionados
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

  // Agregar información del cliente y del operador a cada venta
  const datosReporte = useMemo(() => {
    return ventasFiltradas.map((venta) => {
      const cliente = clientesDemo.find(
        (item) => item.id_cliente === venta.id_cliente,
      );

      const operador = usuariosDemo.find(
        (item) => item.id_usuario === venta.id_usuario,
      );

      return {
        ...venta,
        cliente: cliente?.nombre_cliente ?? "Cliente no disponible",
        operador: operador?.nombre ?? "Operador no disponible",
      };
    });
  }, [ventasFiltradas]);

  // Calcular los indicadores del reporte
  const resumen = useMemo(() => {
    const totalVentas = datosReporte.reduce(
      (total, venta) => total + Number(venta.total || 0),
      0,
    );

    return {
      cantidadVentas: datosReporte.length,
      totalVentas,
      promedioVenta:
        datosReporte.length > 0 ? totalVentas / datosReporte.length : 0,
    };
  }, [datosReporte]);

  // Preparar columnas para los archivos de Excel y PDF
  const columnasExportacion = [
    {
      titulo: "Número de venta",
      campo: "numero_venta",
      ancho: 20,
    },
    {
      titulo: "Fecha",
      campo: "fecha_venta",
      ancho: 15,
    },
    {
      titulo: "Cliente",
      campo: "cliente",
      ancho: 28,
    },
    {
      titulo: "Operador",
      campo: "operador",
      ancho: 25,
    },
    {
      titulo: "Subtotal",
      campo: "subtotal",
      ancho: 15,
    },
    {
      titulo: "Descuento",
      campo: "descuento",
      ancho: 15,
    },
    {
      titulo: "Impuesto",
      campo: "impuesto",
      ancho: 15,
    },
    {
      titulo: "Total",
      campo: "total",
      ancho: 15,
    },
  ];

  // Exportar el reporte a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "Reporte_ventas_por_periodo",
      nombreHoja: "Ventas por periodo",
      columnas: columnasExportacion,
      datos: datosReporte,
    });
  };

  // Exportar el reporte a PDF
  const descargarPDF = () => {
    return exportarPDF({
      titulo: "Reporte de ventas por periodo",
      nombreArchivo: "reporte_ventas_periodo",
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
          valor:
            clientesDemo.find(
              (cliente) =>
                String(cliente.id_cliente) === String(clienteSeleccionado),
            )?.nombre_cliente || "Todos",
        },
        {
          etiqueta: "Operador",
          valor:
            usuariosDemo.find(
              (usuario) =>
                String(usuario.id_usuario) === String(operadorSeleccionado),
            )?.nombre || "Todos",
        },
      ],
      columnas: columnasExportacion,
      datos: datosReporte,
      resumen: [
        {
          etiqueta: "Cantidad de ventas",
          valor: resumen.cantidadVentas,
        },
        {
          etiqueta: "Total vendido",
          valor: resumen.totalVentas.toFixed(2),
        },
        {
          etiqueta: "Promedio por venta",
          valor: resumen.promedioVenta.toFixed(2),
        },
      ],
    });
  };

  // Preparar la integración futura con Laravel
  const obtenerVentasDesdeAPI = async () => {
    // Aquí se conectará con el Service que consumirá la API REST de Laravel.
    // Los filtros se enviarán como parámetros de consulta.
    const parametros = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      id_cliente: clienteSeleccionado,
      id_usuario: operadorSeleccionado,
    };

    console.log("Parámetros para consultar ventas:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerVentasPorPeriodo(parametros);
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

    // Opciones para los selectores
    clientes: clientesDemo,
    operadores: usuariosDemo,

    // Datos y resumen
    ventas: datosReporte,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerVentasDesdeAPI,
  };
}
