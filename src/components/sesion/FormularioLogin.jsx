import { useState } from "react";
import { Link } from "react-router-dom";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import CampoFormulario from "./CampoFormulario";

export default function FormularioLogin() {
  const [form, setForm] = useState({ identificador: "", contrasena: "" });
  const [vercontrasena, setVercontrasena] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Más adelante aquí llamaremos al backend
    console.log(form);
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
        className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Iniciar sesión
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
