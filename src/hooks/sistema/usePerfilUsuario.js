import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";

const API_URL = "http://127.0.0.1:8000/api";

// Convierte el identificador del rol en un nombre legible.
function obtenerNombreRol(idRol) {
  const roles = {
    1: "Administrador",
    2: "Operador",
    3: "Consultor",
  };

  return roles[idRol] || "Sin rol asignado";
}

// Obtiene las iniciales del nombre del usuario.
function obtenerIniciales(nombre = "Usuario") {
  return (
    nombre
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase() || "U"
  );
}

export default function usePerfilUsuario() {
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const referencia = useRef(null);

  // Recuperar los datos guardados durante el inicio de sesión.
  const [usuario] = useState(() => {
    try {
      const usuarioGuardado = localStorage.getItem("usuario");

      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch {
      return null;
    }
  });

  const nombre = usuario?.nombre_completo || "Usuario";
  const correo = usuario?.correo || "Correo no disponible";
  const rol = obtenerNombreRol(usuario?.id_rol);
  const iniciales = obtenerIniciales(nombre);

  function alternarMenu() {
    setMenuAbierto((abierto) => !abierto);
  }

  // Cerrar la sesión en Laravel y limpiar los datos locales.
  async function cerrarSesion() {
    if (cerrandoSesion) return;

    setMenuAbierto(false);
    setCerrandoSesion(true);

    const token = localStorage.getItem("token");
    let cierreConfirmado = false;

    try {
      if (!token) {
        // No hay token local que enviar al servidor.
        cierreConfirmado = true;
      } else {
        const respuesta = await fetch(`${API_URL}/cerrar-sesion`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (respuesta.ok) {
          cierreConfirmado = true;
        } else if (respuesta.status === 401) {
          // El token ya no es válido en Laravel.
          cierreConfirmado = true;
        } else {
          throw new Error(
            "No fue posible confirmar el cierre de sesión en el servidor.",
          );
        }
      }
    } catch (error) {
      // La sesión local se cerrará aunque falle la conexión.
      console.error("Error al cerrar sesión:", error);
    } finally {
      // Eliminar las credenciales locales en cualquier escenario.
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      setCerrandoSesion(false);

      if (cierreConfirmado) {
        console.log("Sesion cerrada correctamente");
      } else {
        // Mostrar una notificación solo si falla la confirmación del servidor.
        if (!cierreConfirmado) {
          sileo.error({
            title: "Error de conexión",
            description:
              "No se pudo confirmar el cierre de sesión en el servidor. Tu sesión local se ha cerrado."
          });
        }
      }

      // Regresar a la pantalla de inicio de sesión.
      navigate("/sesion", { replace: true });
    }
  }

  // Cerrar el menú con Escape o al hacer clic fuera.
  useEffect(() => {
    function alPresionarTecla(evento) {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
      }
    }

    function alHacerClicFuera(evento) {
      if (referencia.current && !referencia.current.contains(evento.target)) {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("keydown", alPresionarTecla);
    document.addEventListener("mousedown", alHacerClicFuera);
    document.addEventListener("touchstart", alHacerClicFuera);

    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      document.removeEventListener("mousedown", alHacerClicFuera);
      document.removeEventListener("touchstart", alHacerClicFuera);
    };
  }, []);

  return {
    menuAbierto,
    referencia,
    nombre,
    correo,
    rol,
    iniciales,
    cerrandoSesion,
    alternarMenu,
    cerrarSesion,
  };
}
