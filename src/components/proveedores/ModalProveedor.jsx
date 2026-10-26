import { useState } from 'react';
import {
  Truck,
  Hash,
  Phone,
  Mail,
  MapPin,
  Loader2,
  Save,
  Plus,
} from 'lucide-react';
import { sileo } from 'sileo';
import Modal from '../compartido/Modal';
import CampoFormulario from '../compartido/CampoFormulario';
import CampoSelect from '../compartido/CampoSelect';
import { obtenerCambios } from '../../utils/compartido/formulario';
import {
  crearProveedor,
  actualizarProveedor,
} from '../../services/proveedores/proveedoresService';

// Componente modal 'ModalProveedor' para la gestión de registro y edición de proveedores, permitiendo administrar datos comerciales, de contacto, dirección y estado operativo.
export default function ModalProveedor({ proveedor, onCerrar, onGuardado }) {
  // Determina si el modal se encuentra en modo edición verificando la existencia del ID del proveedor.
  const esEdicion = Boolean(proveedor?.id_proveedor);

  // Estado local para los campos del formulario con los valores iniciales o por defecto.
  const [form, setForm] = useState({
    nombre_proveedor: proveedor?.nombre_proveedor ?? '',
    identificacion: proveedor?.identificacion ?? '',
    telefono: proveedor?.telefono ?? '',
    correo: proveedor?.correo ?? '',
    direccion: proveedor?.direccion ?? '',
    estado: esEdicion ? (proveedor.estado ?? 'Activo') : undefined,
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Manejador genérico para actualizar el estado del formulario y limpiar errores activos.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Manejador del envío del formulario para procesar el registro o actualización del proveedor en la API.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación previa: el nombre del proveedor es obligatorio.
    if (!form.nombre_proveedor.trim()) {
      setError('El nombre del proveedor es obligatorio.');
      return;
    }

    // Los campos opcionales vacíos se formatean y envían como null.
    const valores = {
      nombre_proveedor: form.nombre_proveedor.trim(),
      identificacion: form.identificacion.trim() || null,
      telefono: form.telefono.trim() || null,
      correo: form.correo.trim() || null,
      direccion: form.direccion.trim() || null,
    };

    let datos = valores;

    // En modo edición, calcula las diferencias utilizando 'obtenerCambios' para enviar solo las propiedades modificadas.
    if (esEdicion) {
      datos = obtenerCambios(valores, {
        nombre_proveedor: proveedor.nombre_proveedor,
        identificacion: proveedor.identificacion ?? null,
        telefono: proveedor.telefono ?? null,
        correo: proveedor.correo ?? null,
        direccion: proveedor.direccion ?? null,
      });
      if (form.estado !== proveedor.estado) datos.estado = form.estado;

      if (Object.keys(datos).length === 0) {
        setError('No hay cambios para guardar.');
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarProveedor(proveedor.id_proveedor, datos)
        : await crearProveedor(datos);

      sileo.success({
        title: esEdicion ? 'Proveedor actualizado' : 'Proveedor registrado',
        description: respuesta.message,
      });
      onGuardado(respuesta.datos, !esEdicion);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal
      titulo={esEdicion ? 'Editar proveedor' : 'Nuevo proveedor'}
      onCerrar={onCerrar}
      bloqueado={cargando}
      ancho="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cabecera informativa del modal */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Truck size={19} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {esEdicion ? 'Datos del proveedor' : 'Nuevo proveedor'}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {esEdicion
                ? 'Mantén actualizados los datos de contacto y disponibilidad.'
                : 'Registra la empresa y sus datos para facilitar el seguimiento de compras.'}
            </p>
            {esEdicion && (
              <p className="mt-2 text-[10px] font-medium text-slate-400">
                Registro #{proveedor.id_proveedor}
              </p>
            )}
          </div>
        </div>

        {/* Cuadrícula de campos del formulario */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Campo para el nombre del proveedor */}
          <div className="sm:col-span-2">
            <CampoFormulario
              id="nombre_proveedor"
              label="Nombre del proveedor"
              icono={Truck}
              type="text"
              placeholder="Ej.: Repuestos del Norte"
              maxLength={150}
              value={form.nombre_proveedor}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo para la identificación fiscal (RUC o cédula) */}
          <CampoFormulario
            id="identificacion"
            label="Identificación (opcional)"
            icono={Hash}
            type="text"
            placeholder="Ej.: RUC o cédula"
            maxLength={50}
            value={form.identificacion}
            onChange={handleChange}
          />

          {/* Campo para el número telefónico de contacto */}
          <CampoFormulario
            id="telefono"
            label="Teléfono (opcional)"
            icono={Phone}
            type="tel"
            placeholder="Ej.: 8888-1234"
            maxLength={30}
            value={form.telefono}
            onChange={handleChange}
          />

          {/* Campo para el correo electrónico */}
          <div className="sm:col-span-2">
            <CampoFormulario
              id="correo"
              label="Correo electrónico (opcional)"
              icono={Mail}
              type="email"
              placeholder="contacto@empresa.com"
              maxLength={150}
              value={form.correo}
              onChange={handleChange}
            />
          </div>

          {/* Campo para la dirección física */}
          <div className="sm:col-span-2">
            <CampoFormulario
              id="direccion"
              label="Dirección (opcional)"
              icono={MapPin}
              type="text"
              placeholder="Ciudad, zona o dirección física"
              maxLength={255}
              value={form.direccion}
              onChange={handleChange}
            />
          </div>

          {/* Selector de estado operativo (visible exclusivamente al editar) */}
          {esEdicion && (
            <div className="sm:col-span-2">
              <CampoSelect
                id="estado"
                label="Estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </CampoSelect>
            </div>
          )}
        </div>

        {/* Tarjeta de vista previa dinámica (visible solamente al registrar un nuevo proveedor) */}
        {!esEdicion && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">
              Vista previa
            </p>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600">
                <Truck size={16} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {form.nombre_proveedor.trim() || 'Nombre del proveedor'}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {form.identificacion.trim() ||
                    form.telefono.trim() ||
                    form.correo.trim() ||
                    'Sin datos de contacto todavía'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerta de error en caso de fallo durante la validación o envío */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {error}
          </p>
        )}

        {/* Botones de acción del pie del formulario */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={cargando}
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {!cargando && (esEdicion ? <Save size={15} /> : <Plus size={15} />)}
            {cargando
              ? 'Guardando...'
              : esEdicion
                ? 'Guardar cambios'
                : 'Registrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
