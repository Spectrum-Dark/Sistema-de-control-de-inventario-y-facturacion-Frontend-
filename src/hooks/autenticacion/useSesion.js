import { useState } from "react";

function useSesion() {
  /* Estadio para almancenar los valores del formulario */
  const [formulario, setFormulario] = useState({
    nombre_usuario: "",
    contrasena: "",
  });

  /* --- mensaje de errores */
  const [error, setError] = useState("");

  // Manejador que se ejecuta cada vez que el usuario escribe en un campo de texto
  const manejarCambio = (evento) => {
    // Extrae las propiedades 'name' y 'value' del input que disparó el evento
    const { name, value } = evento.target;

    // Actualiza el estado manteniendo el valor previo de los otros campos
    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value, // Actualiza dinámicamente el campo actual mediante su propiedad 'name'
    }));

    // Limpia el mensaje de error cuando el usuario empieza a modificar los campos
    setError("");
  };

  const manejarEnvio = (evento) => {
    /* Evitamos la carga automatica de la web */
    evento.preventDefault();

    /* validamos si los campos estan vacios */
    if (!formulario.nombre_usuario || !formulario.contrasena) {
      setError("Debe completar todos los campos");
      return;
    }

    /* Objecto de datos */
    const datosSesion = {
      nombre_usuario: formulario.nombre_usuario,
      contrasena: formulario.contrasena,
    };
    console.log("Datos de inicio de sesion", datosSesion);
  };

  /* retornamos los valores y funciones al componente */
  return {
    formulario,
    error,
    manejarCambio,
    manejarEnvio,
  };
}

export default useSesion;
