import FormularioLogin from '../../components/sesion/FormularioLogin'
import PanelSesion from '../../components/sesion/PanelSesion'
import '../../components/sesion/sesion.css'

export default function Login() {
  return (
    <PanelSesion
      etiqueta="Qué bueno verte de nuevo"
      titulo="Inicia sesión"
      descripcion="Ingresa tus datos para continuar con tu espacio de trabajo."
    >
      <FormularioLogin />
    </PanelSesion>
  )
}
