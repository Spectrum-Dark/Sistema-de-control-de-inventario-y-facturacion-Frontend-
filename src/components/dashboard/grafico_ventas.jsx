import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function GraficoVentas({ datos }) {
  const etiquetas = datos?.etiquetas ?? [];
  const valores = datos?.valores ?? [];

  const informacion = {
    labels: etiquetas,
    datasets: [
      {
        label: "Ventas",
        data: valores,
        borderColor: "#4f46e5", // Indigo vibrante
        backgroundColor: "rgba(79, 70, 229, 0.12)", // Relleno suave traslúcido
        borderWidth: 3,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#818cf8",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        Ventas por período
      </h3>
      <div className="h-64 w-full">
        {etiquetas.length > 0 ? (
          <Line data={informacion} options={opciones} />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Sin datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}

export default GraficoVentas;