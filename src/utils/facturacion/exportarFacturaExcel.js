import { fechaFactura } from './formato';

/**
 * Exporta los datos de una factura a un archivo de Excel (.xlsx) con un diseño personalizado.
 * Utiliza la librería ExcelJS cargada dinámicamente.
 *
 * @param {Object} factura - Objeto con los datos de la factura, venta, cliente y detalles.
 */
export async function exportarFacturaExcel(factura) {
  // Carga dinámica de la librería ExcelJS para optimizar el rendimiento inicial (Code Splitting)
  const { default: ExcelJS } = await import('exceljs');

  // Creación del libro de trabajo y definición de metadatos básicos
  const libro = new ExcelJS.Workbook();
  libro.creator = 'Sistema de Repuestos';
  libro.created = new Date();

  // Añadir una hoja llamada "Factura"
  const hoja = libro.addWorksheet('Factura');

  // Configuración del ancho de las 5 columnas principales (A - E)
  hoja.columns = [
    { width: 31 }, // Columna A: Producto / Etiquetas
    { width: 20.71 }, // Columna B: Código / Valore de metadatos
    { width: 14 }, // Columna C: Cantidad / Sección de Observaciones
    { width: 18 }, // Columna D: Precio unitario
    { width: 18 }, // Columna E: Subtotal / Totales
  ];

  // Configuración de la impresión en papel (Ajustar a 1 página de ancho, orientación vertical)
  hoja.pageSetup = {
    orientation: 'portrait',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: {
      left: 0.25,
      right: 0.25,
      top: 0.35,
      bottom: 0.35,
      header: 0.15,
      footer: 0.15,
    },
  };

  // Oculta las líneas de cuadrícula para dar un aspecto visual de documento impreso o PDF
  hoja.views = [{ showGridLines: false }];

  // --- DEFINICIÓN DE ESTILOS REUTILIZABLES ---
  // Estilo de borde delgado en color gris
  const borde = {
    top: { style: 'thin', color: { argb: 'FF808080' } },
    left: { style: 'thin', color: { argb: 'FF808080' } },
    bottom: { style: 'thin', color: { argb: 'FF808080' } },
    right: { style: 'thin', color: { argb: 'FF808080' } },
  };

  // Relleno sólido azul oscuro para encabezados
  const colorEncabezado = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF002060' },
  };

  // Alineación centrada vertical y horizontalmente con ajuste de texto automático
  const alinearCentro = {
    horizontal: 'center',
    vertical: 'middle',
    wrapText: true,
  };

  // Desestructuración segura para evitar errores si no vienen los objetos anidados
  const venta = factura.venta ?? {};
  const cliente = venta.cliente ?? {};

  // --- ENCABEZADO PRINCIPAL ---
  // Fila 1: Título "FACTURA"
  hoja.mergeCells('A1:E1');
  hoja.getCell('A1').value = 'FACTURA';
  hoja.getCell('A1').font = {
    bold: true,
    size: 14,
    color: { argb: 'FFFFFFFF' },
  }; // Texto blanco
  hoja.getCell('A1').fill = colorEncabezado;
  hoja.getCell('A1').alignment = alinearCentro;
  hoja.getRow(1).height = 25;

  // Fila 2: Número de factura
  hoja.mergeCells('A2:E2');
  hoja.getCell('A2').value = String(factura.numero_factura ?? '');
  hoja.getCell('A2').font = { bold: true, size: 11 };
  hoja.getCell('A2').alignment = alinearCentro;
  hoja.getRow(2).height = 22;

  // --- SECCIÓN DE METADATOS Y CLIENTE (Filas 3 a 7) ---
  const datos = [
    ['Fecha de emisión', fechaFactura(factura.fecha_emision)],
    ['Número de venta', String(venta.numero_venta ?? '')],
    ['Cliente', String(cliente.nombre_cliente ?? '')],
    ['Identificación', String(cliente.identificacion ?? '')],
    ['Estado', String(factura.estado ?? '')],
  ];

  // Inserción iterativa de las etiquetas y valores en las columnas A y B
  datos.forEach(([etiqueta, valor], indice) => {
    const fila = indice + 3;
    hoja.getCell(fila, 1).value = etiqueta;
    hoja.getCell(fila, 1).font = { bold: true };
    hoja.getCell(fila, 2).value = valor;
    hoja.getCell(fila, 2).alignment = alinearCentro;
    hoja.getCell(fila, 1).border = borde;
    hoja.getCell(fila, 2).border = borde;
  });

  // Ajustes de alineación específicos para la primera fila de datos
  hoja.getCell('A3').alignment = {
    horizontal: 'left',
    vertical: 'middle',
    wrapText: true,
  };
  hoja.getCell('B3').alignment = {
    horizontal: 'center',
    vertical: 'middle',
    wrapText: true,
  };
  hoja.getRow(3).height = 30;

  // --- SECCIÓN DE OBSERVACIONES ---
  // Encabezado de Observaciones (C3:E3)
  hoja.mergeCells('C3:E3');
  hoja.getCell('C3').value = 'Observaciones';
  hoja.getCell('C3').fill = colorEncabezado;
  hoja.getCell('C3').font = { bold: true, color: { argb: 'FFFFFFFF' } };
  hoja.getCell('C3').alignment = alinearCentro;

  // Cuerpo de Observaciones fusionado (C4:E7)
  hoja.mergeCells('C4:E7');
  hoja.getCell('C4').value = String(factura.observaciones ?? '');
  hoja.getCell('C4').alignment = { ...alinearCentro, vertical: 'top' };
  hoja.getCell('C4').border = borde;

  // Espaciado vertical (Fila 8 vacía)
  hoja.getRow(8).height = 9;

  // --- TABLA DE DETALLES DE PRODUCTOS ---
  // Encabezado de la tabla de productos
  const encabezadoDetalles = hoja.addRow([
    'Producto',
    'Código',
    'Cantidad',
    'Precio unitario',
    'Subtotal',
  ]);
  encabezadoDetalles.height = 24;
  encabezadoDetalles.eachCell((celda) => {
    celda.fill = colorEncabezado;
    celda.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    celda.alignment = alinearCentro;
    celda.border = borde;
  });

  // Inserción de las filas de productos/artículos
  for (const detalle of venta.detalles ?? []) {
    const fila = hoja.addRow([
      String(detalle.producto?.nombre_producto ?? 'Producto'),
      String(detalle.producto?.codigo_producto ?? ''),
      Number(detalle.cantidad ?? 0),
      Number(detalle.precio_unitario ?? 0),
      Number(detalle.subtotal ?? 0),
    ]);

    // Aplicación de bordes, alineación y formato de moneda en Córdobas (C$)
    fila.eachCell((celda, indice) => {
      celda.border = borde;
      celda.alignment = {
        vertical: 'middle',
        wrapText: true,
        horizontal: indice === 1 ? 'left' : 'center',
      };
      // Aplicar formato de moneda a las columnas 4 (Precio unitario) y 5 (Subtotal)
      if (indice === 4 || indice === 5) celda.numFmt = '"C$"#,##0.00';
    });
  }

  // --- RESUMEN DE TOTALES ---
  hoja.addRow([]); // Fila vacía de separación

  for (const [etiqueta, valor] of [
    ['Subtotal', factura.subtotal],
    ['Impuesto', factura.impuesto],
    ['Total', factura.total],
  ]) {
    const fila = hoja.addRow([etiqueta, '', '', '', Number(valor ?? 0)]);

    // Destacar en negrita si es la fila de "Total"
    fila.getCell(1).font = { bold: etiqueta === 'Total' };
    fila.getCell(5).font = { bold: etiqueta === 'Total' };
    fila.getCell(5).numFmt = '"C$"#,##0.00';
    fila.getCell(5).alignment = { horizontal: 'center' };

    // Borde superior azul para resaltar la fila de Total
    if (etiqueta === 'Total') {
      fila.getCell(1).border = {
        top: { style: 'thin', color: { argb: 'FF002060' } },
      };
      fila.getCell(5).border = {
        top: { style: 'thin', color: { argb: 'FF002060' } },
      };
    }
  }

  // --- DESCARGA DEL ARCHIVO EN EL NAVEGADOR ---
  // Delimita el área de impresión exacta basada en las filas agregadas
  hoja.pageSetup.printArea = `A1:E${hoja.rowCount}`;

  // Genera el buffer del archivo Excel
  const contenido = await libro.xlsx.writeBuffer();

  // Crea un objeto Blob y su URL temporal
  const blob = new Blob([contenido], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);

  // Saneamiento del nombre del archivo eliminando caracteres no válidos
  const nombreSeguro = String(
    factura.numero_factura ?? factura.id_factura ?? 'factura'
  )
    .replace(/[<>:"/\\|?*]+/g, '-')
    .trim();

  // Creación y ejecución dinámica del enlace <a> para forzar la descarga
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `factura-${nombreSeguro || 'registro'}.xlsx`;
  enlace.click();

  // Liberación de la memoria liberando el objeto URL creado
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
