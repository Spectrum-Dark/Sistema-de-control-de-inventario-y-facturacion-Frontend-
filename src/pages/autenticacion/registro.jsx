import { useState } from "react";
import { Link } from "react-router-dom";
import useRegistro from "../../hooks/autenticacion/useRegistro";

// =====================================================
// LOGO PERSONALIZADO SVG (Astro / daily.dev)
// =====================================================
const LogoAstroSVG = () => (
  <svg
    className="h-10 w-auto text-blue-600 shrink-0"
    viewBox="0 0 256 144"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M219.832837,71.6995129 L191.573071,43.3805814 L205.69559,15.0714884 L251.612188,61.0842182 C257.462604,66.9468836 257.462604,76.4521422 251.612188,82.3148081 L195.097565,138.947752 C189.247148,144.810417 179.761748,144.810417 173.911332,138.947752 C168.060915,133.085086 168.060915,123.579827 173.911332,117.717162 L219.832837,71.6995129 Z"
        fill="#3b82f6"
      ></path>
      <path
        d="M173.921862,4.39576953 C179.772279,-1.46689601 189.260133,-1.46443637 195.11055,4.39822916 L205.706121,15.0159838 L82.0886685,138.892247 C76.238252,144.754913 66.7503974,144.752453 60.8999803,138.889788 L50.3044093,128.272033 L173.921862,4.39576953 Z M120.941551,43.3299961 L99.7504086,64.5655051 L71.4906426,36.2465737 L36.167163,71.6440084 L64.4269285,99.96294 L50.3044093,128.272033 L4.38781264,82.2593032 C-1.46260421,76.3966377 -1.46260421,66.8913792 4.38781264,61.0287132 L60.8999803,4.39822916 C66.7503974,-1.46443637 76.238252,-1.46689601 82.0886685,4.39576953 L120.941551,43.3299961 Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

function Registrar_Usuarios() {
  const { formulario, cargando, manejarCambio, manejarEnvio } = useRegistro();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-8 text-slate-800 antialiased">
      {/* =====================================================
          CONTENEDOR DE LA TARJETA DE REGISTRO
      ===================================================== */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Resplandor difuminado gris detrás del formulario */}
        <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gray-300/40 blur-2xl"></div>
        <div className="pointer-events-none absolute -inset-2 -translate-y-2 rounded-[2.5rem] bg-gray-200/60 blur-2xl"></div>

        {/* Tarjeta */}
        <div className="relative rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-8">
          {/* ENCABEZADO CENTRADO CON LOGO Y MARCA ASTRO */}
          <div className="flex flex-col items-center border-b border-slate-100 pb-5 text-center">
            <div className="mb-2 flex items-center justify-center">
              <LogoAstroSVG />
            </div>

            <span className="text-sm font-black tracking-wider text-slate-900">
              ASTRO
            </span>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Crear cuenta
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Ingresa tus datos para registrarte en la plataforma
            </p>
          </div>

          {/* FORMULARIO ESTRUCTURADO */}
          <form onSubmit={manejarEnvio} className="mt-6 space-y-4">
            {/* PRIMERA FILA: Nombre Completo + Usuario a la par */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Nombre Completo */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Nombre completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre_completo"
                  value={formulario.nombre_completo}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej. Carlos Mendoza"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Usuario */}
              <div>
                <label
                  htmlFor="nombre_usuario"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Usuario <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre_usuario"
                  name="nombre_usuario"
                  value={formulario.nombre_usuario}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej. cmendoza"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div>
              <label
                htmlFor="correo_electronico"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Correo electrónico <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="correo_electronico"
                name="correo"
                value={formulario.correo}
                onChange={manejarCambio}
                required
                placeholder="carlos@ejemplo.com"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="contrasena"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Contraseña <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMostrarContrasena((prev) => !prev)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {mostrarContrasena ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <input
                type={mostrarContrasena ? "text" : "password"}
                id="contrasena"
                name="contrasena"
                value={formulario.contrasena}
                onChange={manejarCambio}
                required
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label
                htmlFor="confirmar_contrasena"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Confirmar contraseña <span className="text-rose-500">*</span>
              </label>
              <input
                type={mostrarContrasena ? "text" : "password"}
                id="confirmar_contrasena"
                name="confirmar_contrasena"
                value={formulario.confirmar_contrasena}
                onChange={manejarCambio}
                required
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Botón Principal */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-600/50"
              >
                {cargando ? "Registrando..." : "Registrarme"}
              </button>
            </div>
          </form>

          {/* Enlace a Login */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registrar_Usuarios;
