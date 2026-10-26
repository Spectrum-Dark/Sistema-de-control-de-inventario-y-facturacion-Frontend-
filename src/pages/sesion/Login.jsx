import FormularioLogin from '../../components/sesion/FormularioLogin';
import PanelSesion from '../../components/sesion/PanelSesion';
import '../../components/sesion/sesion.css';

/**
 * COMPONENTE PRINCIPAL: Login
 * Explicación: Orquestador de la vista de inicio de sesión que envuelve el formulario de autenticación
 * dentro de un panel de diseño estilizado con textos e insignias de bienvenida institucionales.
 */
export default function Login() {
  return (
    /* Componente contenedor de panel de sesión que estructura visualmente la página de acceso */
    <PanelSesion
      etiqueta="Qué bueno verte de nuevo"
      titulo="Inicia sesión"
      descripcion="Ingresa tus datos para continuar con tu espacio de trabajo."
    >
      {/* Componente que renderiza los campos del formulario de usuario y la lógica de autenticación */}
      <FormularioLogin />
    </PanelSesion>
  );
}
