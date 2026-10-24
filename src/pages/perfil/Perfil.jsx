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
    <div className="mx-auto max-w-6xl space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <span className="module-heading-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"><UserRound size={20} /></span>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cuenta</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Mi perfil</h1>
            <p className="mt-1 text-sm text-slate-500">Administra tu información personal y seguridad.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
          <ShieldCheck size={15} className="text-slate-500" />
          {usuario.es_administrador_principal ? "Administrador principal" : "Cuenta administradora"}
        </div>
      </header>

      <section className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-800">
          {usuario.nombre_completo.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{usuario.nombre_completo}</p>
          <p className="mt-0.5 truncate text-sm text-slate-500">{usuario.correo}</p>
        </div>
        <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">
          {ROLES[usuario.id_rol]}
        </span>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
              <UserRound size={17} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Datos personales</h2>
              <p className="mt-0.5 text-xs text-slate-500">Información de tu cuenta.</p>
            </div>
          </div>
          <form onSubmit={guardarPerfil} className="space-y-3.5">
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
            {errorPerfil && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorPerfil}</p>}
            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button type="submit" disabled={guardandoPerfil} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60">
                <Save size={16} />{guardandoPerfil ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
              <LockKeyhole size={17} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Seguridad</h2>
              <p className="mt-0.5 text-xs text-slate-500">Actualiza la contraseña de acceso.</p>
            </div>
          </div>
          <form onSubmit={cambiarContrasena} className="space-y-3.5">
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
            <p className="text-xs leading-relaxed text-slate-500">Al cambiarla, cerrarás tu sesión y tendrás que ingresar nuevamente.</p>
            {errorContrasena && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorContrasena}</p>}
            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button type="submit" disabled={guardandoContrasena} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60">
                <LockKeyhole size={16} />{guardandoContrasena ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
