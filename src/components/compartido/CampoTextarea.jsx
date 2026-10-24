// Constante que define las clases CSS reutilizables para estilizar el elemento textarea con Tailwind CSS (incluye bloqueo de redimensionamiento).
const claseTextarea =
  'w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300';

// Componente reutilizable para campos de texto multilinea (textarea) con etiqueta asociada, contador de caracteres opcional y esparcimiento de props.
export default function CampoTextarea({
  id,
  label,
  value,
  maxLength,
  ...props
}) {
  return (
    <div>
      {/* Etiqueta asociada al textarea mediante el atributo htmlFor para garantizar accesibilidad */}
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Elemento textarea configurado con un número de filas predeterminado (3), manejo de valor, longitud máxima y estilos */}
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        maxLength={maxLength}
        className={claseTextarea}
        {...props}
      />

      {/* Renderizado condicional del contador de caracteres en tiempo real ubicado en la esquina inferior derecha */}
      {maxLength && (
        <p className="mt-1 text-right text-xs text-slate-400">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
