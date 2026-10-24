// Componente reutilizable SelectFiltro que sirve como un selector desplegable optimizado para barras de filtrado, con soporte de accesibilidad y clases personalizables.
export default function SelectFiltro({
  etiqueta,
  valor,
  onChange,
  children,
  className = '',
}) {
  return (
    // Elemento select nativo configurado con estilos modernos de Tailwind CSS, manejo de valor controlado y propagación de clases adicionales.
    <select
      aria-label={etiqueta} // Atributo de accesibilidad obligatorio para describir la función del selector ante lectores de pantalla.
      value={valor} // Valor seleccionado actualmente en el filtro.
      onChange={(e) => onChange(e.target.value)} // Propaga el nuevo valor seleccionado hacia el componente padre mediante la función de cambio.
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-auto ${className}`}
    >
      {/* Opciones internas del selector que se inyectan a través de los elementos hijos (children). */}
      {children}
    </select>
  );
}
