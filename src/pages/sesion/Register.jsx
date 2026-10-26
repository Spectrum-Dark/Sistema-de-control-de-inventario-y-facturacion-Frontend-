import FormularioRegistro from '../../components/sesion/FormularioRegistro';
import PanelSesion from '../../components/sesion/PanelSesion';
import '../../components/sesion/sesion.css';

/**
 * COMPONENTE PRINCIPAL: Register
 * Explicación: Orquestador de la vista de registro de nuevos usuarios que encapsula el formulario de alta
 * dentro de un panel de diseño estilizado con títulos e insignias de bienvenida al sistema de gestión.
 */
export default function Register() {
  return (
    /* Componente contenedor de panel de sesión que estructura visualmente la página de registro */
    <PanelSesion
      etiqueta="Empieza por aquí"
      titulo="Crea tu cuenta"
      descripcion="Registra tus datos para acceder al sistema de gestión."
    >
      {/* Componente que renderiza los campos del formulario de registro y la lógica de creación de cuenta */}
      <FormularioRegistro />
    </PanelSesion>
  );
}
