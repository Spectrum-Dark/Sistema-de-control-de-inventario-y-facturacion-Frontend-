import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { sileo } from 'sileo';
import CampoFormulario from '../compartido/CampoFormulario';
import { solicitarInicioSesion } from '../../services/sesion/sesionService';
import { useAuth } from '../../hooks/sesion/useAuth';

// Componente 'FormularioLogin' para gestionar la autenticación de usuarios en el sistema, incorporando campos de identificación y contraseña con visibilidad alternable y manejo de estados de carga.
export default function FormularioLogin() {
  const [form, setForm] = useState({ identificador: '', contrasena: '' });
  const [vercontrasena, setVercontrasena] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  // Manejador genérico para actualizar el estado del formulario de inicio de sesión.
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Manejador del envío del formulario para autenticar credenciales y redirigir al panel principal.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const datos = await solicitarInicioSesion(form);
      iniciarSesion(datos.token, datos.usuario);

      sileo.success({
        title: 'Inicio de sesión exitoso',
      });

      navigate('/dashboard', { replace: true });
    } catch (error) {
      sileo.error({
        title: 'No se pudo iniciar sesión',
        description: error.message,
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Campo para el nombre de usuario o correo electrónico */}
      <CampoFormulario
        id="identificador"
        label="Nombre de usuario"
        icono={AtSign}
        type="text"
        placeholder="Ingresa tu usuario o correo electrónico"
        autoComplete="username"
        value={form.identificador}
        onChange={handleChange}
        required
      />

      {/* Campo para la contraseña con botón interactivo para alternar su visibilidad */}
      <CampoFormulario
        id="contrasena"
        label="Contraseña"
        icono={Lock}
        type={vercontrasena ? 'text' : 'password'}
        placeholder="Ingresa tu contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        accionDerecha={
          <button
            type="button"
            onClick={() => setVercontrasena(!vercontrasena)}
            className="text-slate-400 hover:text-slate-600"
            aria-label={
              vercontrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
          >
            {vercontrasena ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      {/* Botón de envío principal */}
      <button
        type="submit"
        disabled={cargando}
        className="auth-submit w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cargando && <Loader2 size={18} className="animate-spin" />}
        {cargando ? 'Ingresando...' : 'Iniciar sesión'}
      </button>

      {/* Pie del formulario con enlace de redirección hacia el registro */}
      <p className="auth-form-footer">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </form>
  );
}
