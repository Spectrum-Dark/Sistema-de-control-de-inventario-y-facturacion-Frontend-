// Componente reutilizable de campo de formulario para inputs de texto con soporte para etiquetas, iconos, acciones derechas y validación de errores.
export default function CampoFormulario({
  id,
  label,
  icono: Icono,
  accionDerecha,
  error,
  sinIcono = false,
  ...props
}) {
  const esFechaHora = props.type === 'datetime-local';
  return (
    <div>
      {/* Etiqueta asociada al campo de entrada usando el atributo htmlFor para accesibilidad */}
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Contenedor con posición relativa para ubicar los iconos o elementos internos (izquierdo y derecho) */}
      <div className="relative">
        {/* Renderizado condicional del icono izquierdo si se proporciona y no está deshabilitado */}
        {Icono && (
          <Icono
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        {/* Input de texto dinámico que aplica clases condicionales dependiendo de si hay errores, padding según el icono y esparce el resto de propiedades props */}
        <input
          id={id}
          name={id}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-xl border bg-white py-2.5 ${sinIcono || esFechaHora ? 'pl-3' : 'pl-10'} ${esFechaHora ? 'pr-3 text-left' : 'pr-10'} text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 hover:border-slate-400 focus:border-slate-500 focus:ring-slate-300'
          }`}
          {...props}
        />

        {/* Renderizado condicional para elementos o botones situados en la parte derecha del input (como mostrar contraseña) */}
        {accionDerecha && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {accionDerecha}
          </div>
        )}
      </div>

      {/* Mensaje de error condicional que se muestra debajo del input si existe alguna falla de validación */}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
