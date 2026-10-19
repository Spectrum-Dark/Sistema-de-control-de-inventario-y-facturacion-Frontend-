import { useMemo, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useUsuarios } from "../../hooks/usuarios/useUsuarios";
import { useAuth } from "../../hooks/sesion/useAuth";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import {
  FILTROS_INICIALES,
  filtrarUsuarios,
  hayFiltrosActivos,
} from "../../utils/usuarios/filtros";
import FiltrosUsuarios from "../../components/usuarios/FiltrosUsuarios";
import TablaUsuarios from "../../components/usuarios/TablaUsuarios";
import ModalEditarUsuario from "../../components/usuarios/ModalEditarUsuario";
import ModalContrasena from "../../components/usuarios/ModalContrasena";
import Paginacion from "../../components/compartido/Paginacion";

export default function Usuarios() {
  const { usuarios, cargando, error, recargar, actualizarEnLista } =
    useUsuarios();
  const { usuario: usuarioActual } = useAuth();

  const [editando, setEditando] = useState(null);
  const [contrasenaDe, setContrasenaDe] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const filtrados = useMemo(
    () => filtrarUsuarios(usuarios, filtros),
    [usuarios, filtros],
  );
  const paginacion = usePaginacion(filtrados, 10);
  const hayFiltros = hayFiltrosActivos(filtros);

  // Al cambiar un filtro se vuelve a la primera página
  const cambiarFiltro = (campo, valor) => {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
    paginacion.irAPagina(1);
  };

  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    paginacion.irAPagina(1);
  };

  const handleGuardado = (datos) => {
    actualizarEnLista(datos);
    setEditando(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Usuarios</h1>
          <p className="mt-1 text-sm text-slate-500">
            Administración de usuarios del sistema.
          </p>
        </div>

        <button
          onClick={recargar}
          disabled={cargando}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={cargando ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Actualizar</span>
        </button>
      </div>

      {cargando && usuarios.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Cargando usuarios...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={recargar}
            className="mt-3 text-sm font-medium text-red-700 underline"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <FiltrosUsuarios
            filtros={filtros}
            onCambiar={cambiarFiltro}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
          />

          {filtrados.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {hayFiltros
                ? "Ningún usuario coincide con la búsqueda o los filtros."
                : "No hay usuarios registrados."}
            </p>
          ) : (
            <>
              <TablaUsuarios
                usuarios={paginacion.visibles}
                usuarioActual={usuarioActual}
                onEditar={setEditando}
                onCambiarContrasena={setContrasenaDe}
              />
              <Paginacion {...paginacion} onCambiar={paginacion.irAPagina} />
            </>
          )}
        </>
      )}

      {editando && (
        <ModalEditarUsuario
          key={editando.id_usuario}
          usuario={editando}
          usuarioActual={usuarioActual}
          onCerrar={() => setEditando(null)}
          onGuardado={handleGuardado}
        />
      )}

      {contrasenaDe && (
        <ModalContrasena
          key={contrasenaDe.id_usuario}
          usuario={contrasenaDe}
          onCerrar={() => setContrasenaDe(null)}
        />
      )}
    </div>
  );
}
