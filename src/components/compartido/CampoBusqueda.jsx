import { Search, X } from 'lucide-react';

// Componente reutilizable de campo de búsqueda con icono, input de texto estilizado y botón de borrado rápido.
export default function CampoBusqueda({
  valor,
  onChange,
  placeholder = 'Buscar...',
}) {
  return (
    // Contenedor principal con posición relativa para posicionar de manera absoluta los iconos internos.
    <div className="relative">
      {/* Icono de lupa decorativo alineado a la izquierda dentro del input (con pointer-events-none para que no interfiera con clics) */}
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      {/* Input de texto para la búsqueda con clases de Tailwind CSS para bordes, sombras, transiciones y estados de foco */}
      <input
        type="text"
        value={valor} // Valor actual del término de búsqueda
        onChange={(e) => onChange(e.target.value)} // Propaga el nuevo valor ingresado al componente padre
        placeholder={placeholder} // Texto de guía o marcador de posición
        aria-label={placeholder} // Atributo de accesibilidad para lectores de pantalla
        className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
      />

      {/* Botón condicional de borrado rápido (icono 'X') que aparece únicamente cuando hay texto escrito en el input */}
      {valor && (
        <button
          type="button"
          onClick={() => onChange('')} // Limpia el valor de búsqueda enviando una cadena vacía al padre
          aria-label="Borrar búsqueda"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
