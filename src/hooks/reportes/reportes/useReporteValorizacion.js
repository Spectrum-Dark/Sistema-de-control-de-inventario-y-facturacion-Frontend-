
import { useMemo, useState } from "react";

import {
  productosDemo,
  categoriasDemo,
} from "../services/useDataReportes";

import {
  exportarExcel,
  exportarPDF,
} from "../services/useExportacion";

export default function useReporteValorizacion() {
  // Filtros del reporte
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Filtrar los productos por nombre, código y categoría
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

      return coincideBusqueda && coincideCategoria;
    });
  }, [busqueda, categoriaSeleccionada]);

  // Calcular la valorización de cada producto
  const productos = useMemo(() => {
    return productosFiltrados.map((producto) => {
      const categoria = categoriasDemo.find(
        (item) => item.id_categoria === producto.id_categoria
      );

      const existencia = Number(producto.existencia_actual ?? 0);
      const precioCompra = Number(producto.precio_compra ?? 0);
      const precioVenta = Number(producto.precio_venta ?? 0);

      return {
        ...producto,
        categoria: categoria?.nombre_categoria ?? "Sin categoría",
        valor_inventario: existencia * precioCompra,
        valor_potencial_venta: existencia * precioVenta,
        diferencia_potencial: existencia * (precioVenta - precioCompra),
      };
    });
  }, [productosFiltrados]);

  // Calcular los totales de valorización
  const resumen = useMemo(() => {
    return productos.reduce(
      (acumulado, producto) => {
        acumulado.cantidadProductos += 1;
        acumulado.unidades += Number(producto.existencia_actual ?? 0);
        acumulado.valorInventario += Number(producto.valor_inventario ?? 0);
        acumulado.valorPotencialVenta += Number(
          producto.valor_potencial_venta ?? 0
        );
        acumulado.diferenciaPotencial += Number(
          producto.diferencia_potencial ?? 0
        );

        return acumulado;
      },
      {
        cantidadProductos: 0,
        unidades: 0,
        valorInventario: 0,
        valorPotencialVenta: 0,
        diferenciaPotencial: 0,
      }
    );
  }, [productos]);

  // Columnas para las exportaciones
  const columnasExportacion = [
    { titulo: "Código", campo: "codigo_producto", ancho: 15 },
    { titulo: "Producto", campo: "nombre_producto", ancho: 28 },
    { titulo: "Categoría", campo: "categoria", ancho: 22 },
    { titulo: "Existencia", campo: "existencia_actual", ancho: 13 },
    { titulo: "Precio de compra", campo: "precio_compra", ancho: 17 },
    { titulo: "Valor inventario", campo: "valor_inventario", ancho: 17 },
    { titulo: "Precio de venta", campo: "precio_venta", ancho: 17 },
    {
      titulo: "Valor potencial venta",
      campo: "valor_potencial_venta",
      ancho: 20,
    },
    {
      titulo: "Diferencia potencial",
      campo: "diferencia_potencial",
      ancho: 19,
    },
  ];

  // Exportar la valorización a Excel
  const descargarExcel = () => {
    return exportarExcel({
      nombreArchivo: "reporte_valorizacion_inventario",
      nombreHoja: "Valorizacion",
      columnas: columnasExportacion,
      datos: productos,
    });
  };

  // Exportar la valorización a PDF
  const descargarPDF = () => {
    const nombreCategoria =
      categoriasDemo.find(
        (item) =>
          String(item.id_categoria) === String(categoriaSeleccionada)
      )?.nombre_categoria ?? "Todas";

    return exportarPDF({
      titulo: "Reporte de valorización del inventario",
      nombreArchivo: "reporte_valorizacion_inventario",
      orientacion: "landscape",
      parametros: [
        {
          etiqueta: "Búsqueda",
          valor: busqueda || "Todos los productos",
        },
        {
          etiqueta: "Categoría",
          valor: nombreCategoria,
        },
        {
          etiqueta: "Método de cálculo",
          valor: "Existencia actual × precio de compra registrado",
        },
      ],
      columnas: columnasExportacion,
      datos: productos,
      resumen: [
        {
          etiqueta: "Productos incluidos",
          valor: resumen.cantidadProductos,
        },
        {
          etiqueta: "Unidades en inventario",
          valor: resumen.unidades,
        },
        {
          etiqueta: "Valor estimado del inventario",
          valor: resumen.valorInventario.toFixed(2),
        },
        {
          etiqueta: "Valor potencial de venta",
          valor: resumen.valorPotencialVenta.toFixed(2),
        },
        {
          etiqueta: "Diferencia potencial",
          valor: resumen.diferenciaPotencial.toFixed(2),
        },
      ],
    });
  };

  // Preparar la futura consulta a la API REST de Laravel
  const obtenerValorizacionDesdeAPI = async () => {
    const parametros = {
      busqueda,
      id_categoria: categoriaSeleccionada,
    };

    console.log("Parámetros para consultar valorización:", parametros);

    // Cuando el backend esté listo:
    // return await reporteService.obtenerValorizacion(parametros);
  };

  return {
    // Filtros
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,

    // Opciones de filtro
    categorias: categoriasDemo,

    // Datos y resumen
    productos,
    resumen,

    // Exportaciones
    descargarExcel,
    descargarPDF,

    // Integración futura
    obtenerValorizacionDesdeAPI,
  };
}
