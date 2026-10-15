import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";

const API_URL = "http://127.0.0.1:8000/api";

function useRegistro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre_completo: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    confirmar_contrasena: "",
  });

  const [cargando, setCargando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (cargando) return;

    if (
      !formulario.nombre_completo.trim() ||
      !formulario.nombre_usuario.trim() ||
      !formulario.correo.trim() ||
      !formulario.contrasena ||
      !formulario.confirmar_contrasena
    ) {
      sileo.error({
        title: "Campos incompletos",
        description: "Completa todos los campos del formulario.",
      });
      return;
    }

    if (formulario.contrasena.length < 8) {
      sileo.error({
        title: "Contraseña no válida",
        description: "La contraseña debe tener al menos 8 caracteres.",
      });
      return;
    }

    if (formulario.contrasena !== formulario.confirmar_contrasena) {
      sileo.error({
        title: "Contraseñas diferentes",
        description: "Verifica que ambas contraseñas coincidan.",
      });
      return;
    }

    const datosRegistro = {
      nombre_completo: formulario.nombre_completo.trim(),
      nombre_usuario: formulario.nombre_usuario.trim(),
      correo: formulario.correo.trim(),
      contrasena: formulario.contrasena,
      confirmar_contrasena: formulario.confirmar_contrasena,
    };

    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      let datos;

      try {
        datos = await respuesta.json();
      } catch {
        throw new Error("El servidor devolvió una respuesta no válida.");
      }

      if (!respuesta.ok) {
        const mensajeErrores = datos.errors
          ? Object.values(datos.errors).flat()[0]
          : "";

        throw new Error(
          mensajeErrores ||
            datos.message ||
            "No fue posible completar el registro.",
        );
      }

      setFormulario({
        nombre_completo: "",
        nombre_usuario: "",
        correo: "",
        contrasena: "",
        confirmar_contrasena: "",
      });

      sileo.success({
        title: "¡Cuenta creada!",
        description: datos.message || "Ya puedes iniciar sesión.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      sileo.error({
        title: "No se pudo registrar",
        description:
          error.message ||
          "No fue posible conectar con el servidor. Inténtalo nuevamente.",
      });
    } finally {
      setCargando(false);
    }
  };

  return {
    formulario,
    cargando,
    manejarCambio,
    manejarEnvio,
  };
}

export default useRegistro;
