const escaparHtml = (valor) =>
  String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");

export function exportarReportePdf({ titulo, columnas, filas }) {
  const encabezados = columnas
    .map((columna) => `<th>${escaparHtml(columna.etiqueta)}</th>`)
    .join("");
  const registros = filas
    .map(
      (fila) =>
        `<tr>${columnas
          .map((columna) => `<td>${escaparHtml(columna.valor(fila))}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  const contenido = document.createElement("section");
  contenido.className = "reporte-exportacion-pdf";
  contenido.innerHTML = `
    <h1>${escaparHtml(titulo)}</h1>
    <p>Generado el ${escaparHtml(new Date().toLocaleString("es-NI"))}</p>
    <table><thead><tr>${encabezados}</tr></thead><tbody>${registros}</tbody></table>
  `;

  const estilos = document.createElement("style");
  estilos.className = "estilos-reporte-exportacion-pdf";
  estilos.textContent = `
    .reporte-exportacion-pdf { display: none; }
    @page { size: landscape; margin: 12mm; }
    @media print {
      body.imprimiendo-reporte > :not(.reporte-exportacion-pdf):not(.estilos-reporte-exportacion-pdf) { display: none !important; }
      body.imprimiendo-reporte > .reporte-exportacion-pdf { display: block !important; position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; visibility: visible !important; color: #0f172a !important; background: #fff !important; font: 12px Arial, sans-serif; }
      .reporte-exportacion-pdf, .reporte-exportacion-pdf * { visibility: visible !important; }
      .reporte-exportacion-pdf h1 { font-size: 20px; margin: 0 0 6px; }
      .reporte-exportacion-pdf p { color: #64748b; margin: 0 0 18px; }
      .reporte-exportacion-pdf table { border-collapse: collapse; width: 100%; }
      .reporte-exportacion-pdf th, .reporte-exportacion-pdf td { border: 1px solid #cbd5e1; padding: 7px; text-align: left; vertical-align: top; }
      .reporte-exportacion-pdf th { background: #e2e8f0 !important; print-color-adjust: exact; font-size: 10px; text-transform: uppercase; }
      .reporte-exportacion-pdf tr { break-inside: avoid; }
    }
  `;

  const limpiar = () => {
    document.body.classList.remove("imprimiendo-reporte");
    contenido.remove();
    estilos.remove();
  };

  window.addEventListener("afterprint", limpiar, { once: true });
  document.body.classList.add("imprimiendo-reporte");
  document.body.append(estilos, contenido);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => window.print());
  });
  return true;
}
