// Constantes que agrupan los diferentes estados considerados como "positivos" o "activos" dentro del sistema.
const ESTADOS_POSITIVOS = ['Activo', 'Activa'];

// Constante que agrupa los estados que representan una confirmación (por ejemplo, en citas o reservas).
const ESTADOS_CONFIRMADOS = ['Confirmada'];

// Componente reutilizable InsigniaEstado que renderiza una etiqueta de texto con estilos condicionales según el estado actual.
export default function InsigniaEstado({ estado }) {
  // Comprueba si el estado actual se encuentra dentro de los arreglos definidos como positivos o confirmados.
  const positivo = ESTADOS_POSITIVOS.includes(estado);
  const confirmado = ESTADOS_CONFIRMADOS.includes(estado);

  return (
    // Aplica dinámicamente colores de texto esmeralda (verde) si es positivo/confirmado, o un tono gris (slate) por defecto.
    <span
      className={`text-xs font-semibold ${positivo || confirmado ? 'text-emerald-700' : 'text-slate-500'}`}
    >
      {estado}
    </span>
  );
}
