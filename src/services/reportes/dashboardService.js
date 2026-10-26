import { peticion } from '../compartido/clienteApi';

// Convierte una fecha local a AAAA-MM-DD sin desplazarla por zona horaria.
function fechaLocal(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

// Calcula desde el primer día del mes actual hasta la fecha local de hoy.
function obtenerRangoMes() {
  const ahora = new Date();
  return {
    fecha_inicio: fechaLocal(
      new Date(ahora.getFullYear(), ahora.getMonth(), 1)
    ),
    fecha_fin: fechaLocal(ahora),
  };
}

// Una sola solicitud entrega al dashboard el resumen del periodo mensual actual.
export const cargarDatosDashboard = () =>
  peticion(`/dashboard/resumen?${new URLSearchParams(obtenerRangoMes())}`);
