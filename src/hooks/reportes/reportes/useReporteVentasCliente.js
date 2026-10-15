import { useMemo, useState } from "react";

import { ventasDemo, clientesDemo } from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteVentasCliente() {
  // Filtros del reporte
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  // Filtrar las ventas por fecha y cliente
  const ventasFiltradas = useMemo(() => {
    return ventasDemo.filter((venta) => {
      const cumpleFechaInicio =
        !fechaInicio || venta.fecha_venta >= fechaInicio;

      const cumpleFechaFin = !fechaFin || venta.fecha_venta <= fechaFin;

      const cumpleCliente =
        !clienteSeleccionado ||
        String(venta.id_cliente) === String(clienteSeleccionado);

      return cumpleFechaInicio && cumpleFechaFin && cumpleCliente;
    });
  }, [fechaInicio, fechaFin, clienteSeleccionado]);

  // Agrupar las ventas por cliente
  const ventasPorCliente = useMemo(() => {
    const agrupacion = new Map();

    ventasFiltradas.forEach((venta) => {
      const cliente = clientesDemo.find(
        (item) => item.id_cliente === venta.id_cliente,
      );

      const idCliente = venta.id_cliente;
      const nombreCliente = cliente
        ? `${cliente.nombre_cliente} ${cliente.apellido_cliente ?? ""}`.trim()
        : "Cliente no disponible";

      if (!agrupacion.has(idCliente)) {
        agrupacion.set(idCliente, {
          id_cliente: idCliente,
          cliente: nombreCliente,
          cantidad_ventas: 0,
          total_vendido: 0,
          primera_venta: venta.fecha_venta,
          ultima_venta: venta.fecha_venta,
        });
      }

      const registro = agrupacion.get(idCliente);

      registro.cantidad_ventas += 1;
      registro.total_vendido += Number(venta.total ?? 0);

      if (venta.fecha_venta < registro.primera_venta) {
        registro.primera_venta = venta.fecha_venta;
      }

      if (venta.fecha_venta > registro.ultima_venta) {
        registro.ultima_venta = venta.fecha_venta;
      }
    });

    return Array.from(agrupacion.values())
      .map((registro) => ({
        ...registro,
        promedio_venta:
          registro.cantidad_ventas > 0
            ? registro.total_vendido / registro.cantidad_ventas
            : 0,
      }))
      .sort((a, b) => b.total_vendido - a.total_vendido);
  }, [ventasFiltradas]);

  // Resumen general del reporte
  const resumen = useMemo(() => {
    const cantidadVentas = ventasPorCliente.reduce(
      (total, cliente) => total + cliente.cantidad_ventas,
      0,
    );

    const totalVendido = ventasPorCliente.reduce(
      (total, cliente) => total + cliente.total_vendido,
      0,
    );

    return {
      cantidadClientes: ventasPorCliente.length,
      cantidadVentas,
      totalVendido,
      promedioPorVenta: cantidadVentas > 0 ? totalVendido / cantidadVentas : 0,
    };
  }, [ventasPorCliente]);

  // Columnas para Excel y PDF
  const columnasExportacion = [
    { titulo: "Cliente", campo: "cliente", ancho: 30 },
    { titulo: "Cantidad de ventas", campo: "cantidad_ventas", ancho: 18 },
    { titulo: "Total vendido", campo: "total_vendido", ancho: 18 },
    { titulo: "Promedio por venta", campo: "promedio_venta", ancho: 18 },
    { titulo: "Primera venta", campo: "primera_venta", ancho: 16 },
    { titulo: "Última venta", campo: "ultima_venta", ancho: 16 },
  ];

  // Exportar el reporte a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_ventas_cliente",
      nombreHoja: "Ventas por cliente",
      columnas: columnasExportacion,
      datos: ventasPorCliente,
    });
  };

  // Exportar el reporte a PDF
  const descargarPDF = () => {
    const cliente = clientesDemo.find(
      (item) => String(item.id_cliente) === String(clienteSeleccionado),
    );

    return exportarPDF({
      titulo: "Reporte de ventas por cliente",
      nombreArchivo: "reporte_ventas_cliente",
      orientacion: "landscape",
      parametros: [
        { etiqueta: "Fecha inicial", valor: fechaInicio || "Todas" },
        { etiqueta: "Fecha final", valor: fechaFin || "Todas" },
        {
          etiqueta: "Cliente",
          valor: cliente
            ? `${cliente.nombre_cliente} ${cliente.apellido_cliente ?? ""}`.trim()
            : "Todos",
        },
      ],
      columnas: columnasExportacion,
      datos: ventasPorCliente,
      resumen: [
        { etiqueta: "Clientes con ventas", valor: resumen.cantidadClientes },
        { etiqueta: "Cantidad de ventas", valor: resumen.cantidadVentas },
        { etiqueta: "Total vendido", valor: resumen.totalVendido.toFixed(2) },
        {
          etiqueta: "Promedio por venta",
          valor: resumen.promedioPorVenta.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta a la API REST de Laravel
  const obtenerVentasClienteDesdeAPI = async () => {
    const parametros = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      id_cliente: clienteSeleccionado,
    };

    console.log("Parámetros para consultar ventas por cliente:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerVentasPorCliente(parametros);
  };

  return {
    // Filtros
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    clienteSeleccionado,
    setClienteSeleccionado,

    // Opciones
    clientes: clientesDemo,

    // Datos y resumen
    ventasPorCliente,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerVentasClienteDesdeAPI,
  };
}
