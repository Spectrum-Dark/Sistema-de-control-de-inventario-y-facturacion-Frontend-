/*
|--------------------------------------------------------------------------
| SERVICIO DE EXPORTACIÓN DE REPORTES
|--------------------------------------------------------------------------
| Funciones reutilizables para generar archivos PDF y Excel.
| Los hooks de cada reporte preparan los datos y llaman a este servicio.
|--------------------------------------------------------------------------
*/

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// -------------------------------------------------------------------------
// EXPORTAR A EXCEL
// -------------------------------------------------------------------------

export function exportarExcel({
  nombreArchivo,
  nombreHoja = "Reporte",
  columnas,
  datos,
}) {
  if (!Array.isArray(datos) || datos.length === 0) {
    return {
      exito: false,
      mensaje: "No hay registros para exportar.",
    };
  }

  if (!Array.isArray(columnas) || columnas.length === 0) {
    return {
      exito: false,
      mensaje: "No se definieron las columnas del reporte.",
    };
  }

  try {
    // Construye cada fila usando las columnas indicadas.
    const filas = datos.map((registro) =>
      columnas.reduce((fila, columna) => {
        fila[columna.titulo] = registro[columna.campo];
        return fila;
      }, {}),
    );

    const hoja = XLSX.utils.json_to_sheet(filas);

    // Ajusta el ancho de las columnas cuando se especifica.
    hoja["!cols"] = columnas.map((columna) => ({
      wch: columna.ancho ?? 18,
    }));

    // Crea el libro y agrega la hoja.
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, nombreHoja.slice(0, 31));

    XLSX.writeFile(libro, asegurarExtension(nombreArchivo, ".xlsx"));

    return {
      exito: true,
      mensaje: "Archivo Excel generado correctamente.",
    };
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);

    return {
      exito: false,
      mensaje: "No se pudo generar el archivo Excel.",
    };
  }
}

// -------------------------------------------------------------------------
// EXPORTAR A PDF
// -------------------------------------------------------------------------

export function exportarPDF({
  titulo,
  nombreArchivo,
  parametros = [],
  columnas,
  datos,
  resumen = [],
  orientacion = "portrait",
}) {
  if (!Array.isArray(datos) || datos.length === 0) {
    return {
      exito: false,
      mensaje: "No hay registros para exportar.",
    };
  }

  if (!Array.isArray(columnas) || columnas.length === 0) {
    return {
      exito: false,
      mensaje: "No se definieron las columnas del reporte.",
    };
  }

  try {
    const documento = new jsPDF({
      orientation: orientacion,
    });

    // Título del reporte.
    documento.setFontSize(16);
    documento.text(titulo, 14, 18);

    // Parámetros utilizados en la consulta.
    documento.setFontSize(9);

    let posicionY = 27;

    parametros.forEach((parametro) => {
      documento.text(
        `${parametro.etiqueta}: ${parametro.valor}`,
        14,
        posicionY,
      );

      posicionY += 6;
    });

    // Encabezados de la tabla.
    const encabezados = columnas.map((columna) => columna.titulo);

    // Filas de la tabla.
    const filas = datos.map((registro) =>
      columnas.map((columna) => {
        const valor = registro[columna.campo];

        return valor === null || valor === undefined ? "" : String(valor);
      }),
    );

    autoTable(documento, {
      startY: posicionY + 2,
      head: [encabezados],
      body: filas,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      margin: {
        left: 14,
        right: 14,
      },
    });

    // Resumen final.
    if (resumen.length > 0) {
      let posicionResumen = documento.lastAutoTable.finalY + 10;

      // Si no hay espacio suficiente, crea otra página.
      if (posicionResumen > documento.internal.pageSize.height - 20) {
        documento.addPage();
        posicionResumen = 20;
      }

      documento.setFontSize(10);

      resumen.forEach((elemento) => {
        documento.text(
          `${elemento.etiqueta}: ${elemento.valor}`,
          14,
          posicionResumen,
        );

        posicionResumen += 7;
      });
    }

    documento.save(asegurarExtension(nombreArchivo, ".pdf"));

    return {
      exito: true,
      mensaje: "Archivo PDF generado correctamente.",
    };
  } catch (error) {
    console.error("Error al generar el archivo PDF:", error);

    return {
      exito: false,
      mensaje: "No se pudo generar el archivo PDF.",
    };
  }
}

// -------------------------------------------------------------------------
// UTILIDAD INTERNA
// -------------------------------------------------------------------------

function asegurarExtension(nombreArchivo, extension) {
  const nombre = String(nombreArchivo || "reporte")
    .trim()
    .replace(/[\\/:*?"<>|]/g, "_");

  return nombre.toLowerCase().endsWith(extension)
    ? nombre
    : `${nombre}${extension}`;
}
