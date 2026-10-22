import { useState } from "react";
import { useUsuarios } from "../../hooks/usuarios/useUsuarios";
import { useAuth } from "../../hooks/sesion/useAuth";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  FILTROS_INICIALES,
  filtrarUsuarios,
} from "../../utils/usuarios/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosUsuarios from "../../components/usuarios/FiltrosUsuarios";
import TablaUsuarios from "../../components/usuarios/TablaUsuarios";
import ModalEditarUsuario from "../../components/usuarios/ModalEditarUsuario";
import ModalContrasena from "../../components/usuarios/ModalContrasena";

export default function Usuarios() {
  const { usuarios, cargando, error, recargar, actualizarEnLista } =
    useUsuarios();
  const { usuario: usuarioActual } = useAuth();
  const [contrasenaDe, setContrasenaDe] = useState(null);

  const g = useGestionCrud({
    items: usuarios,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarUsuarios,
    recargar,
    actualizarEnLista,
    claveId: "id_usuario",
  });

  return (
    <PaginaCrud
      titulo="Usuarios"
      subtitulo="Administración de usuarios del sistema."
      textoCarga="Cargando usuarios..."
      mensajeVacio="No hay usuarios registrados."
      mensajeSinResultados="Ningún usuario coincide con la búsqueda o los filtros."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={usuarios.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosUsuarios
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaUsuarios
          usuarios={g.paginacion.visibles}
          usuarioActual={usuarioActual}
          onEditar={g.abrirModal}
          onCambiarContrasena={setContrasenaDe}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalEditarUsuario
          key={g.modal.registro.id_usuario}
          usuario={g.modal.registro}
          usuarioActual={usuarioActual}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}

      {contrasenaDe && (
        <ModalContrasena
          key={contrasenaDe.id_usuario}
          usuario={contrasenaDe}
          onCerrar={() => setContrasenaDe(null)}
        />
      )}
    </PaginaCrud>
  );
}