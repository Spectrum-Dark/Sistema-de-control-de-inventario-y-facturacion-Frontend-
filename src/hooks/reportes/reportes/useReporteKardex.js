import { useMemo, useState } from "react";

import {
  movimientosInventarioDemo,
  productosDemo,
  usuariosDemo,
} from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteKardex() {
  // Filtros del reporte
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Filtrar los movimientos según los criterios seleccionados
  const movimientosFiltrados = useMemo(() => {
    return movimientosInventarioDemo.filter((movimiento) => {
      const cumpleProducto =
        !productoSeleccionado ||
        String(movimiento.id_producto) === String(productoSeleccionado);

      const cumpleTipo =
        !tipoMovimiento || movimiento.tipo_movimiento === tipoMovimiento;

      const cumpleFechaInicio =
        !fechaInicio || movimiento.fecha_movimiento >= fechaInicio;

      const cumpleFechaFin =
        !fechaFin || movimiento.fecha_movimiento <= fechaFin;

      return (
        cumpleProducto && cumpleTipo && cumpleFechaInicio && cumpleFechaFin
      );
    });
  }, [productoSeleccionado, tipoMovimiento, fechaInicio, fechaFin]);

  // Ordenar cronológicamente y enriquecer los movimientos
  const movimientos = useMemo(() => {
    return [...movimientosFiltrados]
      .sort((a, b) => {
        const comparacionFecha = String(a.fecha_movimiento).localeCompare(
          String(b.fecha_movimiento),
        );

        return comparacionFecha || a.id_movimiento - b.id_movimiento;
      })
      .map((movimiento) => {
        const producto = productosDemo.find(
          (item) => item.id_producto === movimiento.id_producto,
        );

        const usuario = usuariosDemo.find(
          (item) => item.id_usuario === movimiento.id_usuario,
        );

        return {
          ...movimiento,
          codigo_producto: producto?.codigo_producto ?? "Sin código",
          nombre_producto:
            producto?.nombre_producto ?? "Producto no disponible",
          usuario: usuario
            ? `${usuario.nombre ?? ""} ${usuario.apellido ?? ""}`.trim()
            : "Usuario no disponible",
          entrada:
            movimiento.tipo_movimiento === "Entrada"
              ? Number(movimiento.cantidad ?? 0)
              : 0,
          salida:
            movimiento.tipo_movimiento === "Salida"
              ? Number(movimiento.cantidad ?? 0)
              : 0,
          saldo: Number(movimiento.existencia_resultante ?? 0),
        };
      });
  }, [movimientosFiltrados]);

  // Calcular entradas, salidas y saldo del resultado filtrado
  const resumen = useMemo(() => {
    const totalEntradas = movimientos.reduce(
      (total, movimiento) => total + movimiento.entrada,
      0,
    );

    const totalSalidas = movimientos.reduce(
      (total, movimiento) => total + movimiento.salida,
      0,
    );

    const ultimoMovimiento = movimientos[movimientos.length - 1];

    return {
      cantidadMovimientos: movimientos.length,
      totalEntradas,
      totalSalidas,
      saldoUltimoMovimiento: ultimoMovimiento ? ultimoMovimiento.saldo : null,
    };
  }, [movimientos]);

  // Columnas para Excel y PDF
  const columnasExportacion = [
    { titulo: "Fecha", campo: "fecha_movimiento", ancho: 19 },
    { titulo: "Código", campo: "codigo_producto", ancho: 15 },
    { titulo: "Producto", campo: "nombre_producto", ancho: 25 },
    { titulo: "Tipo", campo: "tipo_movimiento", ancho: 13 },
    { titulo: "Cantidad", campo: "cantidad", ancho: 12 },
    { titulo: "Entrada", campo: "entrada", ancho: 12 },
    { titulo: "Salida", campo: "salida", ancho: 12 },
    {
      titulo: "Existencia anterior",
      campo: "existencia_anterior",
      ancho: 17,
    },
    {
      titulo: "Existencia resultante",
      campo: "existencia_resultante",
      ancho: 18,
    },
    {
      titulo: "Referencia",
      campo: "referencia_operacion",
      ancho: 18,
    },
    { titulo: "Usuario", campo: "usuario", ancho: 22 },
    { titulo: "Observación", campo: "observacion", ancho: 25 },
  ];

  // Exportar el Kardex a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_kardex",
      nombreHoja: "Kardex",
      columnas: columnasExportacion,
      datos: movimientos,
    });
  };

  // Exportar el Kardex a PDF
  const descargarPDF = () => {
    const producto = productosDemo.find(
      (item) => String(item.id_producto) === String(productoSeleccionado),
    );

    return exportarPDF({
      titulo: "Reporte Kardex de inventario",
      nombreArchivo: "reporte_kardex",
      orientacion: "landscape",
      parametros: [
        {
          etiqueta: "Producto",
          valor: producto
            ? `${producto.codigo_producto} - ${producto.nombre_producto}`
            : "Todos los productos",
        },
        {
          etiqueta: "Tipo de movimiento",
          valor: tipoMovimiento || "Todos",
        },
        {
          etiqueta: "Fecha inicial",
          valor: fechaInicio || "Todas",
        },
        {
          etiqueta: "Fecha final",
          valor: fechaFin || "Todas",
        },
      ],
      columnas: columnasExportacion,
      datos: movimientos,
      resumen: [
        {
          etiqueta: "Cantidad de movimientos",
          valor: resumen.cantidadMovimientos,
        },
        {
          etiqueta: "Total de entradas",
          valor: resumen.totalEntradas,
        },
        {
          etiqueta: "Total de salidas",
          valor: resumen.totalSalidas,
        },
        {
          etiqueta: "Saldo del último movimiento mostrado",
          valor: resumen.saldoUltimoMovimiento ?? "Sin movimientos",
        },
      ],
    });
  };

  // Preparar la futura consulta a Laravel
  const obtenerKardexDesdeAPI = async () => {
    const parametros = {
      id_producto: productoSeleccionado,
      tipo_movimiento: tipoMovimiento,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    console.log("Parámetros para consultar Kardex:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerKardex(parametros);
  };

  return {
    // Filtros
    productoSeleccionado,
    setProductoSeleccionado,
    tipoMovimiento,
    setTipoMovimiento,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,

    // Opciones de filtro
    productosDisponibles: productosDemo,
    tiposMovimiento: ["Entrada", "Salida", "Ajuste"],

    // Datos y resumen
    movimientos,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerKardexDesdeAPI,
  };
}
