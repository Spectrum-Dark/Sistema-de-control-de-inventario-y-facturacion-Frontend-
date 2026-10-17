import { useState } from "react";
import { Link } from "react-router-dom";
import { User, AtSign, Mail, Lock, Eye, EyeOff } from "lucide-react";
import CampoFormulario from "./CampoFormulario";

export default function FormularioRegistro() {
  const [form, setForm] = useState({
    nombre_completo: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    confirmar_contrasena: "",
  });
  const [vercontrasena, setVercontrasena] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.contrasena !== form.confirmar_contrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Más adelante aquí llamaremos al backend
    console.log(form);
  };

  const botonOjo = (
    <button
      type="button"
      onClick={() => setVercontrasena(!vercontrasena)}
      className="text-slate-400 hover:text-slate-600"
      aria-label={vercontrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {vercontrasena ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CampoFormulario
        id="nombre_completo"
        label="Nombre completo"
        icono={User}
        type="text"
        placeholder="Tu nombre"
        value={form.nombre_completo}
        onChange={handleChange}
        required
      />

      <CampoFormulario
        id="nombre_usuario"
        label="Nombre de usuario"
        icono={AtSign}
        type="text"
        placeholder="Ej: jperez"
        autoComplete="username"
        value={form.nombre_usuario}
        onChange={handleChange}
        required
      />

      <CampoFormulario
        id="correo"
        label="Correo electrónico"
        icono={Mail}
        type="email"
        placeholder="correo@ejemplo.com"
        value={form.correo}
        onChange={handleChange}
        required
      />

      <CampoFormulario
        id="contrasena"
        label="Contraseña"
        icono={Lock}
        type={vercontrasena ? "text" : "password"}
        placeholder="Crea una contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        accionDerecha={botonOjo}
      />

      <CampoFormulario
        id="confirmar_contrasena"
        label="Confirmar contraseña"
        icono={Lock}
        type={vercontrasena ? "text" : "password"}
        placeholder="Repite la contraseña"
        value={form.confirmar_contrasena}
        onChange={handleChange}
        required
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Crear cuenta
      </button>

      <p className="text-center text-sm text-slate-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="font-medium text-slate-900 underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
