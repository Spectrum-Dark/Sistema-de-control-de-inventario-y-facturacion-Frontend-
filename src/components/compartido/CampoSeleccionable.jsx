import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

// Componente avanzado de campo de selección tipo autocompletado con búsqueda integrada, navegación por teclado y validación personalizada.
export default function CampoSeleccionable({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Escribe para buscar...',
  required = false,
}) {
  // Referencias para el elemento de entrada y control de sincronización de estado local.
  const inputRef = useRef(null);
  const omitirSiguienteSync = useRef(false);

  // Busca dentro de las opciones la que coincida con el valor actual propiciado.
  const opcionSeleccionada = options.find(
    (opcion) => String(opcion.value) === String(value)
  );
  const etiquetaSeleccionada = opcionSeleccionada?.label ?? '';

  // Estados locales para el texto del input, la visibilidad de la lista desplegable y el índice activo del teclado.
  const [texto, setTexto] = useState(opcionSeleccionada?.label ?? '');
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(0);

  // Filtra las opciones de manera memorizada en base al texto ingresado y coincidencias de etiqueta o descripción.
  const filtradas = useMemo(() => {
    const busqueda = texto.trim().toLocaleLowerCase();
    if (!abierto || (opcionSeleccionada && texto === opcionSeleccionada.label))
      return [];
    return options.filter((opcion) =>
      `${opcion.label} ${opcion.descripcion ?? ''}`
        .toLocaleLowerCase()
        .includes(busqueda)
    );
  }, [abierto, opcionSeleccionada, options, texto]);

  // Limita la visualización de opciones a un máximo de 6 elementos para mantener el rendimiento y diseño.
  const opcionesVisibles = filtradas.slice(0, 6);

  // Efecto sincronizador que actualiza el texto interno del input si la etiqueta o el valor externo cambian.
  useEffect(() => {
    if (omitirSiguienteSync.current) {
      omitirSiguienteSync.current = false;
      return;
    }
    setTexto(etiquetaSeleccionada);
  }, [etiquetaSeleccionada, value]);

  // Función auxiliar para emitir los cambios hacia el componente padre simulando un evento de formulario.
  const emitirCambio = (nuevoValor) => {
    omitirSiguienteSync.current = true;
    onChange({ target: { name: id, value: nuevoValor } });
  };

  // Manejador del evento cuando el usuario escribe en el input de búsqueda.
  const escribir = (evento) => {
    const nuevoTexto = evento.target.value;
    setTexto(nuevoTexto);
    setAbierto(true);
    setActivo(0);
    emitirCambio('');
    evento.target.setCustomValidity(
      required ? 'Selecciona una opción de la lista.' : ''
    );
  };

  // Manejador para seleccionar una opción específica de la lista desplegable.
  const seleccionar = (opcion) => {
    setTexto(opcion.label);
    setAbierto(false);
    setActivo(0);
    emitirCambio(String(opcion.value));
    inputRef.current?.setCustomValidity('');
  };

  // Manejador de eventos de teclado (flechas de navegación, Enter para seleccionar y Escape para cerrar).
  const manejarTeclado = (evento) => {
    if (evento.key === 'ArrowDown' && filtradas.length) {
      evento.preventDefault();
      setActivo((actual) => (actual + 1) % filtradas.length);
    } else if (evento.key === 'ArrowUp' && filtradas.length) {
      evento.preventDefault();
      setActivo((actual) => (actual - 1 + filtradas.length) % filtradas.length);
    } else if (evento.key === 'Enter' && abierto && filtradas[activo]) {
      evento.preventDefault();
      seleccionar(filtradas[activo]);
    } else if (evento.key === 'Escape') {
      setAbierto(false);
    }
  };

  return (
    <div className="relative min-w-0">
      {/* Etiqueta asociada al campo de selección */}
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Contenedor del input con icono de búsqueda a la izquierda y flecha desplegable a la derecha */}
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          ref={inputRef}
          id={id}
          name={id}
          type="text"
          value={texto}
          placeholder={placeholder}
          autoComplete="off"
          required={required}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={abierto && filtradas.length > 0}
          aria-controls={`${id}_opciones`}
          onFocus={() => setAbierto(true)}
          onBlur={() => window.setTimeout(() => setAbierto(false), 120)}
          onChange={escribir}
          onKeyDown={manejarTeclado}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      {/* Menú desplegable con las opciones filtradas que cumplen con la búsqueda */}
      {abierto && opcionesVisibles.length > 0 && (
        <ul
          id={`${id}_opciones`}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
        >
          {opcionesVisibles.map((opcion, indice) => (
            <li
              key={opcion.value}
              role="option"
              aria-selected={String(opcion.value) === String(value)}
            >
              <button
                type="button"
                onMouseDown={(evento) => evento.preventDefault()}
                onClick={() => seleccionar(opcion)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${indice === activo ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-slate-800">
                    {opcion.label}
                  </span>
                  {opcion.descripcion && (
                    <span className="block truncate text-xs text-slate-500">
                      {opcion.descripcion}
                    </span>
                  )}
                </span>
                {String(opcion.value) === String(value) && (
                  <Check size={15} className="shrink-0 text-slate-500" />
                )}
              </button>
            </li>
          ))}
          {/* Aviso informativo si existen más resultados de los mostrados en el límite */}
          {filtradas.length > 6 && (
            <li className="px-3 py-2 text-[11px] text-slate-500">
              Hay más resultados; escribe para afinar la búsqueda.
            </li>
          )}
        </ul>
      )}

      {/* Mensaje de retroalimentación cuando no se encuentran coincidencias en el filtrado */}
      {abierto && texto && filtradas.length === 0 && !opcionSeleccionada && (
        <div className="absolute z-30 mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-500 shadow-xl">
          No hay coincidencias.
        </div>
      )}
    </div>
  );
}
