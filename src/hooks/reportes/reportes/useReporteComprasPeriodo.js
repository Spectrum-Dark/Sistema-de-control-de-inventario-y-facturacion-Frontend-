import { useMemo, useState } from "react";

import {
  comprasDemo,
  proveedoresDemo,
  usuariosDemo,
} from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteComprasPeriodo() {
  // Filtros del reporte
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  // Filtrar las compras
  const comprasFiltradas = useMemo(() => {
    return comprasDemo.filter((compra) => {
      const cumpleFechaInicio =
        !fechaInicio || compra.fecha_compra >= fechaInicio;

      const cumpleFechaFin = !fechaFin || compra.fecha_compra <= fechaFin;

      const cumpleProveedor =
        !proveedorSeleccionado ||
        String(compra.id_proveedor) === String(proveedorSeleccionado);

      const cumpleOperador =
        !operadorSeleccionado ||
        String(compra.id_usuario) === String(operadorSeleccionado);

      return (
        cumpleFechaInicio && cumpleFechaFin && cumpleProveedor && cumpleOperador
      );
    });
  }, [fechaInicio, fechaFin, proveedorSeleccionado, operadorSeleccionado]);

  // Incorporar los nombres del proveedor y del operador
  const compras = useMemo(() => {
    return comprasFiltradas.map((compra) => {
      const proveedor = proveedoresDemo.find(
        (item) => item.id_proveedor === compra.id_proveedor,
      );

      const operador = usuariosDemo.find(
        (item) => item.id_usuario === compra.id_usuario,
      );

      return {
        ...compra,
        proveedor: proveedor?.nombre_proveedor ?? "Proveedor no disponible",
        operador: operador
          ? `${operador.nombre ?? ""} ${operador.apellido ?? ""}`.trim()
          : "Operador no disponible",
      };
    });
  }, [comprasFiltradas]);

  // Calcular el resumen del período
  const resumen = useMemo(() => {
    const totalComprado = compras.reduce(
      (total, compra) => total + Number(compra.total ?? 0),
      0,
    );

    return {
      cantidadCompras: compras.length,
      totalComprado,
      promedioCompra: compras.length > 0 ? totalComprado / compras.length : 0,
    };
  }, [compras]);

  // Columnas para los archivos de Excel y PDF
  const columnasExportacion = [
    {
      titulo: "Número de compra",
      campo: "numero_compra",
      ancho: 20,
    },
    {
      titulo: "Fecha",
      campo: "fecha_compra",
      ancho: 15,
    },
    {
      titulo: "Proveedor",
      campo: "proveedor",
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
      titulo: "Impuesto",
      campo: "impuesto",
      ancho: 15,
    },
    {
      titulo: "Total",
      campo: "total",
      ancho: 15,
    },
    {
      titulo: "Estado",
      campo: "estado",
      ancho: 15,
    },
  ];

  // Exportar a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_compras_periodo",
      nombreHoja: "Compras por periodo",
      columnas: columnasExportacion,
      datos: compras,
    });
  };

  // Exportar a PDF
  const descargarPDF = () => {
    const nombreProveedor =
      proveedoresDemo.find(
        (item) => String(item.id_proveedor) === String(proveedorSeleccionado),
      )?.nombre_proveedor ?? "Todos";

    const nombreOperador =
      usuariosDemo.find(
        (item) => String(item.id_usuario) === String(operadorSeleccionado),
      )?.nombre ?? "Todos";

    return exportarPDF({
      titulo: "Reporte de compras por período",
      nombreArchivo: "reporte_compras_periodo",
      orientacion: "landscape",
      parametros: [
        { etiqueta: "Fecha inicial", valor: fechaInicio || "Todas" },
        { etiqueta: "Fecha final", valor: fechaFin || "Todas" },
        { etiqueta: "Proveedor", valor: nombreProveedor },
        { etiqueta: "Operador", valor: nombreOperador },
      ],
      columnas: columnasExportacion,
      datos: compras,
      resumen: [
        { etiqueta: "Cantidad de compras", valor: resumen.cantidadCompras },
        { etiqueta: "Total comprado", valor: resumen.totalComprado.toFixed(2) },
        {
          etiqueta: "Promedio por compra",
          valor: resumen.promedioCompra.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta a Laravel
  const obtenerComprasDesdeAPI = async () => {
    const parametros = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      id_proveedor: proveedorSeleccionado,
      id_usuario: operadorSeleccionado,
    };

    console.log("Parámetros para consultar compras:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerComprasPorPeriodo(parametros);
  };

  return {
    // Filtros
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    proveedorSeleccionado,
    setProveedorSeleccionado,
    operadorSeleccionado,
    setOperadorSeleccionado,

    // Opciones de los filtros
    proveedores: proveedoresDemo,
    operadores: usuariosDemo,

    // Datos y resumen
    compras,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerComprasDesdeAPI,
  };
}
