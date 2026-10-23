import { useEffect, useState } from "react";
import {
  AtSign,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import CampoFormulario from "../../components/compartido/CampoFormulario";
import { useAuth } from "../../hooks/sesion/useAuth";
import { cambiarContrasenaPropia, actualizarPerfilPropio } from "../../services/usuarios/usuariosService";
import { obtenerCambios } from "../../utils/compartido/formulario";
import { ROLES } from "../../utils/sesion/roles";

export default function Perfil() {
  const { usuario, token, iniciarSesion, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombre_completo: usuario?.nombre_completo ?? "",
    nombre_usuario: usuario?.nombre_usuario ?? "",
    correo: usuario?.correo ?? "",
  });
  const [contrasenas, setContrasenas] = useState({
    contrasena_actual: "",
    contrasena: "",
    contrasena_confirmation: "",
  });
  const [verContrasenas, setVerContrasenas] = useState(false);
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [guardandoContrasena, setGuardandoContrasena] = useState(false);
  const [errorPerfil, setErrorPerfil] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  useEffect(() => {
    if (!usuario) return;
    setPerfil({
      nombre_completo: usuario.nombre_completo,
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
    });
  }, [usuario]);

  const guardarPerfil = async (evento) => {
    evento.preventDefault();
    setErrorPerfil("");

    const valores = {
      nombre_completo: perfil.nombre_completo.trim(),
      nombre_usuario: perfil.nombre_usuario.trim(),
      correo: perfil.correo.trim(),
    };
    const cambios = obtenerCambios(valores, {
      nombre_completo: usuario.nombre_completo,
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
    });

    if (Object.keys(cambios).length === 0) {
      setErrorPerfil("No hay cambios para guardar.");
      return;
    }

    setGuardandoPerfil(true);
    try {
      const respuesta = await actualizarPerfilPropio(cambios);
      const usuarioActualizado = { ...usuario, ...respuesta.datos };
      iniciarSesion(token, usuarioActualizado);
      setPerfil({
        nombre_completo: usuarioActualizado.nombre_completo,
        nombre_usuario: usuarioActualizado.nombre_usuario,
        correo: usuarioActualizado.correo,
      });
      sileo.success({
        title: "Perfil actualizado",
        description: respuesta.message,
      });
    } catch (error) {
      setErrorPerfil(error.message);
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const cambiarContrasena = async (evento) => {
    evento.preventDefault();
    setErrorContrasena("");

    if (contrasenas.contrasena !== contrasenas.contrasena_confirmation) {
      setErrorContrasena("Las contraseñas no coinciden.");
      return;
    }

    setGuardandoContrasena(true);
    try {
      const respuesta = await cambiarContrasenaPropia(contrasenas);
      sileo.success({
        title: "Contraseña actualizada",
        description: respuesta.message,
      });
      cerrarSesion();
      navigate("/login", { replace: true });
    } catch (error) {
      setErrorContrasena(error.message);
    } finally {
      setGuardandoContrasena(false);
    }
  };

  const botonVerContrasena = (
    <button
      type="button"
      onClick={() => setVerContrasenas((actual) => !actual)}
      className="text-slate-400 transition hover:text-slate-600"
      aria-label={verContrasenas ? "Ocultar contraseñas" : "Mostrar contraseñas"}
    >
      {verContrasenas ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Mi perfil</h1>
        <p className="mt-1 text-sm text-slate-500">
          Actualiza tus datos personales y la contraseña de tu cuenta.
        </p>
      </header>

      <section className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xl font-semibold text-white">
          {usuario.nombre_completo.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-slate-900">{usuario.nombre_completo}</p>
          <p className="text-sm text-slate-500">{ROLES[usuario.id_rol]}</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex">
          <ShieldCheck size={15} />
          {usuario.es_administrador_principal ? "Administrador principal" : "Cuenta administradora"}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Datos personales</h2>
          <p className="mt-1 text-sm text-slate-500">Estos datos identifican tu cuenta en el sistema.</p>
        </div>
        <form onSubmit={guardarPerfil} className="space-y-4">
          <CampoFormulario
            id="nombre_completo"
            label="Nombre completo"
            icono={UserRound}
            type="text"
            maxLength={200}
            autoComplete="name"
            value={perfil.nombre_completo}
            onChange={(evento) => setPerfil({ ...perfil, nombre_completo: evento.target.value })}
            required
          />
          <CampoFormulario
            id="nombre_usuario"
            label="Nombre de usuario"
            icono={AtSign}
            type="text"
            maxLength={80}
            autoComplete="username"
            value={perfil.nombre_usuario}
            onChange={(evento) => setPerfil({ ...perfil, nombre_usuario: evento.target.value })}
            required
          />
          <CampoFormulario
            id="correo"
            label="Correo electrónico"
            icono={Mail}
            type="email"
            maxLength={150}
            autoComplete="email"
            value={perfil.correo}
            onChange={(evento) => setPerfil({ ...perfil, correo: evento.target.value })}
            required
          />
          {errorPerfil && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorPerfil}
            </p>
          )}
          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button
              type="submit"
              disabled={guardandoPerfil}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {guardandoPerfil ? "Guardando..." : "Guardar datos"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Cambiar contraseña</h2>
          <p className="mt-1 text-sm text-slate-500">
            Por seguridad, confirma tu contraseña actual. Al guardarla tendrás que iniciar sesión nuevamente.
          </p>
        </div>
        <form onSubmit={cambiarContrasena} className="space-y-4">
          <CampoFormulario
            id="contrasena_actual"
            label="Contraseña actual"
            icono={LockKeyhole}
            type={verContrasenas ? "text" : "password"}
            autoComplete="current-password"
            value={contrasenas.contrasena_actual}
            onChange={(evento) => setContrasenas({ ...contrasenas, contrasena_actual: evento.target.value })}
            required
            accionDerecha={botonVerContrasena}
          />
          <CampoFormulario
            id="contrasena"
            label="Nueva contraseña"
            icono={LockKeyhole}
            type={verContrasenas ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            value={contrasenas.contrasena}
            onChange={(evento) => setContrasenas({ ...contrasenas, contrasena: evento.target.value })}
            required
            accionDerecha={botonVerContrasena}
          />
          <CampoFormulario
            id="contrasena_confirmation"
            label="Confirmar nueva contraseña"
            icono={LockKeyhole}
            type={verContrasenas ? "text" : "password"}
            autoComplete="new-password"
            value={contrasenas.contrasena_confirmation}
            onChange={(evento) => setContrasenas({ ...contrasenas, contrasena_confirmation: evento.target.value })}
            required
          />
          {errorContrasena && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorContrasena}
            </p>
          )}
          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button
              type="submit"
              disabled={guardandoContrasena}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LockKeyhole size={16} />
              {guardandoContrasena ? "Actualizando..." : "Cambiar contraseña"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
