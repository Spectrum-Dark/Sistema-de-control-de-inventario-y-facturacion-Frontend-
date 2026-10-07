import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Paleta de colores vibrantes y semánticos para el inventario
const coloresInventario = [
  "#10b981", // Emerald / Normal (Verde)
  "#0284c7", // Sky / Bajo (Azul)
  "#f59e0b", // Amber / Crítico (Naranja/Amarillo)
  "#f43f5e", // Rose / Agotado (Rojo)
  "#8b5cf6", // Violet / Excedente (Morado)
];

function GraficoInventario({ datos }) {
  /* Extracción segura de datos */
  const etiquetas = datos?.etiquetas ?? [];
  const valores = datos?.valores ?? [];

  /* Configuración del dataset con la paleta multicolor */
  const informacion = {
    labels: etiquetas,
    datasets: [
      {
        label: "Productos",
        data: valores,
        backgroundColor: coloresInventario.slice(0, etiquetas.length),
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  /* Opciones de personalización visual */
  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Grosor estilizado y moderno
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#475569", // slate-600
          font: {
            size: 11,
            weight: "500",
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#cbd5e1",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Título en HTML estandarizado */}
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        Estado del inventario
      </h3>

      {/* Contenedor responsivo del gráfico */}
      <div className="h-64 w-full">
        {etiquetas.length > 0 ? (
          <Doughnut data={informacion} options={opciones} />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Sin datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}

export default GraficoInventario;