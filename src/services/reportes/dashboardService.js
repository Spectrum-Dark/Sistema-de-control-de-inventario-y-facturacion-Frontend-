import {
  obtenerInventarioActual,
  obtenerInventarioStockBajo,
  obtenerReporteCompras,
  obtenerReporteFinanciero,
  obtenerReporteVentas,
} from "./reportesService";

// Calcula el período local para que coincida con el mes que muestra el dashboard.
function fechaLocal(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function obtenerRangoMes() {
  const ahora = new Date();
  return {
    fecha_inicio: fechaLocal(new Date(ahora.getFullYear(), ahora.getMonth(), 1)),
    fecha_fin: fechaLocal(ahora),
  };
}

// Estas referencias estables permiten compartir la misma caché entre precarga y pantalla.
export const cargarInventarioDashboard = () => obtenerInventarioActual();
export const cargarStockBajoDashboard = () => obtenerInventarioStockBajo();
export const cargarVentasDashboard = () => obtenerReporteVentas({ ...obtenerRangoMes(), estado: "Confirmada" });
export const cargarComprasDashboard = () => obtenerReporteCompras({ ...obtenerRangoMes(), estado: "Confirmada" });
export const cargarFinancieroDashboard = () => obtenerReporteFinanciero(obtenerRangoMes());

export const cargasDashboard = [
  cargarInventarioDashboard,
  cargarStockBajoDashboard,
  cargarVentasDashboard,
  cargarComprasDashboard,
  cargarFinancieroDashboard,
];
