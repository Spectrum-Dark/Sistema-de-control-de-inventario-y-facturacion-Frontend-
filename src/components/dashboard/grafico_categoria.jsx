import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Paleta viva para identificar cada categoría
const coloresCategorias = [
  "#10b981", // Esmeralda (Motor)
  "#3b82f6", // Azul (Frenos)
  "#8b5cf6", // Violeta (Suspensión)
  "#f59e0b", // Ámbar (Eléctrico)
  "#ec4899", // Rosa (Filtros)
  "#14b8a6", // Teal
];

function GraficoCategorias({ datos }) {
  const etiquetas = datos?.etiquetas ?? [];
  const valores = datos?.valores ?? [];

  const informacion = {
    labels: etiquetas,
    datasets: [
      {
        label: "Ventas",
        data: valores,
        backgroundColor: coloresCategorias.slice(0, etiquetas.length),
        borderRadius: 6,
        borderSkipped: false,
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
        bodyColor: "#cbd5e1",
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
        Ventas por categoría
      </h3>
      <div className="h-64 w-full">
        {etiquetas.length > 0 ? (
          <Bar data={informacion} options={opciones} />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Sin datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}

export default GraficoCategorias;