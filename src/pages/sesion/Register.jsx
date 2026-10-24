import FormularioRegistro from '../../components/sesion/FormularioRegistro'
import PanelSesion from '../../components/sesion/PanelSesion'
import '../../components/sesion/sesion.css'

export default function Register() {
  return (
    <PanelSesion
      etiqueta="Empieza por aquí"
      titulo="Crea tu cuenta"
      descripcion="Registra tus datos para acceder al sistema de gestión."
    >
      <FormularioRegistro />
    </PanelSesion>
  )
}
