import { useState } from "react";
import { Tag, Loader2, Save, Plus } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import { obtenerCambios } from "../../utils/compartido/formulario";
import {
  crearCategoria,
  actualizarCategoria,
} from "../../services/categorias/categoriasService";

export default function ModalCategoria({ categoria, onCerrar, onGuardado }) {
  // Determina si el modal está en modo edición (true) o en modo creación (false) basándose en si existe un ID de categoría.
  const esEdicion = Boolean(categoria?.id_categoria);

  // Inicializa el estado local del formulario con los valores actuales de la categoría (si es edición) o vacíos (si es creación).
  const [form, setForm] = useState({
    nombre_categoria: categoria?.nombre_categoria ?? "",
    descripcion: categoria?.descripcion ?? "",
    estado: esEdicion ? (categoria.estado ?? "Activa") : undefined,
  });

  // Estados para controlar el indicador de carga durante las peticiones asíncronas y los mensajes de error.
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Maneja los cambios en los inputs del formulario actualizando el estado y limpiando errores previos.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Maneja el envío del formulario para crear o actualizar una categoría.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación local: verifica que el nombre de la categoría no esté vacío o compuesto solo por espacios.
    if (!form.nombre_categoria.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    // Prepara los datos base limpiando espacios en blanco innecesarios.
    const valores = {
      nombre_categoria: form.nombre_categoria.trim(),
      descripcion: form.descripcion.trim() || null,
    };

    let datos = valores;

    // Si es edición, optimiza el envío enviando únicamente los campos que sufrieron modificaciones.
    if (esEdicion) {
      // Utiliza una función auxiliar para comparar los valores nuevos con los originales.
      datos = obtenerCambios(valores, {
        nombre_categoria: categoria.nombre_categoria,
        descripcion: categoria.descripcion ?? null,
      });
      // Añade el campo estado a los cambios si este fue modificado.
      if (form.estado !== categoria.estado) datos.estado = form.estado;

      // Valida si realmente existen cambios antes de realizar la petición al servidor.
      if (Object.keys(datos).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    // Activa el estado de carga para bloquear la interfaz y mostrar feedback visual.
    setCargando(true);

    try {
      // Ejecuta la petición correspondiente según si se trata de una actualización o una inserción nueva.
      const respuesta = esEdicion
        ? await actualizarCategoria(categoria.id_categoria, datos)
        : await crearCategoria(datos);

      // Lanza una notificación de éxito utilizando la librería externa 'sileo'.
      sileo.success({
        title: esEdicion ? "Categoría actualizada" : "Categoría registrada",
        description: respuesta.message,
      });
      // Notifica al componente padre que el guardado fue exitoso, pasando los datos y un booleano para indicar inserción.
      onGuardado(respuesta.datos, !esEdicion);
    } catch (err) {
      // Captura y muestra cualquier error proveniente del servicio.
      setError(err.message);
    } finally {
      // Desactiva el estado de carga independientemente del resultado.
      setCargando(false);
    }
  };

  return (
    // Componente contenedor Modal genérico con propiedades de título, cierre, bloqueo e indicador de ancho máximo.
    <Modal
      titulo={esEdicion ? "Editar categoría" : "Nueva categoría"}
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cabecera visual informativa dentro del modal con icono y descripción adaptativa según el modo (crear/editar). */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Tag size={19} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">
                {esEdicion
                  ? "Detalles de la categoría"
                  : "Nueva categoría de repuestos"}
              </p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {esEdicion
                ? "Actualiza la información y disponibilidad de esta categoría."
                : "Define un nombre claro para organizar y encontrar los productos."}
            </p>
            {/* Muestra el identificador de registro solo en el modo edición */}
            {esEdicion && (
              <p className="mt-2 text-[10px] font-medium text-slate-400">
                Registro #{categoria.id_categoria}
              </p>
            )}
          </div>
        </div>

        {/* Sección de campos de entrada del formulario */}
        <div className="space-y-4">
          {/* Campo de formulario para el nombre de la categoría */}
          <CampoFormulario
            id="nombre_categoria"
            label="Nombre de la categoría"
            icono={Tag}
            type="text"
            placeholder="Ej.: Frenos y sistema de frenado"
            maxLength={100}
            value={form.nombre_categoria}
            onChange={handleChange}
            required
          />

          {/* Campo de texto extenso (Textarea) para la descripción opcional */}
          <CampoTextarea
            id="descripcion"
            label="Descripción"
            maxLength={255}
            placeholder="Indica qué tipo de repuestos incluye esta categoría"
            value={form.descripcion}
            onChange={handleChange}
          />

          {/* Selector de disponibilidad/estado visible exclusivamente cuando se encuentra en modo edición */}
          {esEdicion && (
            <CampoSelect
              id="estado"
              label="Disponibilidad"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </CampoSelect>
          )}
        </div>

        {/* Bloque de vista previa en tiempo real, renderizado únicamente al crear una nueva categoría */}
        {!esEdicion && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">
              Vista previa
            </p>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600">
                <Tag size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {form.nombre_categoria.trim() || "Nombre de categoría"}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {form.descripcion.trim() || "La descripción aparecerá aquí"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerta de error condicional que muestra mensajes de validación o fallos del servidor */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {error}
          </p>
        )}

        {/* Pie del formulario con los botones de acción (Cancelar y Guardar/Registrar) */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          {/* Botón para cancelar y cerrar el modal */}
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          {/* Botón de envío del formulario con estados dinámicos de carga, iconos y texto adaptativo */}
          <button
            type="submit"
            disabled={cargando}
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {!cargando && (esEdicion ? <Save size={15} /> : <Plus size={15} />)}
            {cargando
              ? "Guardando..."
              : esEdicion
                ? "Guardar cambios"
                : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
