import { peticion } from "../compartido/clienteApi";

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

// Una sola solicitud entrega los datos ya resumidos que consume el dashboard.
export const cargarDatosDashboard = () =>
  peticion(`/dashboard/resumen?${new URLSearchParams(obtenerRangoMes())}`);
