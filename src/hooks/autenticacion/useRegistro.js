import { useState } from "react";

function useRegistro() {
  /* Estadio para almancenar los valores del formulario */
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    correo_electronico: "",
    contrasena: "",
    confirmar_contrasena: "",
  });

  /* --- mensaje de errores */
  const [error, setError] = useState("");

  // Manejador que se ejecuta cada vez que el usuario escribe en un campo de texto
  const manejarCambio = (evento) => {
    /* Extraemoslos valores el formulario */
    const { name, value } = evento.target;

    // Actualiza el estado manteniendo el valor previo de los otros campos
    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value, // Actualiza dinámicamente el campo actual mediante su propiedad 'name'
    }));

    /* Limpia los errores */
    setError("");
  };

  const manejarEnvio = (evento) => {
    /* Desactivamos la recarga automatica */
    evento.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.apellido ||
      !formulario.nombre_usuario ||
      !formulario.correo_electronico ||
      !formulario.contrasena ||
      !formulario.confirmar_contrasena
    ) {
      setError("Debe completar todos los campos.");
      return;
    }

    if (formulario.contrasena !== formulario.confirmar_contrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const datosRegistro = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      nombre_usuario: formulario.nombre_usuario,
      correo_electronico: formulario.correo_electronico,
      contrasena: formulario.contrasena,
    };

    console.log("Datos de registro:", datosRegistro);
  };

  return {
    formulario,
    error,
    manejarCambio,
    manejarEnvio,
  };
}

export default useRegistro;
