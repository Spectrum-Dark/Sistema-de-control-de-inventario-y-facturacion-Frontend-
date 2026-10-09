import { useState } from "react";

function useRegistro() {
  /* Estado para almacenar los valores del formulario */
  const [formulario, setFormulario] = useState({
    nombre: "",
    nombre_usuario: "",
    correo_electronico: "",
    contrasena: "",
    confirmar_contrasena: "",
  });

  /* Mensaje de error */
  const [error, setError] = useState("");

  // Manejador que se ejecuta cada vez que el usuario escribe en un campo de texto
  const manejarCambio = (evento) => {
    /* Extraemos el nombre del atributo 'name' y su valor */
    const { name, value } = evento.target;

    // Actualiza el estado manteniendo el valor previo de los otros campos
    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value, // Actualiza dinámicamente el campo actual
    }));

    /* Limpia los errores al escribir */
    if (error) setError("");
  };

  const manejarEnvio = (evento) => {
    /* Desactivamos la recarga automática de la página */
    evento.preventDefault();

    // Validar que ningún campo esté vacío
    if (
      !formulario.nombre.trim() ||
      !formulario.nombre_usuario.trim() ||
      !formulario.correo_electronico.trim() ||
      !formulario.contrasena ||
      !formulario.confirmar_contrasena
    ) {
      setError("Debe completar todos los campos.");
      return;
    }

    // Validar coincidencia de contraseñas
    if (formulario.contrasena !== formulario.confirmar_contrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Estructurar los datos limpios para el backend/servicio
    const datosRegistro = {
      nombre_completo: formulario.nombre.trim(),
      nombre_usuario: formulario.nombre_usuario.trim(),
      correo_electronico: formulario.correo_electronico.trim(),
      contrasena: formulario.contrasena,
    };

    console.log("Datos de registro procesados:", datosRegistro);

    // Futura integración del servicio de autenticación/registro
  };

  return {
    formulario,
    error,
    manejarCambio,
    manejarEnvio,
  };
}

export default useRegistro;
