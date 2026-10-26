// Función auxiliar para escapar caracteres especiales en HTML y prevenir ataques XSS, manejando nulos y convirtiendo saltos de línea
const escaparHtml = (valor) =>
  String(valor ?? '')
    .replace(/&/g, '&amp;') // Escapa ampersands
    .replace(/</g, '&lt;') // Escapa etiquetas de apertura menor que
    .replace(/>/g, '&gt;') // Escapa etiquetas de cierre mayor que
    .replace(/"/g, '&quot;') // Escapa comillas dobles
    .replace(/'/g, '&#039;') // Escapa comillas simples
    .replace(/\n/g, '<br>'); // Reemplaza saltos de línea por etiquetas <br> de HTML

// Función exportada para generar y disparar la impresión de un reporte en formato PDF mediante el motor nativo del navegador
export function exportarReportePdf({ titulo, columnas, filas }) {
  // Construcción dinámica de los encabezados de la tabla mapeando y escapando cada columna
  const encabezados = columnas
    .map((columna) => `<th>${escaparHtml(columna.etiqueta)}</th>`)
    .join('');

  // Construcción dinámica de los registros de la tabla iterando sobre las filas y sus respectivas columnas
  const registros = filas
    .map(
      (fila) =>
        `<tr>${columnas
          .map((columna) => `<td>${escaparHtml(columna.valor(fila))}</td>`)
          .join('')}</tr>`
    )
    .join('');

  // Creación de un elemento de sección contenedor para el reporte temporal en el DOM
  const contenido = document.createElement('section');
  contenido.className = 'reporte-exportacion-pdf';
  // Inserción del marcado HTML estructurado incluyendo título, fecha localizada y la tabla de datos
  contenido.innerHTML = `
    <h1>${escaparHtml(titulo)}</h1>
    <p>Generado el ${escaparHtml(new Date().toLocaleString('es-NI'))}</p>
    <table><thead><tr>${encabezados}</tr></thead><tbody>${registros}</tbody></table>
  `;

  // Creación de un elemento de estilo dedicado para aislar las reglas CSS de impresión
  const estilos = document.createElement('style');
  estilos.className = 'estilos-reporte-exportacion-pdf';
  estilos.textContent = `
    .reporte-exportacion-pdf { display: none; } /* Oculto por defecto en la vista normal de la interfaz */
    @page { size: landscape; margin: 12mm; } /* Configuración de la página del PDF en orientación horizontal con márgenes */
    @media print {
      /* Oculta todos los elementos del body excepto el reporte y sus estilos específicos al imprimir */
      body.imprimiendo-reporte > :not(.reporte-exportacion-pdf):not(.estilos-reporte-exportacion-pdf) { display: none !important; }
      /* Muestra el reporte posicionándolo de forma absoluta y adaptado al ancho total con estilos limpios para impresión */
      body.imprimiendo-reporte > .reporte-exportacion-pdf { display: block !important; position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; visibility: visible !important; color: #0f172a !important; background: #fff !important; font: 12px Arial, sans-serif; }
      .reporte-exportacion-pdf, .reporte-exportacion-pdf * { visibility: visible !important; }
      .reporte-exportacion-pdf h1 { font-size: 20px; margin: 0 0 6px; }
      .reporte-exportacion-pdf p { color: #64748b; margin: 0 0 18px; }
      .reporte-exportacion-pdf table { border-collapse: collapse; width: 100%; }
      .reporte-exportacion-pdf th, .reporte-exportacion-pdf td { border: 1px solid #cbd5e1; padding: 7px; text-align: left; vertical-align: top; }
      .reporte-exportacion-pdf th { background: #e2e8f0 !important; print-color-adjust: exact; font-size: 10px; text-transform: uppercase; }
      .reporte-exportacion-pdf tr { break-inside: avoid; } /* Evita que las filas se dividan de forma abrupta entre páginas */
    }
  `;

  // Función de limpieza para remover clases de estado y elementos temporales del DOM tras la impresión
  const limpiar = () => {
    document.body.classList.remove('imprimiendo-reporte');
    contenido.remove();
    estilos.remove();
  };

  // Escucha el evento de fin de impresión del navegador para ejecutar la limpieza de forma segura (con { once: true })
  window.addEventListener('afterprint', limpiar, { once: true });

  // Añade la clase de impresión al body e inserta los elementos dinámicos al final del documento
  document.body.classList.add('imprimiendo-reporte');
  document.body.append(estilos, contenido);

  // Uso de doble requestAnimationFrame para asegurar que el DOM se haya renderizado y pintado correctamente antes de invocar window.print()
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => window.print());
  });

  return true;
}
