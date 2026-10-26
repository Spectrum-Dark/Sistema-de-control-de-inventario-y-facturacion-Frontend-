// Función asíncrona exportada que recibe el título del reporte, la definición de columnas y los datos (filas)
export async function exportarReporteExcel({ titulo, columnas, filas }) {
  // Carga diferida (lazy loading) de ExcelJS mediante importación dinámica para optimizar el bundle inicial
  const { default: ExcelJS } = await import('exceljs');

  // Instanciación del libro de trabajo y creación de la hoja principal nombrada "Reporte"
  const libro = new ExcelJS.Workbook();
  const hoja = libro.addWorksheet('Reporte');

  // Definición de las columnas en ExcelJS mapping etiquetas y calculando un ancho dinámico y responsivo
  hoja.columns = columnas.map((columna) => ({
    header: columna.etiqueta,
    key: columna.etiqueta,
    // El ancho se adapta al tamaño del encabezado con un margen, acotado entre un mínimo de 16 y un máximo de 32
    width: Math.min(Math.max(columna.etiqueta.length + 4, 16), 32),
  }));

  // Procesamiento y transformación de cada fila de datos según las funciones selectoras de cada columna
  filas.forEach((fila) => {
    // Mapeo clave-valor asociando el encabezado con el resultado de formatear la fila (con fallback a cadena vacía)
    const valores = Object.fromEntries(
      columnas.map((columna) => [columna.etiqueta, columna.valor(fila) ?? ''])
    );
    // Inserción de la fila mapeada dentro de la hoja de cálculo
    hoja.addRow(valores);
  });

  // Estilizado del encabezado (fila 1) para mejorar la usabilidad visual
  const encabezado = hoja.getRow(1);
  encabezado.height = 24; // Altura personalizada de la fila de encabezados
  encabezado.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // Texto en negrita y color blanco
  encabezado.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E293B' }, // Fondo oscuro elegante (color Slate)
  };
  encabezado.alignment = { vertical: 'middle', wrapText: true }; // Alineación vertical centrada y ajuste de texto

  // Inmovilización de la primera fila para mantener visibles los encabezados durante el desplazamiento
  hoja.views = [{ state: 'frozen', ySplit: 1 }];

  // Activación del filtro automático para todas las columnas de la primera fila
  hoja.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columnas.length },
  };

  // Generación del búfer binario con el contenido del archivo XLSX de forma asíncrona
  const contenido = await libro.xlsx.writeBuffer();

  // Creación del objeto Blob especificado con el tipo MIME estándar de documentos Excel (.xlsx)
  const archivo = new Blob([contenido], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Generación de una URL temporal de descarga en el navegador para el Blob creado
  const url = URL.createObjectURL(archivo);

  // Creación de un elemento de enlace dinámico en el DOM
  const enlace = document.createElement('a');

  // Sanitización y normalización del título para generar un nombre de archivo seguro (slug)
  const nombreSeguro = titulo
    .normalize('NFD') // Descompone caracteres acentuados en sus letras base y tildes
    .replace(/[\u0300-\u036f]/g, '') // Remueve marcas diacríticas (acentos)
    .toLocaleLowerCase() // Convierte a minúsculas
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza caracteres no alfanuméricos por guiones
    .replace(/^-|-$/g, ''); // Elimina guiones sobrantes al inicio o al final

  // Configuración del enlace dinámico y el atributo de descarga con un nombre por defecto en caso de fallback
  enlace.href = url;
  enlace.download = `reporte-${nombreSeguro || 'inventario'}.xlsx`;

  // Inserción temporal del enlace en el DOM, disparo de clic automático y posterior eliminación del enlace
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  // Liberación de la memoria del navegador revocando la URL del objeto creado
  URL.revokeObjectURL(url);
}
