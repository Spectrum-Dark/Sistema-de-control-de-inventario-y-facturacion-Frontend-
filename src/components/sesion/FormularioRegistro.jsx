import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, AtSign, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { sileo } from 'sileo';
import CampoFormulario from '../compartido/CampoFormulario';
import { solicitarRegistro } from '../../services/sesion/sesionService';

// Componente 'FormularioRegistro' para gestionar el registro de nuevos usuarios en el sistema, incorporando validación de contraseñas coincidentes, campos requeridos y control de estados de carga.
export default function FormularioRegistro() {
  const [form, setForm] = useState({
    nombre_completo: '',
    nombre_usuario: '',
    correo: '',
    contrasena: '',
    confirmar_contrasena: '',
  });
  const [vercontrasena, setVercontrasena] = useState(false);
  const [errorConfirmacion, setErrorConfirmacion] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  // Manejador genérico para actualizar el estado del formulario de registro y limpiar errores previos de coincidencia.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorConfirmacion('');
  };

  // Manejador del envío del formulario para procesar el registro del usuario mediante la API y redirigir al login.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de seguridad: verifica que la contraseña y su confirmación sean idénticas.
    if (form.contrasena !== form.confirmar_contrasena) {
      setErrorConfirmacion('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);

    try {
      await solicitarRegistro(form);

      sileo.success({
        title: 'Cuenta creada',
        description: 'Ya puedes iniciar sesión',
      });

      navigate('/login', { replace: true });
    } catch (error) {
      sileo.error({
        title: 'No se pudo crear la cuenta',
        description: error.message,
      });
    } finally {
      setCargando(false);
    }
  };

  // Botón auxiliar reutilizable para alternar la visibilidad de los campos de contraseña.
  const botonOjo = (
    <button
      type="button"
      onClick={() => setVercontrasena(!vercontrasena)}
      className="text-slate-400 hover:text-slate-600"
      aria-label={vercontrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    >
      {vercontrasena ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Campo para el nombre completo del usuario */}
      <CampoFormulario
        id="nombre_completo"
        label="Nombre completo"
        icono={User}
        type="text"
        placeholder="Tu nombre"
        maxLength={200}
        value={form.nombre_completo}
        onChange={handleChange}
        required
      />

      {/* Campo para el nombre de usuario (identificador de acceso) */}
      <CampoFormulario
        id="nombre_usuario"
        label="Nombre de usuario"
        icono={AtSign}
        type="text"
        placeholder="Ej: jperez"
        autoComplete="username"
        maxLength={80}
        value={form.nombre_usuario}
        onChange={handleChange}
        required
      />

      {/* Campo para el correo electrónico del usuario */}
      <CampoFormulario
        id="correo"
        label="Correo electrónico"
        icono={Mail}
        type="email"
        placeholder="correo@ejemplo.com"
        maxLength={150}
        value={form.correo}
        onChange={handleChange}
        required
      />

      {/* Campo para la contraseña principal */}
      <CampoFormulario
        id="contrasena"
        label="Contraseña"
        icono={Lock}
        type={vercontrasena ? 'text' : 'password'}
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        minLength={8}
        value={form.contrasena}
        onChange={handleChange}
        required
        accionDerecha={botonOjo}
      />

      {/* Campo para la confirmación de la contraseña */}
      <CampoFormulario
        id="confirmar_contrasena"
        label="Confirmar contraseña"
        icono={Lock}
        type={vercontrasena ? 'text' : 'password'}
        placeholder="Repite la contraseña"
        autoComplete="new-password"
        value={form.confirmar_contrasena}
        onChange={handleChange}
        error={errorConfirmacion}
        required
      />

      {/* Botón principal de envío para procesar el registro */}
      <button
        type="submit"
        disabled={cargando}
        className="auth-submit w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cargando && <Loader2 size={18} className="animate-spin" />}
        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      {/* Pie del formulario con enlace de redirección hacia el inicio de sesión */}
      <p className="auth-form-footer">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
}
