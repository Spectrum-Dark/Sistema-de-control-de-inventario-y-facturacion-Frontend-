import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AtSign, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import CampoFormulario from "../compartido/CampoFormulario";
import { solicitarInicioSesion } from "../../services/sesion/sesionService";
import { useAuth } from "../../hooks/sesion/useAuth";

export default function FormularioLogin() {
  const [form, setForm] = useState({ identificador: "", contrasena: "" });
  const [vercontrasena, setVercontrasena] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const datos = await solicitarInicioSesion(form);
      iniciarSesion(datos.token, datos.usuario);

      sileo.success({
        title: "Inicio de sesión exitoso",
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      sileo.error({
        title: "No se pudo iniciar sesión",
        description: error.message,
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CampoFormulario
        id="identificador"
        label="Nombre de usuario"
        icono={AtSign}
        type="text"
        placeholder="Ingresa tu usuario o correo electrónico"
        autoComplete="username"
        value={form.identificador}
        onChange={handleChange}
        required
      />

      <CampoFormulario
        id="contrasena"
        label="Contraseña"
        icono={Lock}
        type={vercontrasena ? "text" : "password"}
        placeholder="Ingresa tu contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        accionDerecha={
          <button
            type="button"
            onClick={() => setVercontrasena(!vercontrasena)}
            className="text-slate-400 hover:text-slate-600"
            aria-label={
              vercontrasena ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {vercontrasena ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      <button
        type="submit"
        disabled={cargando}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cargando && <Loader2 size={18} className="animate-spin" />}
        {cargando ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <p className="text-center text-sm text-slate-600">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className="font-medium text-slate-900 underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
