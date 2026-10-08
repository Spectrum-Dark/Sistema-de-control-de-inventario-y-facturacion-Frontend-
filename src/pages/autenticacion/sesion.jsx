import { Link } from "react-router-dom";
import useSesion from "../../hooks/autenticacion/useSesion";

function Iniciar_Sesion() {
  const { formulario, error, manejarCambio, manejarEnvio } = useSesion();

  return (
    <main className="flex min-h-screen bg-slate-100">
      {/* Panel institucional (solo escritorio) */}
      <aside className="hidden flex-col justify-between bg-slate-900 px-14 py-12 text-white lg:flex lg:w-5/12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-lg font-bold text-slate-900">
            R
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-200">
            Sistema de Repuestos
          </span>
        </div>

        <div>
          <h2 className="text-4xl font-semibold leading-snug">
            Gestión integral de ventas de repuestos vehiculares
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-slate-400">
            Administra inventario, clientes y transacciones desde una única
            plataforma segura.
          </p>
        </div>

        <p className="border-t border-slate-700 pt-5 text-xs text-center text-slate-500">
          Acceso restringido a usuarios autorizados
        </p>
      </aside>

      {/* Panel del formulario */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8">
        {/* Marca compacta (solo móvil y tablet) */}
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-lg font-bold text-white">
            R
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-700">
            Sistema de Repuestos
          </span>
        </div>

        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa tus credenciales para continuar.
          </p>

          <form onSubmit={manejarEnvio} className="mt-8 space-y-5">
            {/* Inputs de sesion */}
            {/* ------------------------------------------------------ */}
            <div>
              <label
                htmlFor="nombre_usuario"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Usuario
              </label>
              <input
                type="text"
                id="nombre_usuario"
                name="nombre_usuario"
                value={formulario.nombre_usuario}
                onChange={manejarCambio}
                className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
            {/* ------------------------------------------------------ */}
            <div>
              <label
                htmlFor="contrasena"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formulario.contrasena}
                onChange={manejarCambio}
                className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
            {/* ------------------------------------------------------ */}

            {/* Mensaje de error */}
            {error && (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              Registrarse
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Iniciar_Sesion;