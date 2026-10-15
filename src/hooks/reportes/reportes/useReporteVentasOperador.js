import { useMemo, useState } from "react";

import { ventasDemo, usuariosDemo } from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteVentasOperador() {
  // Filtros del reporte
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  // Filtrar ventas por período y operador
  const ventasFiltradas = useMemo(() => {
    return ventasDemo.filter((venta) => {
      const cumpleFechaInicio =
        !fechaInicio || venta.fecha_venta >= fechaInicio;

      const cumpleFechaFin = !fechaFin || venta.fecha_venta <= fechaFin;

      const cumpleOperador =
        !operadorSeleccionado ||
        String(venta.id_usuario) === String(operadorSeleccionado);

      return cumpleFechaInicio && cumpleFechaFin && cumpleOperador;
    });
  }, [fechaInicio, fechaFin, operadorSeleccionado]);

  // Agrupar las ventas por operador
  const ventasPorOperador = useMemo(() => {
    const agrupacion = new Map();

    ventasFiltradas.forEach((venta) => {
      const operador = usuariosDemo.find(
        (item) => item.id_usuario === venta.id_usuario,
      );

      const idOperador = venta.id_usuario;

      const nombreOperador = operador
        ? `${operador.nombre ?? ""} ${operador.apellido ?? ""}`.trim()
        : "Operador no disponible";

      if (!agrupacion.has(idOperador)) {
        agrupacion.set(idOperador, {
          id_usuario: idOperador,
          operador: nombreOperador,
          cantidad_ventas: 0,
          total_vendido: 0,
          primera_venta: venta.fecha_venta,
          ultima_venta: venta.fecha_venta,
        });
      }

      const registro = agrupacion.get(idOperador);

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

  // Calcular el resumen general
  const resumen = useMemo(() => {
    const cantidadVentas = ventasPorOperador.reduce(
      (total, operador) => total + operador.cantidad_ventas,
      0,
    );

    const totalVendido = ventasPorOperador.reduce(
      (total, operador) => total + operador.total_vendido,
      0,
    );

    return {
      cantidadOperadores: ventasPorOperador.length,
      cantidadVentas,
      totalVendido,
      promedioPorVenta: cantidadVentas > 0 ? totalVendido / cantidadVentas : 0,
    };
  }, [ventasPorOperador]);

  // Columnas para Excel y PDF
  const columnasExportacion = [
    { titulo: "Operador", campo: "operador", ancho: 28 },
    { titulo: "Cantidad de ventas", campo: "cantidad_ventas", ancho: 18 },
    { titulo: "Total vendido", campo: "total_vendido", ancho: 18 },
    { titulo: "Promedio por venta", campo: "promedio_venta", ancho: 18 },
    { titulo: "Primera venta", campo: "primera_venta", ancho: 16 },
    { titulo: "Última venta", campo: "ultima_venta", ancho: 16 },
  ];

  // Exportar a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_ventas_operador",
      nombreHoja: "Ventas por operador",
      columnas: columnasExportacion,
      datos: ventasPorOperador,
    });
  };

  // Exportar a PDF
  const descargarPDF = () => {
    const operador = usuariosDemo.find(
      (item) => String(item.id_usuario) === String(operadorSeleccionado),
    );

    const nombreOperador = operador
      ? `${operador.nombre ?? ""} ${operador.apellido ?? ""}`.trim()
      : "Todos";

    return exportarPDF({
      titulo: "Reporte de ventas por operador",
      nombreArchivo: "reporte_ventas_operador",
      orientacion: "landscape",
      parametros: [
        { etiqueta: "Fecha inicial", valor: fechaInicio || "Todas" },
        { etiqueta: "Fecha final", valor: fechaFin || "Todas" },
        { etiqueta: "Operador", valor: nombreOperador },
      ],
      columnas: columnasExportacion,
      datos: ventasPorOperador,
      resumen: [
        {
          etiqueta: "Operadores con ventas",
          valor: resumen.cantidadOperadores,
        },
        { etiqueta: "Cantidad de ventas", valor: resumen.cantidadVentas },
        { etiqueta: "Total vendido", valor: resumen.totalVendido.toFixed(2) },
        {
          etiqueta: "Promedio por venta",
          valor: resumen.promedioPorVenta.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta a Laravel
  const obtenerVentasOperadorDesdeAPI = async () => {
    const parametros = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      id_usuario: operadorSeleccionado,
    };

    console.log("Parámetros para consultar ventas por operador:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerVentasPorOperador(parametros);
  };

  return {
    // Filtros
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    operadorSeleccionado,
    setOperadorSeleccionado,

    // Opciones para los filtros
    operadores: usuariosDemo,

    // Datos y resumen
    ventasPorOperador,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerVentasOperadorDesdeAPI,
  };
}
