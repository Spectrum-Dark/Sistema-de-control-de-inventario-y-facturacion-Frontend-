import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";

const API_URL = "http://127.0.0.1:8000/api";

function useSesion() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/app", { replace: true });
    }
  }, [navigate]);

  const [formulario, setFormulario] = useState({
    nombre_usuario: "",
    contrasena: "",
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

    const identificador = formulario.nombre_usuario.trim();
    const contrasena = formulario.contrasena;

    if (!identificador || !contrasena) {
      sileo.error({
        title: "Campos incompletos",
        description: "Ingresa tu usuario o correo y tu contraseña.",
      });
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/sesion`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identificador,
          contrasena,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        const mensajeValidacion = datos.errors
          ? Object.values(datos.errors).flat()[0]
          : null;

        throw new Error(
          mensajeValidacion ||
            datos.message ||
            "No fue posible iniciar sesión.",
        );
      }

      // Guardar los datos de autenticación para las siguientes peticiones.
      localStorage.setItem("token", datos.token);
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));

      sileo.success({
        title: "¡Bienvenido!",
        description: datos.message || "Sesión iniciada correctamente.",
      });

      navigate("/app");
    } catch (error) {
      sileo.error({
        title: "Error al iniciar sesión",
        description:
          error.message || "No fue posible conectar con el servidor.",
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

export default useSesion;
