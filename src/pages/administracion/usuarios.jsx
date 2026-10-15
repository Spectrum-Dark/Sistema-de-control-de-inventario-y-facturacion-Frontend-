
import { useMemo, useState } from "react";

const rolesDisponibles = ["Administrador", "Operador", "Consultor"];

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Usuario Administrador",
    correo: "admin@sistema.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Usuario Operador",
    correo: "operador@sistema.com",
    rol: "Operador",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Usuario Consultor",
    correo: "consultor@sistema.com",
    rol: "Consultor",
    estado: "Inactivo",
  },
];

const formularioInicial = {
  nombre: "",
  correo: "",
  rol: "Operador",
  estado: "Activo",
};

function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");
  const [pagina, setPagina] = useState(1);

  const registrosPorPagina = 10;

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const texto = busqueda.trim().toLowerCase();

      const coincideBusqueda =
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.correo.toLowerCase().includes(texto);

      const coincideRol = !filtroRol || usuario.rol === filtroRol;
      const coincideEstado =
        !filtroEstado || usuario.estado === filtroEstado;

      return coincideBusqueda && coincideRol && coincideEstado;
    });
  }, [usuarios, busqueda, filtroRol, filtroEstado]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(usuariosFiltrados.length / registrosPorPagina)
  );

  const usuariosPagina = usuariosFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.estado === "Activo"
  ).length;

  const usuariosInactivos = usuarios.filter(
    (usuario) => usuario.estado === "Inactivo"
  ).length;

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
  }

  function abrirRegistro() {
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setError("");
    setMostrarFormulario(true);
  }

  function abrirEdicion(usuario) {
    setUsuarioEditando(usuario);

    setFormulario({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      estado: usuario.estado,
    });

    setError("");
    setMostrarFormulario(true);
  }

  function cerrarFormulario() {
    setMostrarFormulario(false);
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setError("");
  }

  function guardarUsuario(evento) {
    evento.preventDefault();

    const nombre = formulario.nombre.trim();
    const correo = formulario.correo.trim().toLowerCase();

    if (!nombre || !correo || !formulario.rol || !formulario.estado) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
      setError("Introduce un correo electrónico válido.");
      return;
    }

    const correoExistente = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() === correo &&
        usuario.id !== usuarioEditando?.id
    );

    if (correoExistente) {
      setError("Ya existe un usuario registrado con ese correo.");
      return;
    }

    const datosUsuario = {
      nombre,
      correo,
      rol: formulario.rol,
      estado: formulario.estado,
    };

    if (usuarioEditando) {
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? { ...usuario, ...datosUsuario }
            : usuario
        )
      );

      console.log("Actualizar usuario:", {
        id_usuario: usuarioEditando.id,
        ...datosUsuario,
      });
    } else {
      const nuevoUsuario = {
        id: Math.max(0, ...usuarios.map((usuario) => usuario.id)) + 1,
        ...datosUsuario,
      };

      setUsuarios((actuales) => [...actuales, nuevoUsuario]);

      console.log("Registrar usuario:", {
        nombre,
        correo,
        rol: formulario.rol,
        estado: formulario.estado,
      });
    }

    setPagina(1);
    cerrarFormulario();
  }

  function cambiarEstado(usuario) {
    const nuevoEstado =
      usuario.estado === "Activo" ? "Inactivo" : "Activo";

    setUsuarios((actuales) =>
      actuales.map((item) =>
        item.id === usuario.id
          ? { ...item, estado: nuevoEstado }
          : item
      )
    );

    console.log("Cambiar estado del usuario:", {
      id_usuario: usuario.id,
      estado: nuevoEstado,
    });
  }

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroRol("");
    setFiltroEstado("");
    setPagina(1);
  }

  function cambiarBusqueda(valor) {
    setBusqueda(valor);
    setPagina(1);
  }

  function cambiarFiltroRol(valor) {
    setFiltroRol(valor);
    setPagina(1);
  }

  function cambiarFiltroEstado(valor) {
    setFiltroEstado(valor);
    setPagina(1);
  }

  return (
    <main className="space-y-6 text-slate-900">
      {/* Encabezado del módulo */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Administración
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra las cuentas y los roles de acceso al sistema.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirRegistro}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m-7-7h14"
            />
          </svg>

          Registrar usuario
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total de usuarios
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {usuarios.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Cuentas registradas en el ejemplo
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Usuarios activos
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {usuariosActivos}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Cuentas con estado activo
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Usuarios inactivos
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-500">
            {usuariosInactivos}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Cuentas desactivadas
          </p>
        </div>
      </section>

      {/* Formulario de registro y edición */}
      {mostrarFormulario && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                {usuarioEditando
                  ? "Editar usuario"
                  : "Registrar usuario"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Los campos marcados son obligatorios.
              </p>
            </div>

            <button
              type="button"
              onClick={cerrarFormulario}
              aria-label="Cerrar formulario"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18 6-12 12M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={guardarUsuario} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Nombre completo *
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  maxLength={100}
                  required
                  placeholder="Nombre del usuario"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Correo electrónico *
                </label>

                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formulario.correo}
                  onChange={actualizarCampo}
                  maxLength={150}
                  required
                  placeholder="usuario@correo.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                />
              </div>

              <div>
                <label
                  htmlFor="rol"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Rol de usuario *
                </label>

                <select
                  id="rol"
                  name="rol"
                  value={formulario.rol}
                  onChange={actualizarCampo}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                >
                  {rolesDisponibles.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Estado *
                </label>

                <select
                  id="estado"
                  name="estado"
                  value={formulario.estado}
                  onChange={actualizarCampo}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cerrarFormulario}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {usuarioEditando ? "Guardar cambios" : "Registrar usuario"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Filtros */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Buscar y filtrar usuarios
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="busquedaUsuarios"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Buscar usuario
            </label>

            <input
              id="busquedaUsuarios"
              type="search"
              value={busqueda}
              onChange={(evento) => cambiarBusqueda(evento.target.value)}
              placeholder="Nombre o correo electrónico..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>

          <div>
            <label
              htmlFor="filtroRol"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Filtrar por rol
            </label>

            <select
              id="filtroRol"
              value={filtroRol}
              onChange={(evento) => cambiarFiltroRol(evento.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="">Todos los roles</option>
              {rolesDisponibles.map((rol) => (
                <option key={rol} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filtroEstado"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Filtrar por estado
            </label>

            <select
              id="filtroEstado"
              value={filtroEstado}
              onChange={(evento) =>
                cambiarFiltroEstado(evento.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={limpiarFiltros}
            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      {/* Tabla de usuarios */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Usuarios registrados
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Consulta las cuentas y administra sus datos.
            </p>
          </div>

          <span className="self-start rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 sm:self-auto">
            {usuariosFiltrados.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Usuario
                </th>

                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Correo electrónico
                </th>

                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Rol
                </th>

                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Estado
                </th>

                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {usuariosPagina.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700">
                        {usuario.nombre
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((parte) => parte[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {usuario.nombre}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          ID: {usuario.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">{usuario.correo}</td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
                      {usuario.rol}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${
                        usuario.estado === "Activo"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                          : "bg-slate-100 text-slate-600 ring-slate-500/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          usuario.estado === "Activo"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />
                      {usuario.estado}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEdicion(usuario)}
                        title="Editar usuario"
                        aria-label={`Editar ${usuario.nombre}`}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16 4 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => cambiarEstado(usuario)}
                        title={
                          usuario.estado === "Activo"
                            ? "Desactivar usuario"
                            : "Activar usuario"
                        }
                        aria-label={`${
                          usuario.estado === "Activo" ? "Desactivar" : "Activar"
                        } ${usuario.nombre}`}
                        className={`rounded-lg border border-slate-200 bg-white p-2 transition ${
                          usuario.estado === "Activo"
                            ? "text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                            : "text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        }`}
                      >
                        {usuario.estado === "Activo" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="18"
                              height="14"
                              rx="2"
                            />
                            <path
                              strokeLinecap="round"
                              d="M9 10v4m6-4v4"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="18"
                              height="14"
                              rx="2"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9 12 2 2 4-4"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {usuariosPagina.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      No se encontraron usuarios
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Prueba con otros filtros o registra una nueva cuenta.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Mostrando{" "}
            <span className="font-bold text-slate-700">
              {usuariosFiltrados.length === 0
                ? 0
                : (pagina - 1) * registrosPorPagina + 1}
              {"–"}
              {Math.min(
                pagina * registrosPorPagina,
                usuariosFiltrados.length
              )}
            </span>{" "}
            de{" "}
            <span className="font-bold text-slate-700">
              {usuariosFiltrados.length}
            </span>{" "}
            usuarios
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setPagina((actual) => Math.max(1, actual - 1))
              }
              disabled={pagina === 1}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
              {pagina} / {totalPaginas}
            </span>

            <button
              type="button"
              onClick={() =>
                setPagina((actual) =>
                  Math.min(totalPaginas, actual + 1)
                )
              }
              disabled={pagina >= totalPaginas}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>

      <p className="text-xs leading-relaxed text-slate-400">
        Los usuarios mostrados son datos de ejemplo. La autenticación,
        autorización y persistencia definitiva se implementarán mediante la API
        de Laravel.
      </p>
    </main>
  );
}

export default Usuarios;
