import { useState } from "react";
import { ShieldCheck, UserRound, UserRoundCheck, UserRoundX } from "lucide-react";
import { useUsuarios } from "../../hooks/usuarios/useUsuarios";
import { useAuth } from "../../hooks/sesion/useAuth";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  FILTROS_INICIALES,
  filtrarUsuarios,
} from "../../utils/usuarios/filtros";
import { esMismaCuenta } from "../../utils/usuarios/permisos";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosUsuarios from "../../components/usuarios/FiltrosUsuarios";
import TablaUsuarios from "../../components/usuarios/TablaUsuarios";
import ModalEditarUsuario from "../../components/usuarios/ModalEditarUsuario";
import ModalContrasena from "../../components/usuarios/ModalContrasena";
import { ID_ROL } from "../../utils/sesion/roles";

function ResumenUsuarios({ usuarios }) {
  const activos = usuarios.filter((u) => u.estado === "Activo").length;
  const inactivos = usuarios.filter((u) => u.estado === "Inactivo").length;
  const administradores = usuarios.filter((u) => Number(u.id_rol) === ID_ROL.ADMINISTRADOR).length;
  const metricas = [
    { etiqueta: "Cuentas administradas", valor: usuarios.length, icono: UserRound },
    { etiqueta: "Activas", valor: activos, icono: UserRoundCheck },
    { etiqueta: "Inactivas", valor: inactivos, icono: UserRoundX },
    { etiqueta: "Administradores", valor: administradores, icono: ShieldCheck },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Resumen de usuarios">
      {metricas.map(({ etiqueta, valor, icono: Icono }) => (
        <article key={etiqueta} className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icono size={18} strokeWidth={1.8} /></span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-medium text-slate-500">{etiqueta}</span>
            <span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span>
          </span>
        </article>
      ))}
    </section>
  );
}

export default function Usuarios() {
  const { usuarios, cargando, error, recargar, actualizarEnLista } =
    useUsuarios();
  const { usuario: usuarioActual } = useAuth();
  const [contrasenaDe, setContrasenaDe] = useState(null);
  const otrosUsuarios = usuarios.filter(
    (fila) => !esMismaCuenta(fila, usuarioActual)
  );

  const g = useGestionCrud({
    items: otrosUsuarios,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarUsuarios,
    recargar,
    actualizarEnLista,
    claveId: "id_usuario",
  });

  return (
    <PaginaCrud
      titulo="Usuarios"
      subtitulo="Administra accesos, roles y estado de las cuentas del sistema."
      resumen={!cargando && !error ? <ResumenUsuarios usuarios={otrosUsuarios} /> : null}
      textoCarga="Cargando usuarios..."
      mensajeVacio="No hay otros usuarios registrados."
      mensajeSinResultados="Ningún usuario coincide con la búsqueda o los filtros."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={otrosUsuarios.length > 0}
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
