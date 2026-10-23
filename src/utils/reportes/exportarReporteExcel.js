export async function exportarReporteExcel({ titulo, columnas, filas }) {
  const { default: ExcelJS } = await import("exceljs");
  const libro = new ExcelJS.Workbook();
  const hoja = libro.addWorksheet("Reporte");

  hoja.columns = columnas.map((columna) => ({
    header: columna.etiqueta,
    key: columna.etiqueta,
    width: Math.min(Math.max(columna.etiqueta.length + 4, 16), 32),
  }));

  filas.forEach((fila) => {
    const valores = Object.fromEntries(
      columnas.map((columna) => [columna.etiqueta, columna.valor(fila) ?? ""]),
    );
    hoja.addRow(valores);
  });

  const encabezado = hoja.getRow(1);
  encabezado.height = 24;
  encabezado.font = { bold: true, color: { argb: "FFFFFFFF" } };
  encabezado.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E293B" },
  };
  encabezado.alignment = { vertical: "middle", wrapText: true };
  hoja.views = [{ state: "frozen", ySplit: 1 }];
  hoja.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columnas.length },
  };

  const contenido = await libro.xlsx.writeBuffer();
  const archivo = new Blob([contenido], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");
  const nombreSeguro = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  enlace.href = url;
  enlace.download = `reporte-${nombreSeguro || "inventario"}.xlsx`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}
