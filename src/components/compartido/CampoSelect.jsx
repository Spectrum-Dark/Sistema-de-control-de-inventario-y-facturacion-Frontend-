// Constante que define las clases CSS reutilizables para estilizar el elemento select nativo con Tailwind CSS.
const claseSelect =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300';

// Componente reutilizable para campos de selección desplegable (select nativo) con etiqueta asociada y esparcimiento de props.
export default function CampoSelect({ id, label, children, ...props }) {
  return (
    <div>
      {/* Etiqueta del campo conectada mediante el atributo htmlFor para garantizar accesibilidad */}
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Elemento select nativo que aplica los estilos predefinidos y propaga el resto de propiedades (valor, onChange, etc.) */}
      <select id={id} name={id} className={claseSelect} {...props}>
        {children}
      </select>
    </div>
  );
}
