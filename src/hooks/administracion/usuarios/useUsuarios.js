import { useEffect, useMemo, useRef, useState } from "react";
import { sileo } from "sileo";

const API_URL = "http://127.0.0.1:8000/api";
const USUARIOS_POR_PAGINA = 10;

const FORMULARIO_INICIAL = {
  nombre_completo: "",
  nombre_usuario: "",
  correo: "",
  id_rol: "",
  estado: "Activo",
};

/**
 * Custom Hook para centralizar toda la lógica de negocio de la gestión de usuarios.
 * Sincronizado con las rutas de Laravel para listado, actualización general (datos, rol y estado)
 * y actualización de contraseñas.
 */
function useUsuarios() {
  // ==========================================
  // 1. ESTADOS PRINCIPALES
  // ==========================================
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [pagina, setPagina] = useState(1);

  // Estados de carga y control de errores de red
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Estados para el formulario de edición de datos de usuario
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState(FORMULARIO_INICIAL);
  const [erroresFormulario, setErroresFormulario] = useState({});
  const [guardando, setGuardando] = useState(false);

  // Estados para el formulario/modal de cambio de contraseña
  const [usuarioParaCambiarContrasena, setUsuarioParaCambiarContrasena] =
    useState(null);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [guardandoContrasena, setGuardandoContrasena] = useState(false);

  // Referencia para desplazamiento automático al formulario
  const referenciaFormulario = useRef(null);

  // ==========================================
  // 2. EFECTOS (CICLO DE VIDA Y ACCIONES)
  // ==========================================

  // Carga inicial de usuarios desde la API de Laravel con AbortController
  useEffect(() => {
    const controlador = new AbortController();

    async function cargarUsuarios() {
      setCargando(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "No hay una sesión activa. Inicia sesión nuevamente.",
          );
        }

        const respuesta = await fetch(`${API_URL}/usuarios`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controlador.signal,
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(
            resultado.message || "No fue posible obtener los usuarios.",
          );
        }

        const listaUsuarios = Array.isArray(resultado)
          ? resultado
          : resultado.datos;

        if (!Array.isArray(listaUsuarios)) {
          throw new Error(
            "La respuesta del servidor no contiene una lista de usuarios válida.",
          );
        }

        setUsuarios(listaUsuarios);
      } catch (errorConsulta) {
        if (errorConsulta.name === "AbortError") return;
        setError(
          errorConsulta.message || "No fue posible conectar con el servidor.",
        );
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarUsuarios();
    return () => controlador.abort();
  }, []);

  // Reiniciar a la página 1 cada vez que se aplique un filtro o búsqueda
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPagina(1);
  }, [busqueda, filtroRol, filtroEstado]);

  // Desplazamiento automático y suave hacia el formulario al seleccionar un usuario
  useEffect(() => {
    if (!usuarioSeleccionado) return;
    referenciaFormulario.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [usuarioSeleccionado]);

  // ==========================================
  // 3. FILTRADO Y PAGINACIÓN (OPTIMIZADO CON MEMO)
  // ==========================================
  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase();

    return usuarios.filter((usuario) => {
      const nombre = String(usuario.nombre_completo || "").toLocaleLowerCase();
      const nombreUsuario = String(
        usuario.nombre_usuario || "",
      ).toLocaleLowerCase();
      const correo = String(usuario.correo || "").toLocaleLowerCase();

      const coincideBusqueda =
        nombre.includes(texto) ||
        nombreUsuario.includes(texto) ||
        correo.includes(texto);

      const coincideRol =
        filtroRol === "" || String(usuario.id_rol) === filtroRol;
      const coincideEstado =
        filtroEstado === "" ||
        String(usuario.estado || "").toLowerCase() ===
          filtroEstado.toLowerCase();

      return coincideBusqueda && coincideRol && coincideEstado;
    });
  }, [usuarios, busqueda, filtroRol, filtroEstado]);

  // Métricas e indicadores de estado
  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter((u) => u.estado === "Activo").length;
  const usuariosInactivos = usuarios.filter(
    (u) => u.estado === "Inactivo",
  ).length;

  // Cálculo de paginación (10 registros por página)
  const totalPaginas = Math.max(
    1,
    Math.ceil(usuariosFiltrados.length / USUARIOS_POR_PAGINA),
  );
  const paginaActual = Math.min(pagina, totalPaginas);

  const usuariosPaginados = useMemo(() => {
    const indiceInicial = (paginaActual - 1) * USUARIOS_POR_PAGINA;
    return usuariosFiltrados.slice(
      indiceInicial,
      indiceInicial + USUARIOS_POR_PAGINA,
    );
  }, [usuariosFiltrados, paginaActual]);

  const inicio =
    usuariosFiltrados.length === 0
      ? 0
      : (paginaActual - 1) * USUARIOS_POR_PAGINA + 1;
  const fin = Math.min(
    paginaActual * USUARIOS_POR_PAGINA,
    usuariosFiltrados.length,
  );

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroRol("");
    setFiltroEstado("");
    setPagina(1);
  }

  function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  }

  // ==========================================
  // 4. GESTIÓN Y EDICIÓN DE USUARIOS
  // ==========================================
  function editarUsuario(usuario) {
    setUsuarioSeleccionado(usuario);
    setDatosFormulario({
      nombre_completo: usuario.nombre_completo || "",
      nombre_usuario: usuario.nombre_usuario || "",
      correo: usuario.correo || "",
      id_rol: String(usuario.id_rol ?? ""),
      estado: usuario.estado || "Activo",
    });
    setErroresFormulario({});
  }

  function cambiarCampoFormulario(nombre, valor) {
    setDatosFormulario((prev) => ({ ...prev, [nombre]: valor }));
    setErroresFormulario((prev) => ({ ...prev, [nombre]: "" }));
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (!datosFormulario.nombre_completo.trim()) {
      nuevosErrores.nombre_completo = "El nombre completo es obligatorio.";
    }
    if (!datosFormulario.nombre_usuario.trim()) {
      nuevosErrores.nombre_usuario = "El nombre de usuario es obligatorio.";
    }
    if (!datosFormulario.correo.trim()) {
      nuevosErrores.correo = "El correo electrónico es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.correo.trim())
    ) {
      nuevosErrores.correo = "Introduce un correo electrónico válido.";
    }
    if (!["1", "2", "3"].includes(datosFormulario.id_rol)) {
      nuevosErrores.id_rol = "Selecciona un rol válido.";
    }
    if (!["Activo", "Inactivo"].includes(datosFormulario.estado)) {
      nuevosErrores.estado = "Selecciona un estado válido.";
    }

    setErroresFormulario(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  // Guardar datos / rol / estado usando la ruta PUT /usuarios/{id}/datos de Laravel
  async function guardarUsuario(evento) {
    evento.preventDefault();
    if (!usuarioSeleccionado || guardando) return;
    if (!validarFormulario()) return;

    setGuardando(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay una sesión activa.");

      const datosActualizados = {
        nombre_completo: datosFormulario.nombre_completo.trim(),
        nombre_usuario: datosFormulario.nombre_usuario.trim(),
        correo: datosFormulario.correo.trim(),
        id_rol: Number(datosFormulario.id_rol),
        estado: datosFormulario.estado,
      };

      const respuesta = await fetch(
        `${API_URL}/usuarios/${usuarioSeleccionado.id_usuario}/datos`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datosActualizados),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        const erroresServidor = resultado.errors
          ? Object.values(resultado.errors).flat().join(" ")
          : "";
        throw new Error(
          erroresServidor || resultado.message || "No fue posible actualizar.",
        );
      }

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_usuario === resultado.datos.id_usuario
            ? { ...u, ...resultado.datos }
            : u,
        ),
      );

      sileo.success({
        title: "Procesado",
        description:
          resultado.message || "Los datos se actualizaron correctamente.",
      });

      cancelarEdicion();
    } catch (errorActualizacion) {
      sileo.error({
        title: "Error",
        description:
          errorActualizacion.message || "Ocurrió un error inesperado.",
      });
    } finally {
      setGuardando(false);
    }
  }

  function cancelarEdicion() {
    setUsuarioSeleccionado(null);
    setDatosFormulario(FORMULARIO_INICIAL);
    setErroresFormulario({});
  }

  // ==========================================
  // 5. GESTIÓN DE CONTRASEÑAS (Usa la ruta PUT /contrasena)
  // ==========================================
  function abrirCambiarContrasena(usuario) {
    setUsuarioParaCambiarContrasena(usuario);
    setNuevaContrasena("");
  }

  function cancelarCambiarContrasena() {
    setUsuarioParaCambiarContrasena(null);
    setNuevaContrasena("");
  }

  async function guardarNuevaContrasena(evento, confirmacionContrasena = "") {
    evento.preventDefault();
    if (!usuarioParaCambiarContrasena || guardandoContrasena) return;

    if (!nuevaContrasena || nuevaContrasena.trim().length < 8) {
      sileo.error({
        title: "Error",
        description: "La nueva contraseña debe tener al menos 8 caracteres.",
      });
      return;
    }

    setGuardandoContrasena(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay una sesión activa.");

      const respuesta = await fetch(
        `${API_URL}/usuarios/${usuarioParaCambiarContrasena.id_usuario}/contrasena`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            contrasena: nuevaContrasena.trim(),
            contrasena_confirmation: (
              confirmacionContrasena || nuevaContrasena
            ).trim(),
          }),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        const erroresServidor = resultado.errors
          ? Object.values(resultado.errors).flat().join(" ")
          : "";
        throw new Error(
          erroresServidor ||
            resultado.message ||
            "No fue posible actualizar la contraseña.",
        );
      }

      sileo.success({
        title: "Procesado",
        description:
          resultado.message || "La contraseña se ha modificado con éxito.",
      });

      cancelarCambiarContrasena();
    } catch (errorContrasena) {
      sileo.error({
        title: "Error",
        description:
          errorContrasena.message || "No se pudo cambiar la contraseña.",
      });
    } finally {
      setGuardandoContrasena(false);
    }
  }

  // ==========================================
  // 6. RETORNO DE VALORES Y ACCIONES AL COMPONENTE
  // ==========================================
  return {
    usuarios,
    usuariosPaginados,
    busqueda,
    setBusqueda,
    filtroRol,
    setFiltroRol,
    filtroEstado,
    setFiltroEstado,
    limpiarFiltros,
    pagina: paginaActual,
    cambiarPagina,
    totalPaginas,
    totalRegistros: usuariosFiltrados.length,
    inicio,
    fin,
    totalUsuarios,
    usuariosActivos,
    usuariosInactivos,
    cargando,
    error,
    usuarioSeleccionado,
    referenciaFormulario,
    datosFormulario,
    erroresFormulario,
    guardando,
    editarUsuario,
    cambiarCampoFormulario,
    guardarUsuario,
    cancelarEdicion,

    // Cambio de contraseña (conectado a la ruta /contrasena)
    usuarioParaCambiarContrasena,
    nuevaContrasena,
    setNuevaContrasena,
    guardandoContrasena,
    abrirCambiarContrasena,
    cancelarCambiarContrasena,
    guardarNuevaContrasena,
  };
}

export default useUsuarios;
