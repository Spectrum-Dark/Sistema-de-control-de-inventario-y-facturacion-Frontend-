import { useState } from "react";
import { Link } from "react-router-dom";
import useSesion from "../../hooks/autenticacion/useSesion";

// =====================================================
// LOGO PERSONALIZADO SVG (Astro / daily.dev)
// =====================================================
const LogoAstroSVG = () => (
  <svg
    className="h-10 w-auto text-indigo-600 shrink-0"
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

function Iniciar_Sesion() {
  const { formulario, error, manejarCambio, manejarEnvio } = useSesion();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-8 text-slate-800 antialiased sm:py-12">
      {/* Círculo estructural (solo pantallas medianas en adelante) */}
      <div className="pointer-events-none absolute hidden h-125 w-125 rounded-full border border-slate-200/60 bg-transparent md:block"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Tarjetas rotadas decorativas (ocultas en móvil) */}
        <div className="pointer-events-none absolute inset-0 hidden -rotate-6 transform rounded-3xl bg-[#1e232a] shadow-xl sm:block"></div>
        <div className="pointer-events-none absolute inset-0 hidden rotate-3 transform rounded-3xl bg-indigo-600/90 shadow-lg sm:block"></div>

        {/* Tarjeta del formulario */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl sm:p-10">
          {/* Marca e Identificación ASTRO */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-2 flex items-center justify-center">
              <LogoAstroSVG />
            </div>

            <span className="text-sm font-black tracking-wider text-slate-900">
              ASTRO
            </span>

            <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Iniciar sesión
            </h1>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={manejarEnvio} className="mt-6 space-y-4 sm:mt-8">
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
                placeholder="Tu usuario"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

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
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
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
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 animate-in fade-in"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500"></span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
            >
              Ingresar
            </button>
          </form>

          {/* Registro */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-500">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Solicitar registro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Iniciar_Sesion;
