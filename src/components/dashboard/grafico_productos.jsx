import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function GraficoProductos({ datos }) {
  /* Extracción segura de datos */
  const etiquetas = datos?.etiquetas ?? [];
  const valores = datos?.valores ?? [];

  /* Configuración estilizada del Radar */
  const informacion = {
    labels: etiquetas,
    datasets: [
      {
        label: "Unidades vendidas",
        data: valores,
        backgroundColor: "rgba(2, 132, 199, 0.25)", // Relleno Sky traslúcido (sky-600)
        borderColor: "#0284c7", // Borde Sky vibrante (sky-600)
        borderWidth: 2.5,
        pointBackgroundColor: "#0284c7",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#0369a1", // sky-700
      },
    ],
  };

  /* Opciones de personalización visual */
  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#38bdf8", // sky-400
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "#e2e8f0", // Red concéntrica suave en slate-200
        },
        angleLines: {
          color: "#cbd5e1", // Líneas radiales en slate-300
        },
        pointLabels: {
          color: "#475569", // Texto de los productos en slate-600
          font: {
            size: 11,
            weight: "500",
          },
        },
        ticks: {
          display: false, // Oculta números internos para no recargar la gráfica
        },
      },
    },
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Título en HTML estandarizado */}
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        Productos más vendidos
      </h3>

      {/* Contenedor responsivo de la gráfica */}
      <div className="h-64 w-full">
        {etiquetas.length > 0 ? (
          <Radar data={informacion} options={opciones} />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Sin datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}

export default GraficoProductos;