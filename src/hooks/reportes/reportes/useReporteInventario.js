import { useMemo, useState } from "react";

import { productosDemo, categoriasDemo } from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteInventario() {
  // Filtros del reporte
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [estadoInventario, setEstadoInventario] = useState("");

  // Determinar el estado del stock sin modificar los datos originales
  const obtenerEstadoStock = (producto) => {
    const existencia = Number(producto.existencia_actual ?? 0);
    const minimo = Number(producto.existencia_minima ?? 0);

    if (existencia <= 0) {
      return "Agotado";
    }

    if (existencia <= minimo) {
      return "Bajo";
    }

    return "Normal";
  };

  // Filtrar productos por búsqueda, categoría y estado del stock
  const productosFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    return productosDemo.filter((producto) => {
        
      const coincideBusqueda =
        !textoBusqueda ||
        String(producto.codigo_producto ?? "")
          .toLowerCase()
          .includes(textoBusqueda) ||
        String(producto.nombre_producto ?? "")
          .toLowerCase()
          .includes(textoBusqueda);

      const coincideCategoria =
        !categoriaSeleccionada ||
        String(producto.id_categoria) === String(categoriaSeleccionada);

      const estado = obtenerEstadoStock(producto);

      const coincideEstado = !estadoInventario || estado === estadoInventario;

      return coincideBusqueda && coincideCategoria && coincideEstado;
    });
  }, [busqueda, categoriaSeleccionada, estadoInventario]);

  // Preparar la información para mostrar y exportar
  const productos = useMemo(() => {
    return productosFiltrados.map((producto) => {
      const categoria = categoriasDemo.find(
        (item) => item.id_categoria === producto.id_categoria,
      );

      return {
        ...producto,
        categoria: categoria?.nombre_categoria ?? "Sin categoría",
        estado_inventario: obtenerEstadoStock(producto),
        valor_compra:
          Number(producto.existencia_actual ?? 0) *
          Number(producto.precio_compra ?? 0),
        valor_venta:
          Number(producto.existencia_actual ?? 0) *
          Number(producto.precio_venta ?? 0),
      };
    });
  }, [productosFiltrados]);

  // Calcular indicadores del inventario filtrado
  const resumen = useMemo(() => {
    return productos.reduce(
      (acumulado, producto) => {
        acumulado.cantidadProductos += 1;
        acumulado.unidades += Number(producto.existencia_actual ?? 0);
        acumulado.valorCompra += Number(producto.valor_compra ?? 0);
        acumulado.valorVenta += Number(producto.valor_venta ?? 0);

        if (producto.estado_inventario === "Bajo") {
          acumulado.productosStockBajo += 1;
        }

        if (producto.estado_inventario === "Agotado") {
          acumulado.productosAgotados += 1;
        }

        return acumulado;
      },
      {
        cantidadProductos: 0,
        unidades: 0,
        valorCompra: 0,
        valorVenta: 0,
        productosStockBajo: 0,
        productosAgotados: 0,
      },
    );
  }, [productos]);

  // Columnas para Excel y PDF
  const columnasExportacion = [
    { titulo: "Código", campo: "codigo_producto", ancho: 15 },
    { titulo: "Producto", campo: "nombre_producto", ancho: 28 },
    { titulo: "Categoría", campo: "categoria", ancho: 22 },
    { titulo: "Precio de compra", campo: "precio_compra", ancho: 17 },
    { titulo: "Precio de venta", campo: "precio_venta", ancho: 17 },
    { titulo: "Existencia actual", campo: "existencia_actual", ancho: 16 },
    { titulo: "Stock mínimo", campo: "existencia_minima", ancho: 14 },
    { titulo: "Stock máximo", campo: "existencia_maxima", ancho: 14 },
    { titulo: "Estado", campo: "estado_inventario", ancho: 14 },
  ];

  // Exportar inventario actual a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_inventario_actual",
      nombreHoja: "Inventario actual",
      columnas: columnasExportacion,
      datos: productos,
    });
  };

  // Exportar inventario actual a PDF
  const descargarPDF = () => {
    const nombreCategoria =
      categoriasDemo.find(
        (item) => String(item.id_categoria) === String(categoriaSeleccionada),
      )?.nombre_categoria ?? "Todas";

    return exportarPDF({
      titulo: "Reporte de inventario actual",
      nombreArchivo: "reporte_inventario_actual",
      orientacion: "landscape",
      parametros: [
        { etiqueta: "Búsqueda", valor: busqueda || "Todos los productos" },
        { etiqueta: "Categoría", valor: nombreCategoria },
        { etiqueta: "Estado del stock", valor: estadoInventario || "Todos" },
      ],
      columnas: columnasExportacion,
      datos: productos,
      resumen: [
        {
          etiqueta: "Productos registrados en el resultado",
          valor: resumen.cantidadProductos,
        },
        { etiqueta: "Unidades disponibles", valor: resumen.unidades },
        {
          etiqueta: "Productos con stock bajo",
          valor: resumen.productosStockBajo,
        },
        { etiqueta: "Productos agotados", valor: resumen.productosAgotados },
        {
          etiqueta: "Valor estimado a precio de compra",
          valor: resumen.valorCompra.toFixed(2),
        },
        {
          etiqueta: "Valor potencial a precio de venta",
          valor: resumen.valorVenta.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta al backend Laravel
  const obtenerInventarioDesdeAPI = async () => {
    const parametros = {
      busqueda,
      id_categoria: categoriaSeleccionada,
      estado_inventario: estadoInventario,
    };

    console.log("Parámetros para consultar inventario:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerInventario(parametros);
  };

  return {
    // Filtros
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    estadoInventario,
    setEstadoInventario,

    // Opciones
    categorias: categoriasDemo,
    estadosInventario: ["Normal", "Bajo", "Agotado"],

    // Datos y resumen
    productos,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerInventarioDesdeAPI,
  };
}
