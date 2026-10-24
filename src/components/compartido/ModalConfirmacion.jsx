import { useState } from 'react';
import { Check, Loader2, Trash2 } from 'lucide-react';
import Modal from './Modal';

// Diccionario de estilos visuales dinámicos para los botones según la variante ("peligro" o "normal").
const ESTILOS = {
  peligro: 'bg-red-600 hover:bg-red-700',
  normal: 'bg-slate-800 hover:bg-slate-900',
};

// Componente reutilizable ModalConfirmacion para validar acciones críticas (como eliminaciones o cambios importantes) con manejo de estados de carga y errores.
export default function ModalConfirmacion({
  titulo,
  mensaje,
  textoConfirmar = 'Eliminar',
  textoProceso = 'Eliminando...',
  variante = 'peligro',
  onConfirmar,
  onCerrar,
}) {
  // Estados locales para controlar la animación de carga y los mensajes de error devueltos por el backend.
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Selecciona dinámicamente el icono a mostrar en el botón de confirmación según la variante elegida.
  const Icono = variante === 'peligro' ? Trash2 : Check;

  // Maneja la acción asíncrona de confirmación cuando el usuario presiona el botón principal.
  const handleConfirmar = async () => {
    setCargando(true);
    setError('');

    try {
      await onConfirmar();
    } catch (err) {
      // Si el backend o la función rechaza la promesa, captura el error y lo muestra en pantalla sin cerrar el modal.
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    // Utiliza el componente Modal base pasando título, evento de cierre y bloqueándolo mientras se procesa la petición.
    <Modal titulo={titulo} onCerrar={onCerrar} bloqueado={cargando}>
      <div className="space-y-4">
        {/* Mensaje descriptivo de la acción a confirmar */}
        <p className="text-sm text-slate-600">{mensaje}</p>

        {/* Alerta de error condicional si ocurre un fallo durante la ejecución de la acción */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Botones de acción del pie del modal */}
        <div className="flex justify-end gap-3 pt-2">
          {/* Botón para cancelar y cerrar el modal (deshabilitado durante la carga) */}
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          {/* Botón principal de confirmación con estilos dinámicos, icono condicional y estado de carga */}
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={cargando}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${ESTILOS[variante]}`}
          >
            {cargando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Icono size={16} />
            )}
            {cargando ? textoProceso : textoConfirmar}
          </button>
        </div>
      </div>
    </Modal>
  );
}
