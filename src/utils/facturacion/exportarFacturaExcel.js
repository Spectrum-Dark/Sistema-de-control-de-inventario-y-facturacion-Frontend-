import { fechaFactura } from "./formato";

export async function exportarFacturaExcel(factura) {
  const { default: ExcelJS } = await import("exceljs");
  const libro = new ExcelJS.Workbook();
  libro.creator = "Sistema de Repuestos";
  libro.created = new Date();

  const hoja = libro.addWorksheet("Factura");
  hoja.columns = [
    { width: 31 },
    { width: 20.71 },
    { width: 14 },
    { width: 18 },
    { width: 18 },
  ];
  hoja.pageSetup = {
    orientation: "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: { left: 0.25, right: 0.25, top: 0.35, bottom: 0.35, header: 0.15, footer: 0.15 },
  };
  hoja.views = [{ showGridLines: false }];

  const borde = {
    top: { style: "thin", color: { argb: "FF808080" } },
    left: { style: "thin", color: { argb: "FF808080" } },
    bottom: { style: "thin", color: { argb: "FF808080" } },
    right: { style: "thin", color: { argb: "FF808080" } },
  };
  const colorEncabezado = { type: "pattern", pattern: "solid", fgColor: { argb: "FF002060" } };
  const alinearCentro = { horizontal: "center", vertical: "middle", wrapText: true };
  const venta = factura.venta ?? {};
  const cliente = venta.cliente ?? {};

  hoja.mergeCells("A1:E1");
  hoja.getCell("A1").value = "FACTURA";
  hoja.getCell("A1").font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  hoja.getCell("A1").fill = colorEncabezado;
  hoja.getCell("A1").alignment = alinearCentro;
  hoja.getRow(1).height = 25;

  hoja.mergeCells("A2:E2");
  hoja.getCell("A2").value = String(factura.numero_factura ?? "");
  hoja.getCell("A2").font = { bold: true, size: 11 };
  hoja.getCell("A2").alignment = alinearCentro;
  hoja.getRow(2).height = 22;

  const datos = [
    ["Fecha de emisión", fechaFactura(factura.fecha_emision)],
    ["Número de venta", String(venta.numero_venta ?? "")],
    ["Cliente", String(cliente.nombre_cliente ?? "")],
    ["Identificación", String(cliente.identificacion ?? "")],
    ["Estado", String(factura.estado ?? "")],
  ];
  datos.forEach(([etiqueta, valor], indice) => {
    const fila = indice + 3;
    hoja.getCell(fila, 1).value = etiqueta;
    hoja.getCell(fila, 1).font = { bold: true };
    hoja.getCell(fila, 2).value = valor;
    hoja.getCell(fila, 2).alignment = alinearCentro;
    hoja.getCell(fila, 1).border = borde;
    hoja.getCell(fila, 2).border = borde;
  });
  hoja.getCell("A3").alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  hoja.getCell("B3").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  hoja.getRow(3).height = 30;

  hoja.mergeCells("C3:E3");
  hoja.getCell("C3").value = "Observaciones";
  hoja.getCell("C3").fill = colorEncabezado;
  hoja.getCell("C3").font = { bold: true, color: { argb: "FFFFFFFF" } };
  hoja.getCell("C3").alignment = alinearCentro;
  hoja.mergeCells("C4:E7");
  hoja.getCell("C4").value = String(factura.observaciones ?? "");
  hoja.getCell("C4").alignment = { ...alinearCentro, vertical: "top" };
  hoja.getCell("C4").border = borde;
  hoja.getRow(8).height = 9;

  const encabezadoDetalles = hoja.addRow(["Producto", "Código", "Cantidad", "Precio unitario", "Subtotal"]);
  encabezadoDetalles.height = 24;
  encabezadoDetalles.eachCell((celda) => {
    celda.fill = colorEncabezado;
    celda.font = { bold: true, color: { argb: "FFFFFFFF" } };
    celda.alignment = alinearCentro;
    celda.border = borde;
  });

  for (const detalle of venta.detalles ?? []) {
    const fila = hoja.addRow([
      String(detalle.producto?.nombre_producto ?? "Producto"),
      String(detalle.producto?.codigo_producto ?? ""),
      Number(detalle.cantidad ?? 0),
      Number(detalle.precio_unitario ?? 0),
      Number(detalle.subtotal ?? 0),
    ]);
    fila.eachCell((celda, indice) => {
      celda.border = borde;
      celda.alignment = { vertical: "middle", wrapText: true, horizontal: indice === 1 ? "left" : "center" };
      if (indice === 4 || indice === 5) celda.numFmt = '"C$"#,##0.00';
    });
  }

  hoja.addRow([]);
  for (const [etiqueta, valor] of [
    ["Subtotal", factura.subtotal],
    ["Impuesto", factura.impuesto],
    ["Total", factura.total],
  ]) {
    const fila = hoja.addRow([etiqueta, "", "", "", Number(valor ?? 0)]);
    fila.getCell(1).font = { bold: etiqueta === "Total" };
    fila.getCell(5).font = { bold: etiqueta === "Total" };
    fila.getCell(5).numFmt = '"C$"#,##0.00';
    fila.getCell(5).alignment = { horizontal: "center" };
    if (etiqueta === "Total") {
      fila.getCell(1).border = { top: { style: "thin", color: { argb: "FF002060" } } };
      fila.getCell(5).border = { top: { style: "thin", color: { argb: "FF002060" } } };
    }
  }

  hoja.pageSetup.printArea = `A1:E${hoja.rowCount}`;
  const contenido = await libro.xlsx.writeBuffer();
  const blob = new Blob([contenido], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  const nombreSeguro = String(factura.numero_factura ?? factura.id_factura ?? "factura")
    .replace(/[<>:"/\\|?*]+/g, "-")
    .trim();
  enlace.href = url;
  enlace.download = `factura-${nombreSeguro || "registro"}.xlsx`;
  enlace.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
