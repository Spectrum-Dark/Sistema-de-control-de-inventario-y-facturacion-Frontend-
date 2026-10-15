import { useMemo, useState } from "react";

import { productosDemo, categoriasDemo } from "../services/useDataReportes";

import { exportarExcel, exportarPDF } from "../services/useExportacion";

export default function useReporteStockBajo() {
  // Filtros del reporte
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  // Obtener el estado del inventario
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

  // Filtrar los productos que necesitan atención
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

      // Excluir productos normales del reporte de stock bajo
      const necesitaReposicion = estado !== "Normal";

      const coincideEstado =
        !estadoSeleccionado || estado === estadoSeleccionado;

      return (
        coincideBusqueda &&
        coincideCategoria &&
        necesitaReposicion &&
        coincideEstado
      );
    });
  }, [busqueda, categoriaSeleccionada, estadoSeleccionado]);

  // Agregar la categoría, el estado y la cantidad sugerida de reposición
  const productos = useMemo(() => {
    return productosFiltrados.map((producto) => {
      const categoria = categoriasDemo.find(
        (item) => item.id_categoria === producto.id_categoria,
      );

      const existencia = Number(producto.existencia_actual ?? 0);
      const minimo = Number(producto.existencia_minima ?? 0);
      const maximo = Number(producto.existencia_maxima ?? 0);

      return {
        ...producto,
        categoria: categoria?.nombre_categoria ?? "Sin categoría",
        estado_stock: obtenerEstadoStock(producto),
        unidades_para_minimo: Math.max(0, minimo - existencia),
        unidades_para_maximo: Math.max(0, maximo - existencia),
      };
    });
  }, [productosFiltrados]);

  // Calcular indicadores del reporte
  const resumen = useMemo(() => {
    return productos.reduce(
      (acumulado, producto) => {
        acumulado.cantidadProductos += 1;
        acumulado.unidadesDisponibles += Number(
          producto.existencia_actual ?? 0,
        );

        if (producto.estado_stock === "Bajo") {
          acumulado.productosStockBajo += 1;
        }

        if (producto.estado_stock === "Agotado") {
          acumulado.productosAgotados += 1;
        }

        acumulado.valorReposicionEstimada +=
          producto.unidades_para_maximo * Number(producto.precio_compra ?? 0);

        return acumulado;
      },
      {
        cantidadProductos: 0,
        unidadesDisponibles: 0,
        productosStockBajo: 0,
        productosAgotados: 0,
        valorReposicionEstimada: 0,
      },
    );
  }, [productos]);

  // Columnas para Excel y PDF
  const columnasExportacion = [
    { titulo: "Código", campo: "codigo_producto", ancho: 14 },
    { titulo: "Producto", campo: "nombre_producto", ancho: 25 },
    { titulo: "Categoría", campo: "categoria", ancho: 20 },
    { titulo: "Existencia", campo: "existencia_actual", ancho: 12 },
    { titulo: "Stock mínimo", campo: "existencia_minima", ancho: 13 },
    { titulo: "Stock máximo", campo: "existencia_maxima", ancho: 13 },
    { titulo: "Estado", campo: "estado_stock", ancho: 13 },
    {
      titulo: "Unidades para mínimo",
      campo: "unidades_para_minimo",
      ancho: 18,
    },
    {
      titulo: "Unidades para máximo",
      campo: "unidades_para_maximo",
      ancho: 18,
    },
    { titulo: "Precio de compra", campo: "precio_compra", ancho: 16 },
  ];

  // Exportar el reporte a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_stock_bajo",
      nombreHoja: "Stock bajo",
      columnas: columnasExportacion,
      datos: productos,
    });
  };

  // Exportar el reporte a PDF
  const descargarPDF = () => {
    const nombreCategoria =
      categoriasDemo.find(
        (item) => String(item.id_categoria) === String(categoriaSeleccionada),
      )?.nombre_categoria ?? "Todas";

    return exportarPDF({
      titulo: "Reporte de stock bajo",
      nombreArchivo: "reporte_stock_bajo",
      orientacion: "landscape",
      parametros: [
        { etiqueta: "Búsqueda", valor: busqueda || "Todos los productos" },
        { etiqueta: "Categoría", valor: nombreCategoria },
        { etiqueta: "Estado", valor: estadoSeleccionado || "Bajo y agotado" },
      ],
      columnas: columnasExportacion,
      datos: productos,
      resumen: [
        {
          etiqueta: "Productos que requieren atención",
          valor: resumen.cantidadProductos,
        },
        {
          etiqueta: "Productos con stock bajo",
          valor: resumen.productosStockBajo,
        },
        {
          etiqueta: "Productos agotados",
          valor: resumen.productosAgotados,
        },
        {
          etiqueta: "Unidades disponibles",
          valor: resumen.unidadesDisponibles,
        },
        {
          etiqueta: "Costo estimado para alcanzar el stock máximo",
          valor: resumen.valorReposicionEstimada.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta a la API REST de Laravel
  const obtenerStockBajoDesdeAPI = async () => {
    const parametros = {
      busqueda,
      id_categoria: categoriaSeleccionada,
      estado: estadoSeleccionado,
    };

    console.log("Parámetros para consultar stock bajo:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerStockBajo(parametros);
  };

  return {
    // Filtros
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    estadoSeleccionado,
    setEstadoSeleccionado,

    // Opciones
    categorias: categoriasDemo,
    estadosStock: ["Bajo", "Agotado"],

    // Datos y resumen
    productos,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerStockBajoDesdeAPI,
  };
}
