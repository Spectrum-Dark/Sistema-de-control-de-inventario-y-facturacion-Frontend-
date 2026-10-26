import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine } from 'lucide-react';

// Objeto de configuración que mapea cada tipo de movimiento de inventario con su icono y color identificativo correspondiente.
const CONFIGURACION = {
  Entrada: { Icono: ArrowDownToLine, color: 'text-emerald-700' },
  Salida: { Icono: ArrowUpFromLine, color: 'text-red-600' },
};

// Componente 'InsigniaTipoMovimiento' para mostrar visualmente el tipo de movimiento de inventario mediante iconos y colores distintivos.
export default function InsigniaTipoMovimiento({ tipo }) {
  // Obtiene el icono y el color según el tipo, o asigna valores por defecto (flecha bidireccional y color gris) si no coincide con los configurados.
  const { Icono, color } = CONFIGURACION[tipo] ?? {
    Icono: ArrowLeftRight,
    color: 'text-slate-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color}`}
    >
      <Icono size={14} strokeWidth={2} />
      {tipo}
    </span>
  );
}
